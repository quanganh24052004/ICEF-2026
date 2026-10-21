import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Calendar as CalendarIcon,
  MapPin,
  User,
  ChevronLeft,
  ChevronRight,
  Pen,
  Trash2,
  Clock,
  Star
} from 'lucide-react';

export default function CalendarView({
  schedules = [],
  members = [],
  selectedMembers = ['all'],
  selectedMember = 'all',
  showAllSessions = true,
  searchQuery = '',
  currentUser = null,
  onEventClick,
  onDeleteEvent,
  onOpenMap
}) {
  const [viewType, setViewType] = useState('week'); // 'week' | 'threeDays' | 'day'
  const [hoveredEventId, setHoveredEventId] = useState(null);
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [todayDate, setTodayDate] = useState(() => new Date());
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    return { hour: now.getHours(), minute: now.getMinutes() };
  });

  const gridScrollRef = useRef(null);

  // Update current live time every 10 seconds
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime({ hour: now.getHours(), minute: now.getMinutes() });
      setTodayDate(now);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Density zoom levels: 'spacious' (110px/h - default) | 'comfortable' (90px/h) | 'compact' (70px/h)
  const [density, setDensity] = useState(() => {
    try {
      return localStorage.getItem('icef2026_cal_density') || 'spacious';
    } catch {
      return 'spacious';
    }
  });

  const handleSetDensity = (newDensity) => {
    setDensity(newDensity);
    try {
      localStorage.setItem('icef2026_cal_density', newDensity);
    } catch {
      // ignore
    }
  };

  // Time slots: 06:00 to 22:00
  const START_HOUR = 6;
  const END_HOUR = 22;
  const HOUR_HEIGHT = density === 'compact' ? 70 : density === 'comfortable' ? 90 : 110;
  const hours = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);

  // Auto-scroll to current live time on initial mount
  useEffect(() => {
    if (gridScrollRef.current) {
      const now = new Date();
      const currentMin = now.getHours() * 60 + now.getMinutes();
      if (currentMin >= START_HOUR * 60 && currentMin <= END_HOUR * 60) {
        const topPx = ((currentMin - START_HOUR * 60) / 60) * HOUR_HEIGHT;
        gridScrollRef.current.scrollTop = Math.max(0, topPx - 100);
      }
    }
  }, [HOUR_HEIGHT]);

  // Helper calculate Monday of the week for any given date
  const getMonday = (d) => {
    const date = new Date(d);
    const day = date.getDay(); // 0 is Sunday, 1 is Monday...
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(date.setDate(diff));
    monday.setHours(0, 0, 0, 0);
    return monday;
  };

  // Helper calculate ISO week number
  const getISOWeekNumber = (d) => {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  };

  // Dynamically compute the 7 days of the selected week based on real time
  const { allDays, weekLabel } = useMemo(() => {
    const monday = getMonday(selectedDate);
    const todayDay = todayDate.getDate();
    const todayMonth = todayDate.getMonth();
    const todayYear = todayDate.getFullYear();

    const dayNames = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'];
    const days = [];

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(monday);
      dayDate.setDate(monday.getDate() + i);

      const dayOfMonth = dayDate.getDate();
      const month = dayDate.getMonth() + 1; // 1-12
      const year = dayDate.getFullYear();
      const dayStr = String(dayOfMonth);
      const fullDate = `${String(dayOfMonth).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`;

      const isToday =
        dayDate.getDate() === todayDay &&
        dayDate.getMonth() === todayMonth &&
        dayDate.getFullYear() === todayYear;

      const isOct2026 = year === 2026 && month === 10;
      let isConference = false;
      let title = '';
      let isFocus = false;

      if (isOct2026 && dayOfMonth === 22) {
        isConference = true;
        title = 'Ngày 1: Pre-conf';
      } else if (isOct2026 && dayOfMonth === 23) {
        isConference = true;
        title = 'Ngày 2: Trọng tâm';
        isFocus = true;
      } else if (isOct2026 && dayOfMonth === 24) {
        isConference = true;
        title = 'Ngày 3: Check-out';
      }

      days.push({
        dayNumber: dayStr,
        dateObj: dayDate,
        label: dayNames[i],
        fullDate,
        month,
        year,
        isOct2026,
        isConference,
        title,
        isFocus,
        isToday
      });
    }

    const weekNum = getISOWeekNumber(selectedDate);
    const weekYear = selectedDate.getFullYear();
    const label = `W${weekNum} - ${weekYear}`;

    return { allDays: days, weekLabel: label };
  }, [selectedDate, todayDate]);

  // Displayed days based on viewType
  const displayedDays = useMemo(() => {
    if (viewType === 'threeDays') {
      const todayDay = todayDate.getDate();
      const todayMonth = todayDate.getMonth();
      const todayYear = todayDate.getFullYear();
      return [
        {
          dayNumber: '22',
          label: 'Thứ năm',
          fullDate: '22.10.2026',
          month: 10,
          year: 2026,
          isOct2026: true,
          isConference: true,
          title: 'Ngày 1: Pre-conf',
          isToday: todayDay === 22 && todayMonth === 9 && todayYear === 2026
        },
        {
          dayNumber: '23',
          label: 'Thứ sáu',
          fullDate: '23.10.2026',
          month: 10,
          year: 2026,
          isOct2026: true,
          isConference: true,
          title: 'Ngày 2: Trọng tâm',
          isFocus: true,
          isToday: todayDay === 23 && todayMonth === 9 && todayYear === 2026
        },
        {
          dayNumber: '24',
          label: 'Thứ bảy',
          fullDate: '24.10.2026',
          month: 10,
          year: 2026,
          isOct2026: true,
          isConference: true,
          title: 'Ngày 3: Check-out',
          isToday: todayDay === 24 && todayMonth === 9 && todayYear === 2026
        }
      ];
    }

    if (viewType === 'day') {
      const todayInWeek = allDays.find((d) => d.isToday);
      if (todayInWeek) return [todayInWeek];
      return [allDays.find((d) => d.isOct2026 && d.dayNumber === '23') || allDays[0]];
    }

    return allDays;
  }, [viewType, allDays, todayDate]);

  // Week navigation handlers
  const handlePrevWeek = () => {
    setSelectedDate((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() - 7);
      return next;
    });
  };

  const handleNextWeek = () => {
    setSelectedDate((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() + 7);
      return next;
    });
  };

  const handleGoToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setViewType('week');
    if (gridScrollRef.current) {
      const currentMin = today.getHours() * 60 + today.getMinutes();
      if (currentMin >= START_HOUR * 60 && currentMin <= END_HOUR * 60) {
        const topPx = ((currentMin - START_HOUR * 60) / 60) * HOUR_HEIGHT;
        gridScrollRef.current.scrollTo({ top: Math.max(0, topPx - 100), behavior: 'smooth' });
      }
    }
  };

  // Helper parse minutes from "HH:MM"
  const parseTimeToMinutes = (timeStr, defaultMinutes = 0) => {
    if (!timeStr) return defaultMinutes;
    const parts = timeStr.trim().split(':');
    const h = parseInt(parts[0], 10) || 0;
    const m = parseInt(parts[1], 10) || 0;
    return h * 60 + m;
  };

  // Helper parse start and end minutes from "13:15 – 15:10"
  const getEventTimeRange = (timeStr) => {
    const parts = (timeStr || '08:00').split(/–|-/).map((s) => s.trim());
    const startMin = parseTimeToMinutes(parts[0], 8 * 60);
    let endMin;
    if (parts.length > 1) {
      endMin = parseTimeToMinutes(parts[1], startMin + 60);
    } else {
      endMin = startMin + 60; // default 1 hour duration
    }
    const rawDiff = endMin - startMin;
    return { startMin, endMin, durationMin: rawDiff > 0 ? rawDiff : 30 };
  };

  // Harmonize single or multi-select members state
  const activeMembers = useMemo(() => {
    if (Array.isArray(selectedMembers)) return selectedMembers;
    if (Array.isArray(selectedMember)) return selectedMember;
    if (selectedMember && selectedMember !== 'all') return [selectedMember];
    return ['all'];
  }, [selectedMembers, selectedMember]);

  const isAllMembers = activeMembers.includes('all') || activeMembers.length === 0;

  // Filter events
  const filteredEvents = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return schedules.filter((item) => {
      if (!showAllSessions && item.isOptionalRef) return false;
      if (!isAllMembers && !activeMembers.some((mId) => item.participants?.includes(mId))) {
        return false;
      }

      if (query) {
        const inTitle = (item.title || '').toLowerCase().includes(query);
        const inDesc = (item.description || '').toLowerCase().includes(query);
        const inTime = (item.time || '').toLowerCase().includes(query);
        const inLoc = (item.location || '').toLowerCase().includes(query);
        return inTitle || inDesc || inTime || inLoc;
      }
      return true;
    });
  }, [schedules, activeMembers, isAllMembers, showAllSessions, searchQuery]);

  // Group events by day and compute overlapping positions
  // Các sự kiện hội thảo (day: '22' | '23' | '24') diễn ra duy nhất vào tháng 10/2026
  const eventsByDay = useMemo(() => {
    const map = {};
    displayedDays.forEach((d) => {
      map[d.fullDate] = [];
    });

    filteredEvents.forEach((ev) => {
      displayedDays.forEach((d) => {
        let isMatch = false;

        if (ev.fullDate && ev.fullDate === d.fullDate) {
          isMatch = true;
        } else if (
          ev.date &&
          (ev.date === d.fullDate ||
            ev.date === `${d.year}-${String(d.month).padStart(2, '0')}-${String(d.dayNumber).padStart(2, '0')}`)
        ) {
          isMatch = true;
        } else if (d.isOct2026 && String(ev.day) === String(d.dayNumber)) {
          // Lịch trình chỉ xuất hiện đúng vào ngày 22, 23, 24 tháng 10 năm 2026
          isMatch = true;
        }

        if (isMatch) {
          map[d.fullDate].push(ev);
        }
      });
    });

    // Compute overlapping positions for each day
    Object.keys(map).forEach((dayKey) => {
      const dayList = map[dayKey];
      // Sort by start time
      dayList.sort((a, b) => {
        const aStart = getEventTimeRange(a.time).startMin;
        const bStart = getEventTimeRange(b.time).startMin;
        return aStart - bStart;
      });

      // Calculate overlap groups
      const layoutItems = [];
      dayList.forEach((ev) => {
        const { startMin, endMin, durationMin } = getEventTimeRange(ev.time);

        // Find overlapping events already placed
        const overlapping = layoutItems.filter(
          (item) => !(endMin <= item.startMin || startMin >= item.endMin)
        );

        let colIndex = 0;
        const usedCols = overlapping.map((it) => it.colIndex);
        while (usedCols.includes(colIndex)) {
          colIndex++;
        }

        layoutItems.push({
          ...ev,
          startMin,
          endMin,
          durationMin,
          colIndex
        });
      });

      // Adjust total columns for connected overlap clusters
      layoutItems.forEach((item) => {
        const cluster = layoutItems.filter(
          (other) => !(item.endMin <= other.startMin || item.startMin >= other.endMin)
        );
        const maxCol = Math.max(...cluster.map((c) => c.colIndex), 0);
        item.totalCols = maxCol + 1;
      });

      map[dayKey] = layoutItems;
    });

    return map;
  }, [filteredEvents, displayedDays]);

  // Primary speaker / presenter name
  const getSpeakerText = (ev) => {
    if (ev.speaker) return ev.speaker;
    if (ev.category === 'highlight_oral') return 'Nguyễn Khánh Linh, Trần Đức Kiên';
    if (ev.category === 'highlight_poster') return 'Vũ Đình Khôi (HUST)';
    if (ev.participants && ev.participants.length > 0) {
      if (ev.participants.length === members.length) return 'Cả đoàn 7 thành viên';
      const pNames = ev.participants
        .map((pId) => members.find((m) => m.id === pId)?.shortName)
        .filter(Boolean);
      return pNames.join(', ');
    }
    return 'Cả đoàn HUST & HUCE';
  };

  const formatEventTimeLabel = (ev) => {
    if (ev.periodText) return ev.periodText;
    return ev.time;
  };

  const getCategoryInfo = (category) => {
    switch (category) {
      case 'highlight_oral':
        return { text: 'Báo cáo Oral', color: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 'highlight_poster':
        return { text: 'Báo cáo Poster', color: 'bg-purple-100 text-purple-900 border-purple-300' };
      case 'plenary':
        return { text: 'Phiên Toàn Thể', color: 'bg-red-100 text-red-900 border-red-300' };
      case 'academic':
        return { text: 'Chuyên môn', color: 'bg-blue-100 text-blue-900 border-blue-300' };
      case 'travel':
        return { text: 'Di chuyển', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
      case 'hotel':
        return { text: 'Khách sạn', color: 'bg-teal-100 text-teal-900 border-teal-300' };
      case 'meal':
        return { text: 'Ẩm thực', color: 'bg-orange-100 text-orange-900 border-orange-300' };
      default:
        return { text: 'Lịch trình', color: 'bg-slate-100 text-slate-800 border-slate-200' };
    }
  };

  return (
    <div className="card-3d rounded-3xl overflow-hidden mt-6 bg-white text-duo-dark">
      {/* =========================================================================
          1. TOP CONTROLS BAR (3D Tactile Buttons & Real-Time Sync)
          ========================================================================= */}
      <div className="px-4 py-3 border-b-2 border-duo-border flex items-center justify-between bg-[#F8FAFC]">
        {/* Left: "Hôm nay" 3D Red Pill Button + Calendar Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleGoToday}
            className="btn-3d-hust text-white font-black text-xs sm:text-sm px-4 py-1.5 rounded-xl cursor-pointer flex items-center gap-1.5"
            title="Nhấp để quay lại ngày và giờ hiện tại"
          >
            <span>Hôm nay</span>
          </button>
          
          <button
            type="button"
            onClick={handleGoToday}
            className="btn-3d-white text-duo-dark w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer"
            title="Về tuần hiện tại"
          >
            <CalendarIcon className="w-4 h-4 text-duo-blue" />
          </button>
        </div>

        {/* Right: Density Zoom Controls + View Type Dropdown */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Density zoom controls */}
          <div className="flex items-center bg-white p-0.5 sm:p-1 rounded-xl border-2 border-duo-border text-[11px] sm:text-xs font-black shadow-xs">
            <span className="hidden md:inline text-[10px] text-slate-400 uppercase tracking-wider px-1.5 font-bold select-none">
              Giãn giờ:
            </span>
            <button
              type="button"
              onClick={() => handleSetDensity('spacious')}
              className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                density === 'spacious'
                  ? 'btn-3d-blue text-white shadow-[0_2px_0_#1899D6]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Độ giãn Rộng rãi (110px/giờ) - Tối ưu chống đè sát giờ"
            >
              Rộng rãi
            </button>
            <button
              type="button"
              onClick={() => handleSetDensity('comfortable')}
              className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                density === 'comfortable'
                  ? 'btn-3d-blue text-white shadow-[0_2px_0_#1899D6]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Độ giãn Vừa vặn (90px/giờ)"
            >
              Vừa
            </button>
            <button
              type="button"
              onClick={() => handleSetDensity('compact')}
              className={`px-2 sm:px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                density === 'compact'
                  ? 'btn-3d-blue text-white shadow-[0_2px_0_#1899D6]'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Độ giãn Thu gọn (70px/giờ)"
            >
              Thu gọn
            </button>
          </div>

          {/* Right: View Type Dropdown */}
          <div className="relative">
            <select
              value={viewType}
              onChange={(e) => setViewType(e.target.value)}
              className="px-2.5 sm:px-3.5 py-1.5 rounded-xl border-2 border-duo-border text-xs sm:text-sm font-black text-duo-dark bg-white hover:border-duo-blue focus:outline-none cursor-pointer shadow-xs pr-7 transition-colors"
            >
              <option value="week">Lịch tuần ({weekLabel})</option>
              <option value="threeDays">Lịch 3 ngày hội thảo (22-24/10)</option>
              <option value="day">Lịch hôm nay / Ngày trọng tâm</option>
            </select>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. TIMETABLE GRID (Header with Dynamic Week Badge + Day Columns)
          ========================================================================= */}
      <div ref={gridScrollRef} className="overflow-x-auto relative">
        <div
          className={`select-none ${
            viewType === 'week'
              ? 'min-w-[1140px]'
              : viewType === 'threeDays'
              ? 'min-w-[840px]'
              : 'min-w-[460px]'
          }`}
          style={{ width: '100%' }}
        >
          
          {/* Header Row: Corner Crimson Badge + Day Columns */}
          <div
            className="grid border-b-2 border-duo-border bg-white sticky top-0 z-20"
            style={{
              gridTemplateColumns: `110px repeat(${displayedDays.length}, minmax(0, 1fr))`
            }}
          >
            {/* Corner Header Cell: Real-Time Dynamic Week Badge with Nav Buttons */}
            <div className="border-r border-slate-200 p-1.5 flex items-center justify-center bg-white">
              <div className="w-full bg-[#B91C1C] text-white rounded-xl px-2 py-1.5 flex items-center justify-between shadow-xs">
                <button
                  type="button"
                  onClick={handlePrevWeek}
                  className="w-6 h-6 rounded-full bg-white text-[#B91C1C] flex items-center justify-center hover:bg-slate-100 active:scale-90 transition-all cursor-pointer shadow-xs"
                  title="Tuần trước"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[3]" />
                </button>
                
                <span className="font-black text-[11px] sm:text-xs tracking-tight text-white whitespace-nowrap">
                  {weekLabel}
                </span>

                <button
                  type="button"
                  onClick={handleNextWeek}
                  className="w-6 h-6 rounded-full bg-white text-[#B91C1C] flex items-center justify-center hover:bg-slate-100 active:scale-90 transition-all cursor-pointer shadow-xs"
                  title="Tuần sau"
                >
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>

            {/* Day Header Columns: Real-Time Label, Date & "Hôm nay" Badge */}
            {displayedDays.map((d) => (
              <div
                key={d.fullDate}
                className={`py-2 px-1.5 sm:py-2.5 sm:px-2 text-center border-r border-slate-200 last:border-r-0 transition-colors ${
                  d.isToday ? 'bg-red-50/70 border-b-2 border-b-red-600' : 'bg-white'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                  <span className={`text-xs sm:text-[13px] ${d.isToday ? 'text-red-700 font-black' : 'text-slate-700 font-bold'}`}>
                    {d.label}
                  </span>
                  {d.isToday && (
                    <span className="text-[10px] font-black uppercase bg-red-600 text-white px-2 py-0.5 rounded-full shadow-xs">
                      Hôm nay
                    </span>
                  )}
                </div>

                <div className={`text-sm sm:text-base font-black mt-0.5 tracking-tight ${
                  d.isToday ? 'text-red-700 font-black' : 'text-duo-dark'
                }`}>
                  {d.fullDate}
                </div>

                {d.isConference && (
                  <span
                    className={`inline-block mt-0.5 text-[10px] px-2 py-0.5 rounded-full font-black ${
                      d.isFocus
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {d.title}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Body: Time Axis + Days Columns Grid with Dashed Lines */}
          <div
            className="relative grid"
            style={{
              gridTemplateColumns: `110px repeat(${displayedDays.length}, minmax(0, 1fr))`,
              height: `${hours.length * HOUR_HEIGHT}px`
            }}
          >
            {/* Left Column: Time Labels (- 6:00, - 7:00, ... - 22:00) */}
            <div className="border-r border-slate-200 bg-white relative">
              {hours.map((hour, idx) => (
                <div
                  key={hour}
                  className="absolute right-2 text-right font-sans text-xs font-bold text-slate-500 -translate-y-2 select-none flex items-center justify-end gap-1"
                  style={{ top: `${idx * HOUR_HEIGHT}px` }}
                >
                  <span className="text-slate-400">-</span>
                  <span>{`${hour}:00`}</span>
                </div>
              ))}
            </div>

            {/* Days Columns Body with Real-Time Events & Indicator */}
            {displayedDays.map((d, dayIndex) => {
              const dayEvents = eventsByDay[d.fullDate] || [];

              // Real-time calculation: ONLY show the line on today's actual column
              const showCurrentTime = d.isToday;
              const currentMinOfDay = currentTime.hour * 60 + currentTime.minute;
              const currentTopPx = ((currentMinOfDay - START_HOUR * 60) / 60) * HOUR_HEIGHT;
              const isCurrentTimeInRange =
                currentMinOfDay >= START_HOUR * 60 && currentMinOfDay <= END_HOUR * 60;

              return (
                <div
                  key={d.fullDate}
                  className={`border-r border-slate-200 last:border-r-0 relative transition-colors ${
                    d.isToday ? 'bg-red-50/15' : 'bg-white'
                  }`}
                >
                  {/* Dashed Horizontal Hour Grid Lines across the day */}
                  {hours.map((_, idx) => (
                    <div
                      key={idx}
                      className="absolute inset-x-0 border-b border-dashed border-slate-200 pointer-events-none"
                      style={{ top: `${idx * HOUR_HEIGHT}px`, height: '1px' }}
                    />
                  ))}

                  {/* Red Current Time Line Indicator - LIVE ON TODAY'S COLUMN */}
                  {showCurrentTime && isCurrentTimeInRange && (
                    <div
                      className="absolute inset-x-0 z-30 pointer-events-none"
                      style={{ top: `${currentTopPx}px` }}
                    >
                      <div className="relative">
                        {/* Red Time Badge sitting right on the line */}
                        <div className="absolute -top-4 left-0 text-red-600 font-black text-[11px] font-mono leading-none bg-white px-1.5 py-0.5 rounded shadow-xs border border-red-200">
                          {`${String(currentTime.hour).padStart(2, '0')}:${String(
                            currentTime.minute
                          ).padStart(2, '0')}`}
                        </div>
                        {/* Red Line */}
                        <div className="h-[2px] bg-red-600 w-full relative shadow-[0_0_8px_rgba(220,38,38,0.5)]">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-600 absolute -left-1 -top-[3.75px] ring-2 ring-white"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Event Cards in Day Column */}
                  {dayEvents.map((ev) => {
                    const topPx = ((ev.startMin - START_HOUR * 60) / 60) * HOUR_HEIGHT;

                    // Find the next event that shares the same column (colIdx) and starts at or after this event
                    const nextInSameCol = dayEvents
                      .filter(
                        (other) =>
                          other.colIndex === ev.colIndex &&
                          other.startMin >= ev.startMin &&
                          other.id !== ev.id
                      )
                      .sort((a, b) => a.startMin - b.startMin)[0];

                    // Space until the next event starts to strictly prevent overlap
                    let maxAvailableHeightPx = 9999;
                    if (nextInSameCol) {
                      const gapMin = nextInSameCol.startMin - ev.startMin;
                      if (gapMin > 0) {
                        // Keep a crisp 3px gap before the next event starts
                        maxAvailableHeightPx = Math.max(16, (gapMin / 60) * HOUR_HEIGHT - 3);
                      }
                    }

                    const nominalHeightPx = (ev.durationMin / 60) * HOUR_HEIGHT - 3;
                    const heightPx = Math.max(16, Math.min(nominalHeightPx, maxAvailableHeightPx));
                    const isHovered = hoveredEventId === ev.id;
                    const speaker = getSpeakerText(ev);
                    const timeLabel = formatEventTimeLabel(ev);
                    const catInfo = getCategoryInfo(ev.category);

                    // Multi-column width for parallel sessions
                    const totalCols = ev.totalCols || 1;
                    const colIdx = ev.colIndex || 0;
                    const colWidthPct = 100 / totalCols;
                    const leftPct = colIdx * colWidthPct;

                    // Popover orientation to never clip outside the timetable or screen
                    const isRightSide =
                      displayedDays.length === 1
                        ? colIdx >= totalCols / 2
                        : dayIndex >= displayedDays.length - 2 ||
                          (dayIndex >= displayedDays.length - 3 && colIdx >= 1);

                    const totalGridHeight = (END_HOUR - START_HOUR) * HOUR_HEIGHT;
                    const isBottomHalf = topPx > totalGridHeight * 0.55 || (ev.startMin && ev.startMin >= 14 * 60);

                    const isAdmin = currentUser?.isAdmin || currentUser?.mssv === '20227035';
                    const isPreExisting = !ev.createdByMssv || (typeof ev.id === 'string' && ev.id.startsWith('sch-'));
                    const isCreatedByMe = Boolean(ev.createdByMssv && ev.createdByMssv === currentUser?.mssv);
                    const canEdit = isAdmin || (!isPreExisting && isCreatedByMe);
                    const canDelete = isAdmin || (!isPreExisting && isCreatedByMe);

                    return (
                      <div
                        key={ev.id}
                        onMouseEnter={() => setHoveredEventId(ev.id)}
                        onMouseLeave={() => setHoveredEventId(null)}
                        className="absolute select-none"
                        style={{
                          top: `${topPx}px`,
                          left: `calc(${leftPct}% + 2px)`,
                          width: `calc(${colWidthPct}% - 4px)`,
                          height: `${heightPx}px`,
                          zIndex: isHovered ? 40 : 10
                        }}
                      >
                        {/* 1. Base Card in Timetable Grid */}
                        <div
                          onClick={() => {
                            if (onEventClick) onEventClick(ev);
                          }}
                          className={`w-full h-full rounded-xl border border-slate-200/90 border-l-[4px] border-l-red-600 bg-white overflow-hidden cursor-pointer transition-all duration-150 ${
                            isHovered
                              ? 'ring-2 ring-red-500 shadow-md bg-red-50/20'
                              : 'shadow-xs hover:border-slate-300 hover:shadow-sm'
                          } ${
                            heightPx < 34
                              ? 'px-1.5 py-0.5 flex items-center'
                              : heightPx < 54
                              ? 'p-1.5 flex flex-col justify-center'
                              : 'p-2 flex flex-col justify-between'
                          }`}
                        >
                          {heightPx < 34 ? (
                            /* Ultra-compact chip for short 15-20 min events */
                            <div className="flex items-center gap-1.5 overflow-hidden w-full">
                              {ev.isHighlight && (
                                <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500 shrink-0" />
                              )}
                              <span className="font-mono font-black text-[9px] text-red-600 bg-red-50 px-1 py-0.5 rounded shrink-0">
                                {timeLabel.split(/–|-/)[0].trim()}
                              </span>
                              <span className="text-[11px] font-black text-slate-800 truncate leading-none">
                                {ev.title}
                              </span>
                            </div>
                          ) : heightPx < 54 ? (
                            /* Compact card for 25-35 min events */
                            <div className="overflow-hidden w-full">
                              <div className="flex items-center gap-1 text-[10px] text-slate-600 font-bold truncate">
                                <span className="font-mono text-red-600 font-black truncate">{timeLabel}</span>
                                {ev.isHighlight && (
                                  <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500 shrink-0 inline" />
                                )}
                              </div>
                              <h5 className="text-[11px] font-black text-slate-900 leading-tight truncate mt-0.5" title={ev.title}>
                                {ev.title}
                              </h5>
                            </div>
                          ) : (
                            /* Standard & Spacious card for 40+ min events */
                            <div className="overflow-hidden w-full">
                              <h5
                                className="text-xs font-black text-red-600 leading-tight line-clamp-2"
                                title={ev.title}
                              >
                                {ev.isHighlight && (
                                  <Star className="inline w-3 h-3 fill-amber-500 text-amber-500 mr-1 shrink-0 -mt-0.5" />
                                )}
                                {ev.title}
                              </h5>

                              <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-700 mt-1 truncate">
                                <CalendarIcon className="w-3 h-3 text-slate-500 shrink-0 stroke-[1.75]" />
                                <span className="font-bold text-slate-800 truncate">{timeLabel}</span>
                              </div>

                              {ev.location && heightPx >= 70 && (
                                <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-600 mt-0.5 truncate">
                                  <MapPin className="w-3 h-3 text-slate-400 shrink-0 stroke-[1.75]" />
                                  <span className="truncate">{ev.location}</span>
                                </div>
                              )}

                              {speaker && heightPx >= 90 && (
                                <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-600 mt-0.5 truncate">
                                  <User className="w-3 h-3 text-slate-400 shrink-0 stroke-[1.75]" />
                                  <span className="truncate">{speaker}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* 2. Floating Popover on Hover */}
                        {isHovered && (
                          <div
                            onClick={() => {
                              if (onEventClick) onEventClick(ev);
                            }}
                            className="absolute z-50 bg-white rounded-2xl shadow-2xl border-2 border-duo-border border-l-[5px] border-l-red-600 text-duo-dark cursor-pointer pointer-events-auto ring-1 ring-black/10 animate-fade-in flex flex-col"
                            style={{
                              width: '320px',
                              maxWidth: 'min(360px, 88vw)',
                              maxHeight: '340px',
                              ...(isRightSide ? { right: 0 } : { left: 0 }),
                              ...(isBottomHalf ? { bottom: 0 } : { top: 0 })
                            }}
                          >
                            {/* Popover Header */}
                            <div className="p-3 pb-2 border-b border-duo-border bg-white rounded-t-2xl shrink-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <span
                                    className={`inline-block text-[10px] font-black px-2 py-0.5 rounded-full border mb-1 ${catInfo.color}`}
                                  >
                                    {catInfo.text}
                                  </span>
                                  <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug line-clamp-2">
                                    {ev.title}
                                  </h4>
                                </div>

                                <div className="flex items-center gap-1 shrink-0 ml-1">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (onEventClick) onEventClick(ev);
                                    }}
                                    className="p-1 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                                    title={canEdit ? 'Sửa hoạt động' : 'Xem chi tiết hoạt động'}
                                  >
                                    <Pen className="w-3.5 h-3.5" />
                                  </button>

                                  {canDelete && (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (onDeleteEvent) onDeleteEvent(ev);
                                      }}
                                      className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                                      title="Xóa hoạt động"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Popover Scrollable Body */}
                            <div className="p-3 space-y-2 text-xs overflow-y-auto custom-scrollbar flex-1">
                              <div className="flex items-center gap-1.5 font-bold text-slate-700">
                                <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                                <span>{timeLabel}</span>
                              </div>

                              {ev.location && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (onOpenMap) onOpenMap(ev.location);
                                  }}
                                  className="flex items-center gap-1.5 text-slate-600 font-medium hover:text-blue-600 transition-colors cursor-pointer text-left group/popmap w-full"
                                  title="Xem bản đồ và chỉ đường"
                                >
                                  <MapPin className="w-3.5 h-3.5 text-emerald-600 group-hover/popmap:text-blue-600 shrink-0 transition-colors" />
                                  <span className="group-hover/popmap:underline truncate">{ev.location}</span>
                                </button>
                              )}

                              {speaker && (
                                <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                                  <User className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                                  <span>{speaker}</span>
                                </div>
                              )}

                              {ev.description && (
                                <p className="text-[11px] text-slate-600 pt-1 border-t border-slate-100 whitespace-pre-line leading-relaxed">
                                  {ev.description}
                                </p>
                              )}

                              {ev.subItems && ev.subItems.length > 0 && (
                                <div className="pt-1.5 border-t border-slate-100 space-y-1">
                                  <div className="text-[10px] font-black text-slate-500 uppercase tracking-wider">
                                    Bài báo trong phiên ({ev.subItems.length}):
                                  </div>
                                  {ev.subItems.map((sub, idx) => (
                                    <div
                                      key={idx}
                                      className={`p-1.5 rounded text-[11px] leading-tight ${
                                        sub.highlight
                                          ? 'bg-amber-100 text-amber-950 font-bold border border-amber-300'
                                          : 'bg-slate-50 text-slate-700'
                                      }`}
                                    >
                                      <span className="font-mono text-red-600 mr-1">{sub.time}</span>
                                      {sub.text}
                                    </div>
                                  ))}
                                </div>
                              )}

                              {!isAllMembers && ev.memberNotes && (
                                <div className="space-y-1.5 pt-1 border-t border-slate-100">
                                  {activeMembers.map((mId) => {
                                    const note = ev.memberNotes[mId];
                                    if (!note) return null;
                                    const mem = members.find((m) => m.id === mId);
                                    return (
                                      <div
                                        key={mId}
                                        className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 font-medium text-[11px]"
                                      >
                                        <strong>Nhiệm vụ ({mem?.shortName || mem?.name || mId}):</strong> {note}
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>

                            {/* Popover Footer */}
                            <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100 rounded-b-2xl text-[10px] text-slate-400 flex items-center justify-between shrink-0">
                              <span>Nhấp để mở chi tiết & chỉnh sửa</span>
                              <span className="text-red-600 font-bold">ICEF 2026</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
