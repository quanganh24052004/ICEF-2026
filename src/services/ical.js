/**
 * ical.js - Tạo file iCalendar (.ics) chuẩn RFC 5545
 * Hỗ trợ đồng bộ trực tiếp vào Google Calendar, Apple Calendar (iPhone/Mac), Outlook.
 */

export function generateICS(schedules, memberName = 'Cả đoàn') {
  const pad = (n) => (n < 10 ? '0' + n : n);

  const formatICSDate = (day, timeStr, isEnd = false) => {
    const year = 2026;
    const month = 10;
    const dateNum = parseInt(day, 10);

    // timeStr format: "13:15 – 15:10" or "10:00"
    const parts = timeStr.split(/–|-/).map((s) => s.trim());
    let targetTime = parts[0];

    if (isEnd) {
      if (parts.length > 1) {
        targetTime = parts[1];
      } else {
        // Mặc định cộng thêm 1 tiếng nếu chỉ có giờ bắt đầu
        const [h, m] = parts[0].split(':').map((n) => parseInt(n, 10));
        targetTime = `${pad(Math.min(h + 1, 23))}:${pad(m || 0)}`;
      }
    }

    const [hour, minute] = targetTime.split(':').map((n) => parseInt(n, 10));
    return `${year}${pad(month)}${pad(dateNum)}T${pad(hour || 8)}${pad(minute || 0)}00`;
  };

  const escapeText = (str) => {
    if (!str) return '';
    return str
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n');
  };

  const eventsICS = schedules.map((ev) => {
    const dtStart = formatICSDate(ev.day, ev.time, false);
    const dtEnd = formatICSDate(ev.day, ev.time, true);
    const uid = `${ev.id || Date.now()}@icef2026.hust.edu.vn`;
    const summary = escapeText(ev.title);
    const location = escapeText(ev.location || 'Emeralda Resort Ninh Bình');

    let desc = ev.description || '';
    if (ev.memberNotes) {
      desc += '\n\n--- PHÂN CÔNG NHIỆM VỤ ---\n';
      Object.entries(ev.memberNotes).forEach(([mId, note]) => {
        desc += `• ${mId}: ${note}\n`;
      });
    }
    const description = escapeText(desc);

    return [
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${formatICSDate('22', '08:00', false)}Z`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${summary}`,
      `LOCATION:${location}`,
      `DESCRIPTION:${description}`,
      'STATUS:CONFIRMED',
      // Báo thức trước 15 phút
      'BEGIN:VALARM',
      'TRIGGER:-PT15M',
      'ACTION:DISPLAY',
      `DESCRIPTION:Nhắc nhở: ${summary}`,
      'END:VALARM',
      'END:VEVENT'
    ].join('\r\n');
  });

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//ICEF 2026 Research Team//HUST and HUCE//VI',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:Lịch Trình ICEF 2026 (${memberName})`,
    'X-WR-TIMEZONE:Asia/Ho_Chi_Minh',
    ...eventsICS,
    'END:VCALENDAR'
  ];

  return icsLines.join('\r\n');
}

export function downloadICSFile(schedules, memberName = 'Cả đoàn') {
  const icsContent = generateICS(schedules, memberName);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const safeName = memberName.replace(/\s+/g, '_');
  a.download = `Lich_Trinh_ICEF2026_${safeName}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
