/**
 * db.js - Database Service sử dụng IndexedDB (với fallback LocalStorage)
 * Tối ưu cho môi trường React Client-side và GitHub Pages.
 */

import { INITIAL_MEMBERS, INITIAL_SCHEDULE, INITIAL_HOTEL_INFO } from '../data/initialData';

const DB_NAME = 'ICEF2026_Database';
const DB_VERSION = 1;
const STORE_SCHEDULES = 'schedules';
const STORE_MEMBERS = 'members';
const STORE_HOTEL = 'hotel_info';
const STORE_META = 'metadata';

const STORAGE_KEY_FALLBACK = 'ICEF2026_FALLBACK_STORE';

class DatabaseService {
  constructor() {
    this.db = null;
    this.isIndexedDBSupported = typeof window !== 'undefined' && 'indexedDB' in window;
    this.useFallback = !this.isIndexedDBSupported;
  }

  async init() {
    if (this.useFallback) {
      this._initFallbackStorage();
      return true;
    }

    return new Promise((resolve) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        if (!db.objectStoreNames.contains(STORE_SCHEDULES)) {
          const schStore = db.createObjectStore(STORE_SCHEDULES, { keyPath: 'id' });
          schStore.createIndex('day', 'day', { unique: false });
          schStore.createIndex('category', 'category', { unique: false });
        }

        if (!db.objectStoreNames.contains(STORE_MEMBERS)) {
          db.createObjectStore(STORE_MEMBERS, { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains(STORE_HOTEL)) {
          db.createObjectStore(STORE_HOTEL, { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains(STORE_META)) {
          db.createObjectStore(STORE_META, { keyPath: 'key' });
        }
      };

      request.onsuccess = async (event) => {
        this.db = event.target.result;
        try {
          await this._seedInitialDataIfNeeded();
          resolve(true);
        } catch (err) {
          console.error('[DB] Lỗi seed dữ liệu ban đầu:', err);
          resolve(true);
        }
      };

      request.onerror = (event) => {
        console.error('[DB] Lỗi mở IndexedDB:', event.target.error);
        this.useFallback = true;
        this._initFallbackStorage();
        resolve(false);
      };
    });
  }

  async _seedInitialDataIfNeeded() {
    const schedules = await this.getAllSchedules();
    if (!schedules || schedules.length === 0) {
      await this.resetToDefault();
    } else {
      // Sync any new initial schedules (such as HUST courses) if not already present
      const hasHust175507 = schedules.some((s) => s.id === 'sch-hust-175507');
      if (!hasHust175507) {
        for (const item of INITIAL_SCHEDULE) {
          if (!schedules.some((s) => s.id === item.id)) {
            await this.addSchedule(item);
          }
        }
      }
    }

    // Sync member MSSVs and roles
    const members = await this.getAllMembers();
    if (!members || members.length === 0 || !members[0].mssv) {
      for (const m of INITIAL_MEMBERS) {
        await this.updateMember(m);
      }
    }
  }

  // ==========================================
  // SCHEDULE CRUD
  // ==========================================

  async getAllSchedules() {
    if (this.useFallback) {
      const data = this._getFallbackData();
      return data.schedules || [];
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_SCHEDULES], 'readonly');
      const store = transaction.objectStore(STORE_SCHEDULES);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async addSchedule(item) {
    if (!item.id) {
      item.id = 'sch-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7);
    }
    item.updatedAt = new Date().toISOString();

    if (this.useFallback) {
      const data = this._getFallbackData();
      data.schedules.push(item);
      this._saveFallbackData(data);
      return item;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_SCHEDULES], 'readwrite');
      const store = transaction.objectStore(STORE_SCHEDULES);
      const request = store.add(item);

      request.onsuccess = () => resolve(item);
      request.onerror = () => reject(request.error);
    });
  }

  async updateSchedule(item) {
    if (!item.id) {
      throw new Error('Cần có id để cập nhật sự kiện');
    }
    item.updatedAt = new Date().toISOString();

    if (this.useFallback) {
      const data = this._getFallbackData();
      const index = data.schedules.findIndex(s => s.id === item.id);
      if (index !== -1) {
        data.schedules[index] = item;
        this._saveFallbackData(data);
        return item;
      }
      throw new Error('Không tìm thấy sự kiện cần sửa: ' + item.id);
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_SCHEDULES], 'readwrite');
      const store = transaction.objectStore(STORE_SCHEDULES);
      const request = store.put(item);

      request.onsuccess = () => resolve(item);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteSchedule(id) {
    if (this.useFallback) {
      const data = this._getFallbackData();
      data.schedules = data.schedules.filter(s => s.id !== id);
      this._saveFallbackData(data);
      return true;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_SCHEDULES], 'readwrite');
      const store = transaction.objectStore(STORE_SCHEDULES);
      const request = store.delete(id);

      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    });
  }

  // ==========================================
  // MEMBERS CRUD
  // ==========================================

  async getAllMembers() {
    if (this.useFallback) {
      const data = this._getFallbackData();
      return data.members || [];
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_MEMBERS], 'readonly');
      const store = transaction.objectStore(STORE_MEMBERS);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  }

  async updateMember(member) {
    if (this.useFallback) {
      const data = this._getFallbackData();
      const index = data.members.findIndex(m => m.id === member.id);
      if (index !== -1) {
        data.members[index] = member;
      } else {
        data.members.push(member);
      }
      this._saveFallbackData(data);
      return member;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_MEMBERS], 'readwrite');
      const store = transaction.objectStore(STORE_MEMBERS);
      const request = store.put(member);

      request.onsuccess = () => resolve(member);
      request.onerror = () => reject(request.error);
    });
  }

  // ==========================================
  // HOTEL INFO
  // ==========================================

  async getHotelInfo() {
    if (this.useFallback) {
      const data = this._getFallbackData();
      return data.hotelInfo || INITIAL_HOTEL_INFO;
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([STORE_HOTEL], 'readonly');
      const store = transaction.objectStore(STORE_HOTEL);
      const request = store.get('main');

      request.onsuccess = () => resolve(request.result?.data || INITIAL_HOTEL_INFO);
      request.onerror = () => reject(request.error);
    });
  }

  // ==========================================
  // BACKUP & RESTORE
  // ==========================================

  async exportBackupJSON() {
    const schedules = await this.getAllSchedules();
    const members = await this.getAllMembers();
    const hotelInfo = await this.getHotelInfo();

    const backup = {
      version: 1,
      exportedAt: new Date().toISOString(),
      source: 'ICEF 2026 Schedule App (React)',
      schedules,
      members,
      hotelInfo
    };

    return JSON.stringify(backup, null, 2);
  }

  async importBackupJSON(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (!data.schedules || !Array.isArray(data.schedules)) {
        throw new Error('Dữ liệu không hợp lệ: Thiếu danh sách lịch trình (schedules)');
      }

      if (this.useFallback) {
        const fallbackData = {
          schedules: data.schedules,
          members: data.members || INITIAL_MEMBERS,
          hotelInfo: data.hotelInfo || INITIAL_HOTEL_INFO
        };
        this._saveFallbackData(fallbackData);
        return true;
      }

      const tx = this.db.transaction([STORE_SCHEDULES, STORE_MEMBERS, STORE_HOTEL], 'readwrite');
      const schStore = tx.objectStore(STORE_SCHEDULES);
      const memStore = tx.objectStore(STORE_MEMBERS);
      const hotelStore = tx.objectStore(STORE_HOTEL);

      await new Promise((res, rej) => {
        const r = schStore.clear();
        r.onsuccess = res;
        r.onerror = rej;
      });

      for (const item of data.schedules) {
        schStore.put(item);
      }

      if (data.members && Array.isArray(data.members)) {
        await new Promise((res, rej) => {
          const r = memStore.clear();
          r.onsuccess = res;
          r.onerror = rej;
        });
        for (const mem of data.members) {
          memStore.put(mem);
        }
      }

      if (data.hotelInfo) {
        hotelStore.put({ id: 'main', data: data.hotelInfo, updatedAt: new Date().toISOString() });
      }

      return new Promise((resolve, reject) => {
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
      });
    } catch (err) {
      console.error('[DB] Lỗi import JSON:', err);
      throw err;
    }
  }

  async resetToDefault() {
    if (this.useFallback) {
      const fallbackData = {
        schedules: JSON.parse(JSON.stringify(INITIAL_SCHEDULE)),
        members: JSON.parse(JSON.stringify(INITIAL_MEMBERS)),
        hotelInfo: JSON.parse(JSON.stringify(INITIAL_HOTEL_INFO))
      };
      this._saveFallbackData(fallbackData);
      return true;
    }

    const tx = this.db.transaction([STORE_SCHEDULES, STORE_MEMBERS, STORE_HOTEL, STORE_META], 'readwrite');
    const schStore = tx.objectStore(STORE_SCHEDULES);
    const memStore = tx.objectStore(STORE_MEMBERS);
    const hotelStore = tx.objectStore(STORE_HOTEL);
    const metaStore = tx.objectStore(STORE_META);

    schStore.clear();
    memStore.clear();
    hotelStore.clear();

    for (const item of INITIAL_SCHEDULE) {
      schStore.put(JSON.parse(JSON.stringify(item)));
    }

    for (const mem of INITIAL_MEMBERS) {
      memStore.put(JSON.parse(JSON.stringify(mem)));
    }

    hotelStore.put({
      id: 'main',
      data: JSON.parse(JSON.stringify(INITIAL_HOTEL_INFO)),
      updatedAt: new Date().toISOString()
    });

    metaStore.put({
      key: 'app_info',
      version: '3.0.0-react',
      lastReset: new Date().toISOString(),
      framework: 'React + TailwindCSS'
    });

    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  }

  _initFallbackStorage() {
    const existing = localStorage.getItem(STORAGE_KEY_FALLBACK);
    if (!existing) {
      const initial = {
        schedules: JSON.parse(JSON.stringify(INITIAL_SCHEDULE)),
        members: JSON.parse(JSON.stringify(INITIAL_MEMBERS)),
        hotelInfo: JSON.parse(JSON.stringify(INITIAL_HOTEL_INFO))
      };
      this._saveFallbackData(initial);
    }
  }

  _getFallbackData() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_FALLBACK);
      return raw ? JSON.parse(raw) : { schedules: [], members: [], hotelInfo: null };
    } catch {
      return { schedules: [], members: [], hotelInfo: null };
    }
  }

  _saveFallbackData(data) {
    try {
      localStorage.setItem(STORAGE_KEY_FALLBACK, JSON.stringify(data));
    } catch (e) {
      console.error('[DB] Không thể ghi vào LocalStorage fallback:', e);
    }
  }
}

export const dbService = new DatabaseService();
