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

  async getAppInfo() {
    if (this.useFallback) {
      const data = this._getFallbackData();
      return data.meta ? data.meta['app_info'] : null;
    }

    return new Promise((resolve) => {
      try {
        const tx = this.db.transaction([STORE_META], 'readonly');
        const store = tx.objectStore(STORE_META);
        const req = store.get('app_info');
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => resolve(null);
      } catch {
        resolve(null);
      }
    });
  }

  async saveAppInfo(info) {
    if (this.useFallback) {
      const data = this._getFallbackData();
      if (!data.meta) data.meta = {};
      data.meta['app_info'] = info;
      this._saveFallbackData(data);
      return true;
    }

    return new Promise((resolve, reject) => {
      try {
        const tx = this.db.transaction([STORE_META], 'readwrite');
        const store = tx.objectStore(STORE_META);
        store.put({ key: 'app_info', ...info });
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
      } catch (err) {
        reject(err);
      }
    });
  }

  async _seedInitialDataIfNeeded() {
    // Check if the database has already been initialized
    const appInfo = await this.getAppInfo();
    if (!appInfo) {
      // First-time load on this browser: initialize default data
      await this.resetToDefault();
      return;
    }

    // Auto-migrate to version 3: Official Conference Agenda (Shuttle Buses, Venues, Keynote 4 Dr. Baker, Session 4/6 swap, Nhà hàng 1969, 09:30 return)
    if (!appInfo.dataVersion || appInfo.dataVersion < 3) {
      for (const item of INITIAL_SCHEDULE) {
        await this.updateSchedule(item);
      }
      await this.saveHotelInfo(INITIAL_HOTEL_INFO);
      appInfo.dataVersion = 3;
      appInfo.version = '3.2.0-official';
      await this.saveAppInfo(appInfo);
    }

    // Auto-migrate to version 4: Remove unrelated university classes & update Alo Resort address/coordinates
    if (appInfo.dataVersion < 4) {
      await this.deleteSchedule('sch-hust-175507');
      await this.deleteSchedule('sch-hust-174386');
      await this.saveHotelInfo(INITIAL_HOTEL_INFO);
      appInfo.dataVersion = 4;
      appInfo.version = '3.3.0-clean';
      await this.saveAppInfo(appInfo);
    }

    // Auto-migrate to version 5: Update C7 vehicle info (BSX: 29E 17655, Lx Thùy 0986181412)
    if (appInfo.dataVersion < 5) {
      for (const item of INITIAL_SCHEDULE) {
        if (item.id === 'sch-22-1' || item.id === 'sch-22-2' || item.id === 'sch-24-3') {
          await this.updateSchedule(item);
        }
      }
      appInfo.dataVersion = 5;
      appInfo.version = '3.4.0-vehicle-info';
      await this.saveAppInfo(appInfo);
    }

    // Database is already initialized.
    // NEVER re-insert deleted schedules on F5!
    // Only ensure members list has latest structure if empty
    const members = await this.getAllMembers();
    if (!members || members.length === 0) {
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
    let rawMembers = [];
    if (this.useFallback) {
      const data = this._getFallbackData();
      rawMembers = data.members || [];
    } else {
      rawMembers = await new Promise((resolve) => {
        try {
          const transaction = this.db.transaction([STORE_MEMBERS], 'readonly');
          const store = transaction.objectStore(STORE_MEMBERS);
          const request = store.getAll();
          request.onsuccess = () => resolve(request.result || []);
          request.onerror = () => resolve([]);
        } catch {
          resolve([]);
        }
      });
    }

    // Merge with INITIAL_MEMBERS to ensure mssv, email, and admin flags are ALWAYS present
    const mergedMembers = INITIAL_MEMBERS.map((initMem) => {
      const found = rawMembers.find((m) => m.id === initMem.id);
      return {
        ...initMem,
        ...(found || {}),
        mssv: found?.mssv || initMem.mssv,
        isAdmin: found?.isAdmin !== undefined ? found.isAdmin : initMem.isAdmin,
        email: found?.email || initMem.email,
        roleTitle: found?.roleTitle || initMem.roleTitle
      };
    });

    // Also include any user-created custom members that aren't in INITIAL_MEMBERS
    rawMembers.forEach((raw) => {
      if (!mergedMembers.some((m) => m.id === raw.id)) {
        mergedMembers.push(raw);
      }
    });

    return mergedMembers;
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

  async saveHotelInfo(hotelInfo) {
    if (this.useFallback) {
      const data = this._getFallbackData();
      data.hotelInfo = hotelInfo;
      this._saveFallbackData(data);
      return true;
    }

    return new Promise((resolve, reject) => {
      try {
        const tx = this.db.transaction([STORE_HOTEL], 'readwrite');
        const store = tx.objectStore(STORE_HOTEL);
        store.put({
          id: 'main',
          data: JSON.parse(JSON.stringify(hotelInfo)),
          updatedAt: new Date().toISOString()
        });
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
      } catch (err) {
        reject(err);
      }
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
      version: '3.4.0-vehicle-info',
      dataVersion: 5,
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
        hotelInfo: JSON.parse(JSON.stringify(INITIAL_HOTEL_INFO)),
        meta: {
          app_info: { key: 'app_info', version: '3.4.0-vehicle-info', dataVersion: 5 }
        }
      };
      this._saveFallbackData(initial);
    } else {
      try {
        const data = JSON.parse(existing);
        if (!data.meta?.app_info?.dataVersion || data.meta.app_info.dataVersion < 5) {
          if (Array.isArray(data.schedules)) {
            data.schedules = data.schedules.filter(
              (s) => s.id !== 'sch-hust-175507' && s.id !== 'sch-hust-174386'
            );
            data.schedules = data.schedules.map((s) => {
              const latest = INITIAL_SCHEDULE.find((init) => init.id === s.id);
              return latest || s;
            });
          }
          data.hotelInfo = JSON.parse(JSON.stringify(INITIAL_HOTEL_INFO));
          if (!data.meta) data.meta = {};
          data.meta.app_info = { key: 'app_info', version: '3.4.0-vehicle-info', dataVersion: 5 };
          this._saveFallbackData(data);
        }
      } catch (e) {
        console.error('Fallback migration error', e);
      }
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
