/**
 * venuesData.js - Thông tin tọa độ, địa chỉ và bản đồ Google Maps của các địa điểm Hội thảo ICEF 2026
 */

export const KEY_LOCATIONS = {
  hust_c7: {
    id: 'hust_c7',
    name: 'Tòa nhà C7 - Đại học Bách khoa Hà Nội',
    shortName: 'Tòa C7 ĐHBK Hà Nội',
    badge: 'Điểm Xuất Phát & Tập Kết',
    badgeColor: 'bg-red-100 text-red-800 border-red-200',
    type: 'departure',
    address: 'Số 1 Đại Cồ Việt, Phường Bách Khoa, Quận Hai Bà Trưng, Hà Nội',
    note: 'Có mặt lúc 11:00 AM (tự túc ăn trưa), Xe xuất phát đúng 11:30 AM ngày Thứ 5 (22/10). Chiều 24/10 xe trả đoàn tại đây.',
    distance: '~90 km đến Ninh Bình (khoảng 1h45 - 2h di chuyển)',
    mapQuery: 'Tòa nhà C7 Đại học Bách khoa Hà Nội',
    embedUrl: 'https://maps.google.com/maps?q=T%C3%B2a+nh%C3%A0+C7+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+B%C3%A1ch+khoa+H%C3%A0+N%E1%BB%99i&t=&z=16&ie=UTF8&iwloc=&output=embed',
    directUrl: 'https://www.google.com/maps/search/?api=1&query=Tòa+nhà+C7+Đại+học+Bách+khoa+Hà+Nội'
  },
  alo_garden: {
    id: 'alo_garden',
    name: 'Khách sạn Alo Garden Ninh Bình',
    shortName: 'Khách sạn Alo Garden',
    badge: 'Nơi Lưu Trú & Đón Shuttle Bus',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    type: 'hotel',
    address: 'Thôn Vân Long, Xã Gia Vân, Huyện Gia Viễn, Tỉnh Ninh Bình',
    note: 'Lưu trú 2 đêm (22/10 & 23/10). Điểm đón/trả các chuyến Shuttle Bus: 14:30 (22/10), 07:40, 17:30, 18:30 (23/10).',
    distance: '~1.5 km sang Emeralda Resort (khoảng 3 - 5 phút đi xe trung chuyển)',
    mapQuery: 'Alo Garden Homestay Gia Van Gia Vien Ninh Binh',
    embedUrl: 'https://maps.google.com/maps?q=Alo+Garden+Homestay+Gia+Van+Gia+Vien+Ninh+Binh&t=&z=16&ie=UTF8&iwloc=&output=embed',
    directUrl: 'https://www.google.com/maps/search/?api=1&query=Alo+Garden+Ninh+Binh'
  },
  emeralda: {
    id: 'emeralda',
    name: 'Emeralda Resort Ninh Bình',
    shortName: 'Emeralda Resort',
    badge: 'Địa Điểm Hội Thảo ICEF 2026',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    type: 'conference',
    address: 'Khu bảo tồn Đầm Vân Long, Xã Gia Vân, Huyện Gia Viễn, Tỉnh Ninh Bình',
    note: 'Địa điểm tổ chức: Van Long Ballroom (Phiên Toàn thể), Van Trinh 1 (Workshop & Session 1, 6), Van Trinh 2 (Session 2 - Oral PID 628, Session 7), Hoa Lu 1-3 (Session 3-5, 8-10), và Sảnh Hall (Triển lãm Poster PID 661).',
    distance: '~90 km từ Hà Nội | ~1.5 km từ Alo Garden | ~12 km đến Nhà hàng 1969',
    mapQuery: 'Emeralda Resort Ninh Binh',
    embedUrl: 'https://maps.google.com/maps?q=Emeralda+Resort+Ninh+Binh&t=&z=16&ie=UTF8&iwloc=&output=embed',
    directUrl: 'https://www.google.com/maps/search/?api=1&query=Emeralda+Resort+Ninh+Binh'
  },
  restaurant_1969: {
    id: 'restaurant_1969',
    name: 'Nhà hàng 1969 Ninh Bình',
    shortName: 'Nhà hàng 1969',
    badge: 'Welcome Dinner & Gala Dinner',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    type: 'dining',
    address: 'Đường Văn Tiến Dũng / Kim Đa, Phường Ninh Khánh (Hoa Lư), TP. Ninh Bình',
    note: 'Địa điểm tổ chức Tiệc Chào Mừng (Welcome Dinner 18:30 Thứ 5, 22/10) và Tiệc Gala Dinner chính thức (19:00 Thứ 6, 23/10). Xe trung chuyển đón từ Alo Garden lúc 18:30.',
    distance: '~12 km từ Emeralda Resort / Alo Garden (khoảng 15 - 20 phút đi xe)',
    mapQuery: 'Nha hang 1969 Ninh Binh Van Tien Dung Kim Da',
    embedUrl: 'https://maps.google.com/maps?q=Nh%C3%A0+h%C3%A0ng+1969+Ninh+B%C3%ACnh&t=&z=16&ie=UTF8&iwloc=&output=embed',
    directUrl: 'https://www.google.com/maps/search/?api=1&query=Nhà+hàng+1969+Ninh+Bình'
  }
};

/**
 * Tự động tìm địa điểm tương ứng từ chuỗi tên địa điểm trong lịch trình
 */
export const findVenueByLocationText = (text) => {
  if (!text) return KEY_LOCATIONS.emeralda;
  const lower = text.toLowerCase();

  if (
    lower.includes('c7') ||
    lower.includes('bách khoa') ||
    lower.includes('hà nội') ||
    lower.includes('tạ quang bửu') ||
    lower.includes('hust')
  ) {
    return KEY_LOCATIONS.hust_c7;
  }

  if (
    lower.includes('alo') ||
    lower.includes('khách sạn') ||
    lower.includes('homestay') ||
    lower.includes('phòng nam') ||
    lower.includes('phòng nữ')
  ) {
    return KEY_LOCATIONS.alo_garden;
  }

  if (
    lower.includes('1969') ||
    lower.includes('nhà hàng') ||
    lower.includes('văn tiến dũng') ||
    lower.includes('kim đa') ||
    lower.includes('gala')
  ) {
    return KEY_LOCATIONS.restaurant_1969;
  }

  return KEY_LOCATIONS.emeralda;
};
