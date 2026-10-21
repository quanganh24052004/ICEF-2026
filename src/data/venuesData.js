/**
 * venuesData.js - Thông tin tọa độ, địa chỉ và bản đồ Google Maps của các địa điểm Hội thảo ICEF 2026
 */

export const KEY_LOCATIONS = {
  hust_c7: {
    id: 'hust_c7',
    name: 'Tòa nhà C7 - Đại học Bách khoa Hà Nội',
    shortName: 'Tòa C7 ĐHBK Hà Nội',
    badge: 'Điểm Tập Kết • Xe BSX 29E 17655',
    badgeColor: 'bg-red-100 text-red-800 border-red-200',
    type: 'departure',
    address: 'Số 1 Đại Cồ Việt, Phường Bách Khoa, Quận Hai Bà Trưng, Hà Nội',
    phone: '0986181412',
    driverInfo: 'Lx Thùy: 0986 181 412',
    busPlate: '29E 17655',
    note: 'Có mặt lúc 11:00 AM (tự túc ăn trưa), Xe xuất phát đúng 11:30 AM ngày Thứ 5 (22/10). Xe đón tại C7: BSX 29E 17655 (Lái xe Thùy: 0986 181 412).',
    distance: '~80 km đến Ninh Bình (khoảng 1h30 - 1h45 di chuyển)',
    mapQuery: 'Tòa nhà C7 Đại học Bách khoa Hà Nội',
    embedUrl: 'https://maps.google.com/maps?q=T%C3%B2a+nh%C3%A0+C7+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+B%C3%A1ch+khoa+H%C3%A0+N%E1%BB%99i&t=&z=16&ie=UTF8&iwloc=&output=embed',
    directUrl: 'https://www.google.com/maps/search/?api=1&query=Tòa+nhà+C7+Đại+học+Bách+khoa+Hà+Nội'
  },
  alo_garden: {
    id: 'alo_garden',
    name: 'ALO RESORT NINH BÌNH (Khách sạn Alo Garden)',
    shortName: 'Alo Resort Ninh Bình',
    badge: 'Nơi Lưu Trú & Đón Shuttle Bus',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    type: 'hotel',
    address: 'Số 7 Đường Võ Nguyên Giáp, Xã Ninh Khang, Huyện Hoa Lư, Tỉnh Ninh Bình',
    phone: '+84 889 556 379',
    coordinates: {
      lat: 20.307108,
      lng: 105.949081
    },
    note: 'Lưu trú 2 đêm (22/10 & 23/10). Điểm đón/trả các chuyến Shuttle Bus: 14:30 (22/10), 07:40, 17:30, 18:30 (23/10). Hotline: +84 889 556 379.',
    distance: '~15 km sang Emeralda Resort (khoảng 15 - 20 phút xe trung chuyển) | ~6 km đến Nhà hàng 1969',
    mapQuery: 'ALO RESORT NINH BINH 7 Vo Nguyen Giap Road Ninh Khang Ninh Binh',
    embedUrl: 'https://maps.google.com/maps?q=20.307108,105.949081+(ALO+RESORT+NINH+B%C3%8CNH)&t=&z=16&ie=UTF8&iwloc=&output=embed',
    directUrl: 'https://www.google.com/maps/search/?api=1&query=20.307108,105.949081',
    bingUrl: 'https://www.bing.com/maps?&mepi=0~~Embedded~Address_Link&ty=18&q=ALO%20RESORT%20NINH%20B%C3%8CNH&ss=ypid.YN419317FCB8E833EB&ppois=20.30710792541504_105.94908142089844_ALO%20RESORT%20NINH%20B%C3%8CNH_YN419317FCB8E833EB~&cp=20.307108~105.949081&v=2&sV=1&FORM=MPSRPL'
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
    distance: '~90 km từ Hà Nội | ~15 km từ Alo Resort (Ninh Khang) | ~12 km đến Nhà hàng 1969',
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
    note: 'Địa điểm tổ chức Tiệc Chào Mừng (Welcome Dinner 18:30 Thứ 5, 22/10) và Tiệc Gala Dinner chính thức (19:00 Thứ 6, 23/10). Xe trung chuyển đón từ Alo Resort lúc 18:30.',
    distance: '~6 km từ Alo Resort (khoảng 8 - 10 phút) | ~12 km từ Emeralda Resort',
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
