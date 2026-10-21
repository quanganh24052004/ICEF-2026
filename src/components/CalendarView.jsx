import React, { useState, useMemo, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  MapPin,
  User,
  ChevronLeft,
  ChevronRight,
  Pen,
  Trash2,
  Clock,
  Star,
  ExternalLink,
  Lock
} from 'lucide-react';

export default function CalendarView({
  schedules = [],
  members = [],
  selectedMember = 'all',
  showAllSessions = true,
  searchQuery = '',
  currentUser = null,
  onEventClick,
  onDeleteEvent
}) {
  const [viewType, setViewType] = useState('week'); // 'week' | 'threeDays' | 'day'
  const [hoveredEventId, setHoveredEventId] = useState(null);
  const [currentTime, setCurrentTime] = useState({ hour: 5, minute: 43 });

  // Update current time indicator (matches 05:43 in user screenshot or live time)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime({ hour: now.getHours(), minute: now.getMinutes() });
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  // Time slots: 02:00 to 22:00 to match user screenshot range
  const START_HOUR = 6;
  const END_HOUR = 22;
  const HOUR_HEIGHT = 68; // pixels per hour
  const hours = Array.from({ length: END_HOUR - START_HOUR + 1 }, (_, i) => START_HOUR + i);

  // Week 43 days (19.10.2026 - 25.10.2026) exactly matching user's Image 1
  const allDays = [
    { dayNumber: '19', label: 'Thứ hai', fullDate: '19.10.2026', isConference: false, isToday: true },
    { dayNumber: '20', label: 'Thứ ba', fullDate: '20.10.2026', isConference: false },
    { dayNumber: '21', label: 'Thứ tư', fullDate: '21.10.2026', isConference: false },
    { dayNumber: '22', label: 'Thứ năm', fullDate: '22.10.2026', isConference: true, title: 'Ngày 1: Pre-conf' },
    { dayNumber: '23', label: 'Thứ sáu', fullDate: '23.10.2026', isConference: true, title: 'Ngày 2: Trọng tâm', isFocus: true },
    { dayNumber: '24', label: 'Thứ bảy', fullDate: '24.10.2026', isConference: true, title: 'Ngày 3: Check-out' },
    { dayNumber: '25', label: 'Chủ nhật', fullDate: '25.10.2026', isConference: false }
  ];

  const displayedDays = useMemo(() => {
    if (viewType === 'threeDays') {
      return allDays.filter((d) => d.isConference);
    }
    if (viewType === 'day') {
      return allDays.filter((d) => d.dayNumber === '23');
    }
    return allDays;
  }, [viewType]);

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
    return { startMin, endMin, durationMin: Math.max(endMin - startMin, 40) };
  };

  // Filter events
  const filteredEvents = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return schedules.filter((item) => {
      if (!showAllSessions && item.isOptionalRef) return false;
      if (selectedMember !== 'all' && !item.participants?.includes(selectedMember)) return false;

      if (query) {
        const inTitle = (item.title || '').toLowerCase().includes(query);
        const inDesc = (item.description || '').toLowerCase().includes(query);
        const inTime = (item.time || '').toLowerCase().includes(query);
        const inLoc = (item.location || '').toLowerCase().includes(query);
        return inTitle || inDesc || inTime || inLoc;
      }
      return true;
    });
  }, [schedules, selectedMember, showAllSessions, searchQuery]);

  // Group events by day and compute overlapping columns
  const eventsByDay = useMemo(() => {
    const map = {};
    allDays.forEach((d) => {
      map[d.dayNumber] = [];
    });

    filteredEvents.forEach((ev) => {
      if (map[ev.day]) {
        map[ev.day].push(ev);
      }
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
  }, [filteredEvents]);

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

  // Format time display like "Tiết 1 - 3 (06:45 - 09:10)" or "09:30 – 10:00"
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
          1. TOP CONTROLS BAR (3D Tactile Buttons & View Selector)
          ========================================================================= */}
      <div className="px-4 py-3 border-b-2 border-duo-border flex items-center justify-between bg-[#F8FAFC]">
        {/* Left: "Hôm nay" 3D Red Pill Button + Calendar Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewType('week')}
            className="btn-3d-hust text-white font-black text-xs sm:text-sm px-4 py-1.5 rounded-xl cursor-pointer"
          >
            Hôm nay
          </button>
          <button
            type="button"
            onClick={() => setViewType('week')}
            className="btn-3d-white text-duo-dark w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer"
            title="Lịch tuần"
          >
            <CalendarIcon className="w-4 h-4 text-duo-blue" />
          </button>
        </div>

        {/* Right: Dropdown "Lịch tuần ⌵" */}
        <div className="relative">
          <select
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            className="px-3.5 py-1.5 rounded-xl border-2 border-duo-border text-xs sm:text-sm font-black text-duo-dark bg-white hover:border-duo-blue focus:outline-none cursor-pointer shadow-xs pr-7 transition-colors"
          >
            <option value="week">Lịch tuần (Week 43)</option>
            <option value="threeDays">Lịch 3 ngày hội thảo</option>
            <option value="day">Lịch Thứ 6 (Trọng tâm)</option>
          </select>
        </div>
      </div>

      {/* =========================================================================
          2. TIMETABLE GRID (Header with Crimson < W43 - 2026 > Badge + Day Columns)
          ========================================================================= */}
      <div className="overflow-x-auto relative">
        <div className="min-w-[950px] select-none" style={{ width: '100%' }}>
          {/* Header Row: Corner Crimson Badge + 7 Day Columns */}
          <div
            className="grid border-b border-slate-300 bg-white sticky top-0 z-20"
            style={{
              gridTemplateColumns: `110px repeat(${displayedDays.length}, minmax(0, 1fr))`
            }}
          >
            {/* Corner Header Cell: Dark Red Badge "< W43 - 2026 >" (Matches Image 1) */}
            <div className="border-r border-slate-200 p-1.5 flex items-center justify-center bg-white">
              <div className="w-full bg-[#b91c1c] text-white rounded-md px-2 py-1 flex items-center justify-between shadow-xs">
                <button
                  type="button"
                  className="w-5 h-5 rounded-full bg-white text-[#b91c1c] flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Tuần trước"
                >
                  <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
                <span className="font-bold text-[11px] sm:text-xs tracking-tight text-white whitespace-nowrap">
                  W43 - 2026
                </span>
                <button
                  type="button"
                  className="w-5 h-5 rounded-full bg-white text-[#b91c1c] flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Tuần sau"
                >
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* Day Header Columns: "Thứ hai \n 19.10.2026" (Matches Image 1) */}
            {displayedDays.map((d) => (
              <div
                key={d.dayNumber}
                className="py-2.5 px-2 text-center border-r border-slate-200 last:border-r-0 bg-white"
              >
                <div className="text-xs sm:text-[13px] font-normal text-slate-700">
                  {d.label}
                </div>
                <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5 tracking-tight">
                  {d.fullDate}
                </div>
                {d.isConference && (
                  <span
                    className={`inline-block mt-0.5 text-[10px] px-1.5 py-0.2 rounded font-medium ${
                      d.isFocus
                        ? 'bg-amber-100 text-amber-900 font-semibold'
                        : 'bg-red-50 text-red-700'
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
                  className="absolute right-2 text-right font-sans text-xs text-slate-500 -translate-y-2 select-none flex items-center justify-end gap-1"
                  style={{ top: `${idx * HOUR_HEIGHT}px` }}
                >
                  <span className="text-slate-400">-</span>
                  <span>{`${hour}:00`}</span>
                </div>
              ))}
            </div>

            {/* Days Columns Body with Events */}
            {displayedDays.map((d, dayIndex) => {
              const dayEvents = eventsByDay[d.dayNumber] || [];

              // Calculate current time indicator for today (19.10 or active day)
              const showCurrentTime = d.isToday || d.dayNumber === '19';
              const currentMinOfDay = currentTime.hour * 60 + currentTime.minute;
              const currentTopPx = ((currentMinOfDay - START_HOUR * 60) / 60) * HOUR_HEIGHT;
              const isCurrentTimeInRange =
                currentMinOfDay >= START_HOUR * 60 && currentMinOfDay <= END_HOUR * 60;

              return (
                <div
                  key={d.dayNumber}
                  className="border-r border-slate-200 last:border-r-0 relative bg-white"
                >
                  {/* Dashed Horizontal Hour Grid Lines across the day */}
                  {hours.map((_, idx) => (
                    <div
                      key={idx}
                      className="absolute inset-x-0 border-b border-dashed border-slate-200 pointer-events-none"
                      style={{ top: `${idx * HOUR_HEIGHT}px`, height: '1px' }}
                    />
                  ))}

                  {/* Red Current Time Line Indicator (Matches Image 1 at 05:43 / current time) */}
                  {showCurrentTime && isCurrentTimeInRange && (
                    <div
                      className="absolute inset-x-0 z-30 pointer-events-none"
                      style={{ top: `${currentTopPx}px` }}
                    >
                      <div className="relative">
                        {/* Red Time Badge sitting right on the line */}
                        <div className="absolute -top-4 left-0 text-red-600 font-bold text-[11px] font-mono leading-none">
                          {`${String(currentTime.hour).padStart(2, '0')}:${String(
                            currentTime.minute
                          ).padStart(2, '0')}`}
                        </div>
                        {/* Red Line */}
                        <div className="h-[1.5px] bg-red-600 w-full relative">
                          <div className="w-2 h-2 rounded-full bg-red-600 absolute -left-1 -top-[3.25px]"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Event Cards in Day Column */}
                  {dayEvents.map((ev) => {
                    const topPx = ((ev.startMin - START_HOUR * 60) / 60) * HOUR_HEIGHT;
                    const heightPx = Math.max((ev.durationMin / 60) * HOUR_HEIGHT - 6, 52);
                    const isHovered = hoveredEventId === ev.id;
                    const speaker = getSpeakerText(ev);
                    const timeLabel = formatEventTimeLabel(ev);
                    const catInfo = getCategoryInfo(ev.category);

                    // Multi-column width for parallel sessions
                    const totalCols = ev.totalCols || 1;
                    const colIdx = ev.colIndex || 0;
                    const colWidthPct = 100 / totalCols;
                    const leftPct = colIdx * colWidthPct;

                    // Smart popover anchor orientation to never clip outside the timetable or screen
                    const isRightSide =
                      displayedDays.length === 1
                        ? colIdx >= totalCols / 2
                        : dayIndex >= displayedDays.length - 2 ||
                          (dayIndex >= displayedDays.length - 3 && colIdx >= 1);

                    const isBottomHalf = ev.startMin >= 17 * 60; // 17:00 onwards
                    const isAdmin = currentUser?.isAdmin || currentUser?.mssv === '20227035';
                    const canDelete =
                      isAdmin || (ev.createdByMssv && ev.createdByMssv === currentUser?.mssv);

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
                        {/* 1. Base Card in the Timetable Grid (Always solid & nicely proportioned) */}
                        <div
                          onClick={() => onEventClick && onEventClick(ev)}
                          className={`w-full h-full rounded-md border border-slate-200/90 border-l-[3.5px] border-l-red-600 bg-white p-1.5 sm:p-2 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-150 ${
                            isHovered
                              ? 'ring-2 ring-red-500 shadow-md bg-red-50/20'
                              : 'shadow-xs hover:border-slate-300 hover:shadow-sm'
                          }`}
                        >
                          <div>
                            <h5
                              className="text-xs font-bold text-red-600 leading-tight line-clamp-2"
                              title={ev.title}
                            >
                              {ev.isHighlight && (
                                <Star className="inline w-3 h-3 fill-amber-500 text-amber-500 mr-1 shrink-0 -mt-0.5" />
                              )}
                              {ev.title}
                            </h5>

                            <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-700 mt-1 truncate">
                              <CalendarIcon className="w-3 h-3 text-slate-500 shrink-0 stroke-[1.75]" />
                              <span className="font-medium text-slate-800 truncate">{timeLabel}</span>
                            </div>

                            {ev.location && heightPx >= 52 && (
                              <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-600 mt-0.5 truncate">
                                <MapPin className="w-3 h-3 text-slate-400 shrink-0 stroke-[1.75]" />
                                <span className="truncate">{ev.location}</span>
                              </div>
                            )}

                            {speaker && heightPx >= 68 && (
                              <div className="flex items-center gap-1 text-[10px] sm:text-[11px] text-slate-600 mt-0.5 truncate">
                                <User className="w-3 h-3 text-slate-400 shrink-0 stroke-[1.75]" />
                                <span className="truncate">{speaker}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* 2. Floating Popover (Smartly bounded, elegant preview on hover) */}
                        {isHovered && (
                          <div
                            onClick={() => onEventClick && onEventClick(ev)}
                            className="absolute z-50 bg-white rounded-xl shadow-2xl border border-slate-200 border-l-[5px] border-l-red-600 text-slate-800 cursor-pointer pointer-events-auto ring-1 ring-black/10 animate-fade-in flex flex-col"
                            style={{
                              width: '320px',
                              maxWidth: 'min(360px, 88vw)',
                              maxHeight: '340px',
                              ...(isRightSide ? { right: 0 } : { left: 0 }),
                              ...(isBottomHalf ? { bottom: 0 } : { top: 0 })
                            }}
                          >
                            {/* Popover Header (Pinned Top) */}
                            <div className="p-3 pb-2 border-b border-slate-100 bg-white rounded-t-xl shrink-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                                    <span
                                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${catInfo.color}`}
                                    >
                                      {catInfo.text}
                                    </span>
                                    {ev.isHighlight && (
                                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white flex items-center gap-0.5">
                                        <Star className="w-2.5 h-2.5 fill-white" /> Trọng tâm
                                      </span>
                                    )}
                                  </div>
                                  <h4 className="text-xs sm:text-[13px] font-bold text-red-600 leading-snug break-words">
                                    {ev.title}
                                  </h4>
                                </div>

                                {/* Quick Action buttons */}
                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onEventClick && onEventClick(ev);
                                    }}
                                    className="p-1.5 rounded-md hover:bg-blue-50 text-slate-500 hover:text-blue-600 transition-colors"
                                    title="Chỉnh sửa chi tiết"
                                  >
                                    <Pen className="w-3.5 h-3.5" />
                                  </button>
                                  {canDelete ? (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteEvent && onDeleteEvent(ev);
                                      }}
                                      className="p-1.5 rounded-md hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors"
                                      title="Xóa sự kiện"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteEvent && onDeleteEvent(ev);
                                      }}
                                      className="p-1.5 rounded-md text-slate-300 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                                      title="Chỉ Nguyễn Quang Anh (20227035) mới có quyền xóa sự kiện này"
                                    >
                                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Key Meta Details */}
                              <div className="mt-2 grid grid-cols-1 gap-1 text-[11px] text-slate-600">
                                <div className="flex items-center gap-1.5">
                                  <CalendarIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <span className="font-semibold text-slate-800">{timeLabel}</span>
                                </div>
                                {ev.location && (
                                  <div className="flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                    <span className="text-slate-700 truncate">{ev.location}</span>
                                  </div>
                                )}
                                {speaker && (
                                  <div className="flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                    <span className="text-slate-700 truncate">{speaker}</span>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Popover Scrollable Body (Max height with thin custom scrollbar) */}
                            <div className="p-3 pt-2 overflow-y-auto custom-scrollbar space-y-2 flex-1 text-slate-700">
                              {/* Member Personal Assignment Note */}
                              {selectedMember !== 'all' &&
                                ev.memberNotes &&
                                ev.memberNotes[selectedMember] && (
                                  <div className="p-2 bg-rose-50/90 border border-rose-200/90 rounded-lg text-[11px] text-rose-950 leading-relaxed shadow-2xs">
                                    <div className="font-bold flex items-center gap-1 text-rose-800 text-[10px] uppercase tracking-wide mb-0.5">
                                      <span>📌 Nhiệm vụ của bạn</span>
                                    </div>
                                    {ev.memberNotes[selectedMember]}
                                  </div>
                                )}

                              {/* Description */}
                              {ev.description && (
                                <div className="text-[11px] text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50/80 p-2 rounded-lg border border-slate-100">
                                  {ev.description}
                                </div>
                              )}

                              {/* Sub-items (Parallel sessions / Papers list) */}
                              {ev.subItems && ev.subItems.length > 0 && (
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-700 uppercase tracking-wide">
                                    <span>Chi tiết các phòng / Bài báo ({ev.subItems.length})</span>
                                    <span className="text-[9px] font-normal text-slate-400">Cuộn xem thêm</span>
                                  </div>
                                  <div className="space-y-1">
                                    {ev.subItems.map((sub, sIdx) => (
                                      <div
                                        key={sIdx}
                                        className={`p-1.5 rounded-md text-[11px] leading-snug border transition-colors ${
                                          sub.highlight
                                            ? 'bg-amber-50 border-amber-300 text-amber-950 font-medium'
                                            : 'bg-white border-slate-200 text-slate-700'
                                        }`}
                                      >
                                        <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 font-bold mb-0.5">
                                          {sub.highlight && <span className="text-amber-600">⭐ ĐOÀN HUST</span>}
                                          <span>{sub.time}</span>
                                        </div>
                                        <div>{sub.text}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Popover Footer (Pinned Bottom) */}
                            <div className="px-3 py-1.5 bg-slate-50/80 border-t border-slate-100 rounded-b-xl flex items-center justify-between text-[10px] text-slate-400 shrink-0">
                              <span className="flex items-center gap-1 text-slate-500 hover:text-red-600 font-medium transition-colors">
                                <ExternalLink className="w-3 h-3" /> Nhấp để mở toàn màn hình & chỉnh sửa
                              </span>
                              <span className="text-[9px] font-mono text-slate-400">ICEF 2026</span>
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


