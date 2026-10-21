/**
 * initialData.js - Dữ liệu mặc định cho Hội thảo ICEF 2026
 * Nhóm Nghiên cứu HUST & HUCE - Emeralda Resort & Alo Garden Ninh Bình
 */

export const INITIAL_MEMBERS = [
  {
    id: 'quang_anh',
    name: 'Nguyễn Quang Anh',
    shortName: 'Quang Anh',
    mssv: '20227035',
    email: 'anh.nq227035@sis.hust.edu.vn',
    isAdmin: true,
    roleTitle: 'Trưởng đoàn (Quản trị viên cao nhất)',
    gender: 'male',
    room: 'Phòng Nam (Triple - Khách sạn Alo Garden)',
    roomRole: 'Trưởng phòng Nam (Đã TT 1.500.000đ)',
    academicRole: 'Đồng tác giả PID 628 — Dự nghe, hỗ trợ kỹ thuật/ghi hình & Q&A tại Session 2',
    badge: '👑 Admin / Trưởng đoàn',
    icon: 'Key'
  },
  {
    id: 'dinh_khoi',
    name: 'Vũ Đình Khôi',
    shortName: 'Đình Khôi',
    mssv: '20235124',
    email: 'khoi.vd235124@sis.hust.edu.vn',
    isAdmin: false,
    roleTitle: 'Thành viên nghiên cứu HUST',
    gender: 'male',
    room: 'Phòng Nam (Triple - Khách sạn Alo Garden)',
    roomRole: 'Thành viên phòng Nam (Đã bao gồm ăn sáng)',
    academicRole: '🖼️ Báo cáo viên chính Poster PID 661 (Trực tại Poster Session 1–3 từ 13:15 – 15:10)',
    badge: 'Báo cáo Poster PID 661',
    icon: 'Presentation'
  },
  {
    id: 'khanh_linh',
    name: 'Nguyễn Khánh Linh',
    shortName: 'Khánh Linh',
    mssv: '202511831',
    email: 'linh.nk2511831@sis.hust.edu.vn',
    isAdmin: false,
    roleTitle: 'Thành viên nghiên cứu HUST',
    gender: 'female',
    room: 'Phòng Nữ (Quadruple - Khách sạn Alo Garden)',
    roomRole: 'Thành viên phòng Nữ (Đã bao gồm ăn sáng)',
    academicRole: '🎤 Diễn giả Báo cáo chính Oral PID 628 (Session 2, khung 13:51 – 14:09)',
    badge: 'Diễn giả Oral PID 628',
    icon: 'Mic'
  },
  {
    id: 'thi_hong',
    name: 'Trịnh Thị Hồng',
    shortName: 'Thị Hồng',
    mssv: '20231592',
    email: 'hong.tt231592@sis.hust.edu.vn',
    isAdmin: false,
    roleTitle: 'Thành viên nghiên cứu HUST',
    gender: 'female',
    room: 'Phòng Nữ (Quadruple - Khách sạn Alo Garden)',
    roomRole: 'Thành viên phòng Nữ (Đã bao gồm ăn sáng)',
    academicRole: 'Đồng tác giả PID 628 — Dự nghe, hỗ trợ & ghi chép Q&A tại Session 2',
    badge: 'Đồng tác giả PID 628',
    icon: 'GraduationCap'
  },
  {
    id: 'thao_nguyen',
    name: 'Nguyễn Thảo Nguyên',
    shortName: 'Thảo Nguyên',
    mssv: '202412071',
    email: 'nguyen.nt2412071@sis.hust.edu.vn',
    isAdmin: false,
    roleTitle: 'Thành viên nghiên cứu HUST',
    gender: 'female',
    room: 'Phòng Nữ (Quadruple - Khách sạn Alo Garden)',
    roomRole: 'Trưởng phòng Nữ (Đã TT 1.800.000đ)',
    academicRole: 'Đồng tác giả PID 628 — Dự nghe, hỗ trợ & ghi chép Q&A tại Session 2',
    badge: 'Trưởng phòng Nữ',
    icon: 'Key'
  },
  {
    id: 'duc_kien',
    name: 'Trần Đức Kiên',
    shortName: 'Đức Kiên',
    mssv: '202511823',
    email: 'kien.td2511823@sis.hust.edu.vn',
    isAdmin: false,
    roleTitle: 'Thành viên nghiên cứu HUST',
    gender: 'male',
    room: 'Phòng Nam (Triple - Khách sạn Alo Garden)',
    roomRole: 'Thành viên phòng Nam (Đã bao gồm ăn sáng)',
    academicRole: '🎤 Diễn giả Báo cáo chính Oral PID 628 (Session 2, khung 13:51 – 14:09)',
    badge: 'Diễn giả Oral PID 628',
    icon: 'Mic'
  },
  {
    id: 'phuong_ly',
    name: 'Bùi Thị Phương Ly',
    shortName: 'Phương Ly',
    mssv: '0395969',
    email: 'ly.bt0395969@huce.edu.vn',
    isAdmin: false,
    roleTitle: 'Thành viên nghiên cứu HUCE',
    gender: 'female',
    room: 'Phòng Nữ (Quadruple - Khách sạn Alo Garden)',
    roomRole: 'Thành viên phòng Nữ (Đã bao gồm ăn sáng)',
    academicRole: 'Đồng tác giả PID 628 (ĐH Xây dựng HN - HUCE) — Dự nghe & hỗ trợ tại Session 2',
    badge: 'Đồng tác giả PID 628',
    icon: 'GraduationCap'
  }
];

export const ALL_MEMBER_IDS = ['quang_anh', 'duc_kien', 'dinh_khoi', 'thao_nguyen', 'khanh_linh', 'thi_hong', 'phuong_ly'];
export const ORAL_TEAM_IDS = ['quang_anh', 'duc_kien', 'thao_nguyen', 'khanh_linh', 'thi_hong', 'phuong_ly'];

export const INITIAL_SCHEDULE = [
  // ================= THỨ 5 (22/10/2026) =================
  {
    id: 'sch-22-1',
    day: '22',
    date: '2026-10-22',
    fullDate: '22.10.2026',
    dayTitle: 'THỨ 5 (22/10/2026): Di chuyển, Check-in & Pre-conference Workshops',
    time: '11:00 – 11:30',
    title: 'Có mặt tập trung tại Tòa nhà C7, ĐH Bách khoa Hà Nội',
    location: 'Tòa nhà C7 - Đại học Bách khoa Hà Nội',
    category: 'travel',
    participants: [...ALL_MEMBER_IDS],
    speaker: 'BSX: 29E 17655 • Lx Thùy (0986 181 412)',
    description: 'Có mặt đúng 11h00 tại Tòa nhà C7 ĐH Bách khoa Hà Nội để tập trung, điểm danh và sắp xếp hành lý lên xe. (Lưu ý: Đại biểu tự túc ăn trưa trước hoặc trên đường di chuyển).\n\n🚌 Thông tin Xe tại C7:\n• Biển số xe (BSX): 29E 17655\n• Lái xe: Lx Thùy - 📞 0986 181 412\n\n🚗 Danh sách xe (Dự kiến):\n- Xe 1 (BSX 29E 17655): Gồm đủ 6 thành viên của PID 628 (Nguyễn Quang Anh, Trần Đức Kiên, Đặng Thảo Nguyên, Nguyễn Khánh Linh, Trịnh Thị Hồng, Bùi Thị Phương Ly).\n- Thành viên Vũ Đình Khôi (PID 661) di chuyển theo phương án đoàn/xe riêng.',
    memberNotes: {
      quang_anh: 'Có mặt đúng 11h00 tại C7 ĐHBK. Liên hệ Lx Thùy (0986 181 412 - BSX 29E 17655). Điều phối danh sách Xe 1 (6 thành viên PID 628).',
      thao_nguyen: 'Có mặt đúng 11h00 tại C7 ĐHBK. Kiểm tra quân số các thành viên nữ lên Xe 1 (BSX 29E 17655).',
      dinh_khoi: 'Có mặt đúng 11h00 tại C7 ĐHBK. Kiểm tra và bảo quản cẩn thận ống đựng Poster PID 661.',
      khanh_linh: 'Có mặt đúng 11h00 tại C7 ĐHBK. Chuẩn bị lên Xe 1 (BSX 29E 17655) cùng nhóm PID 628.',
      duc_kien: 'Có mặt đúng 11h00 tại C7 ĐHBK. Chuẩn bị lên Xe 1 (BSX 29E 17655) cùng nhóm PID 628.',
      thi_hong: 'Có mặt đúng 11h00 tại C7 ĐHBK. Chuẩn bị lên Xe 1 (BSX 29E 17655) cùng nhóm PID 628.',
      phuong_ly: 'Có mặt đúng 11h00 tại C7 ĐHBK. Chuẩn bị lên Xe 1 (BSX 29E 17655) cùng nhóm PID 628.'
    }
  },
  {
    id: 'sch-22-2',
    day: '22',
    date: '2026-10-22',
    fullDate: '22.10.2026',
    dayTitle: 'THỨ 5 (22/10/2026): Di chuyển, Check-in & Pre-conference Workshops',
    time: '11:30 – 13:30',
    title: 'Xe xuất phát khởi hành đi Ninh Bình (Xe 1 - BSX: 29E 17655)',
    location: 'Tòa nhà C7 ĐHBK Hà Nội → Khách sạn Alo Garden Ninh Bình',
    category: 'travel',
    participants: [...ALL_MEMBER_IDS],
    speaker: 'Lx Thùy (0986 181 412 - BSX 29E 17655)',
    description: 'Xe xuất phát đúng 11h30 AM từ Tòa nhà C7 ĐHBK Hà Nội. Dự kiến tới Ninh Bình lúc ~13:30.\n\n🚌 Thông tin xe:\n• Biển số xe: 29E 17655\n• Lái xe: Lx Thùy - 📞 0986 181 412\n\n🚗 Danh sách xe (Dự kiến):\n- Xe 1 (BSX 29E 17655): Đủ 6 thành viên PID 628 (Quang Anh, Đức Kiên, Thảo Nguyên, Khánh Linh, Thị Hồng, Phương Ly).',
    memberNotes: {
      quang_anh: 'Xe 1 (BSX 29E 17655 - Lx Thùy) khởi hành đúng 11h30 đi Ninh Bình.',
      dinh_khoi: 'Bảo quản cẩn thận poster PID 661 trong hành trình di chuyển.'
    }
  },
  {
    id: 'sch-22-3',
    day: '22',
    date: '2026-10-22',
    fullDate: '22.10.2026',
    dayTitle: 'THỨ 5 (22/10/2026): Di chuyển, Check-in & Pre-conference Workshops',
    time: '13:30 – 14:30',
    title: 'Đến Ninh Bình & Check-in Khách sạn Alo Garden',
    location: 'Khách sạn Alo Garden Ninh Bình',
    category: 'hotel',
    participants: [...ALL_MEMBER_IDS],
    description: 'Đoàn đến khách sạn Alo Garden lúc ~13h30. Nhận 01 phòng Triple Nam (750k/đêm) và 01 phòng Quadruple Nữ (900k/đêm). Cất hành lý, chuẩn bị trang phục dự Hội thảo chiều.',
    memberNotes: {
      quang_anh: 'Đại diện Trưởng phòng Nam làm thủ tục nhận phòng Triple.',
      thao_nguyen: 'Đại diện Trưởng phòng Nữ làm thủ tục nhận phòng Quadruple.'
    }
  },
  {
    id: 'sch-22-shuttle-1',
    day: '22',
    date: '2026-10-22',
    fullDate: '22.10.2026',
    dayTitle: 'THỨ 5 (22/10/2026): Di chuyển, Check-in & Pre-conference Workshops',
    time: '14:30 – 14:50',
    title: '🚌 Xe trung chuyển (Shuttle Transfer): Alo Garden → Emeralda Resort',
    location: 'Khách sạn Alo Garden → Emeralda Resort Ninh Bình',
    category: 'travel',
    participants: [...ALL_MEMBER_IDS],
    description: 'Xe trung chuyển của Ban tổ chức đón đại biểu tại khách sạn Alo Garden lúc 14:30 để sang Emeralda Resort tham dự các phiên Pre-conference Workshops tại Van Trinh 1 Ballroom.'
  },
  {
    id: 'sch-22-5',
    day: '22',
    date: '2026-10-22',
    fullDate: '22.10.2026',
    dayTitle: 'THỨ 5 (22/10/2026): Di chuyển, Check-in & Pre-conference Workshops',
    time: '15:00 – 16:30',
    title: 'Pre-conference Workshop 1: “GenAI-Mediated Academic Writing: Using AI Without Outsourcing Your Scholarship”',
    location: 'Van Trinh 1 Ballroom - Emeralda Resort Ninh Bình',
    category: 'academic',
    participants: [...ALL_MEMBER_IDS],
    description: 'Địa điểm: Van Trinh 1 Ballroom (Emeralda Resort).\nDiễn giả: Assoc. Prof. Lee Ju Seong (The Education University of Hong Kong — đồng thời là Chủ tọa Session 2 ngày mai của nhóm). (Song song có phiên online của University of Glasgow).'
  },
  {
    id: 'sch-22-6',
    day: '22',
    date: '2026-10-22',
    fullDate: '22.10.2026',
    dayTitle: 'THỨ 5 (22/10/2026): Di chuyển, Check-in & Pre-conference Workshops',
    time: '16:30 – 18:00',
    title: 'Pre-conference Workshop 3: “Publishing in Top Journals in the AI Era”',
    location: 'Van Trinh 1 Ballroom - Emeralda Resort Ninh Bình',
    category: 'academic',
    participants: [...ALL_MEMBER_IDS],
    description: 'Địa điểm: Van Trinh 1 Ballroom (Emeralda Resort).\nDiễn giả: Dr. Lizana Oberholzer (Chair of International Professional Development Association - IPDA, Anh).'
  },
  {
    id: 'sch-22-7',
    day: '22',
    date: '2026-10-22',
    fullDate: '22.10.2026',
    dayTitle: 'THỨ 5 (22/10/2026): Di chuyển, Check-in & Pre-conference Workshops',
    time: '18:30 – 21:00',
    title: 'Tiệc Chào Mừng (Welcome Dinner)',
    location: 'Nhà hàng 1969 (Đường Văn Tiến Dũng / Kim Đa, Phường Hoa Lư, Ninh Bình)',
    category: 'meal',
    participants: [...ALL_MEMBER_IDS],
    description: 'Tham dự tiệc tối Welcome Dinner giao lưu cùng Ban tổ chức và các đại biểu quốc tế tại Nhà hàng 1969 (Đường Văn Tiến Dũng / Kim Đa, Phường Hoa Lư, TP. Ninh Bình). Xe trung chuyển đưa đoàn về lại khách sạn Alo Garden sau tiệc.'
  },

  // ================= THỨ 6 (23/10/2026) - SÁNG =================
  {
    id: 'sch-23-breakfast',
    day: '23',
    date: '2026-10-23',
    fullDate: '23.10.2026',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '06:45 – 07:35',
    title: 'Ăn sáng tại khách sạn Alo Garden',
    location: 'Khách sạn Alo Garden Ninh Bình',
    category: 'meal',
    participants: [...ALL_MEMBER_IDS],
    description: 'Dùng bữa sáng tại khách sạn (đã bao gồm trong chi phí phòng). Chuẩn bị thẻ đại biểu, trang phục lịch sự và tài liệu báo cáo.'
  },
  {
    id: 'sch-23-shuttle-morning',
    day: '23',
    date: '2026-10-23',
    fullDate: '23.10.2026',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '07:40 – 08:00',
    title: '🚌 Xe trung chuyển (Shuttle Transfer): Alo Garden → Emeralda Resort',
    location: 'Khách sạn Alo Garden → Emeralda Resort Ninh Bình',
    category: 'travel',
    participants: [...ALL_MEMBER_IDS],
    description: 'Xe trung chuyển đón đại biểu lúc 07:40 tại khách sạn Alo Garden sang Emeralda Resort để kịp thời làm thủ tục check-in và tham dự Khai mạc Phiên Toàn thể.'
  },
  {
    id: 'sch-23-1',
    day: '23',
    date: '2026-10-23',
    fullDate: '23.10.2026',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '08:00 – 08:35',
    title: 'Đăng ký đại biểu (Registration)',
    location: 'Sảnh chính & Van Long Ballroom - Emeralda Resort Ninh Bình',
    category: 'general',
    participants: [...ALL_MEMBER_IDS],
    description: 'Nhận thẻ đại biểu, tài liệu hội thảo. Kiểm tra phòng báo cáo Session 2 (Van Trinh 2 Ballroom) và khu vực Hall triển lãm Poster PID 661.',
    memberNotes: {
      khanh_linh: 'Kiểm tra danh sách trình chiếu bài PID 628 tại bàn BTC.',
      duc_kien: 'Kiểm tra kết nối file slide PID 628.',
      dinh_khoi: 'Xác nhận vị trí bảng dán Poster PID 661 tại khu vực Hall Poster Session No. 1–2.'
    }
  },
  {
    id: 'sch-23-2',
    day: '23',
    date: '2026-10-23',
    fullDate: '23.10.2026',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '08:35 – 08:50',
    title: 'Khai mạc Phiên Toàn thể (Plenary Session)',
    location: 'Van Long Ballroom - Emeralda Resort',
    category: 'plenary',
    participants: [...ALL_MEMBER_IDS],
    description: 'Địa điểm: Van Long Ballroom.\n08:35 – 08:45: Giới thiệu chương trình và đại biểu tham dự.\n08:45 – 08:50: Phát biểu khai mạc của Trưởng Ban tổ chức.'
  },
  {
    id: 'sch-23-3',
    day: '23',
    date: '2026-10-23',
    fullDate: '23.10.2026',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '08:50 – 10:10',
    title: 'Keynote Speech Section 1 (Moderator: Prof. Hatsuko Yoshikubo)',
    location: 'Van Long Ballroom - Emeralda Resort',
    category: 'plenary',
    participants: [...ALL_MEMBER_IDS],
    description: 'Địa điểm: Van Long Ballroom. Điều phối (Moderator): Prof. Hatsuko Yoshikubo (Shibaura Institute of Technology, Nhật Bản).\n• 08:50 – 09:10: Keynote 1 — Prof. Steffen Kersten (Dresden University of Technology, Đức)\n• 09:10 – 09:30: Keynote 2 — Dr. Lizana Oberholzer (Chair of IPDA, Anh)\n• 09:30 – 09:50: Keynote 3 — Assoc. Prof. Lee Ju Seong (Education University of Hong Kong)\n• 09:50 – 10:10: ⭐ Keynote 4 (Bổ sung mới) — Dr. John R. Baker: “From Concept to Implementation: Blueprints for Developing Sustainable Self-access Learning Programs”.'
  },
  {
    id: 'sch-23-4',
    day: '23',
    date: '2026-10-23',
    fullDate: '23.10.2026',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '10:10 – 10:30',
    title: 'Chụp ảnh lưu niệm & Tiệc trà sáng (Photo Session & Tea Break)',
    location: 'Sảnh Van Long Ballroom - Emeralda Resort',
    category: 'meal',
    participants: [...ALL_MEMBER_IDS],
    description: 'Cả nhóm chụp ảnh lưu niệm cùng toàn thể đại biểu hội thảo và dùng tiệc trà tại sảnh Van Long Ballroom.'
  },
  {
    id: 'sch-23-5',
    day: '23',
    date: '2026-10-23',
    fullDate: '23.10.2026',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '10:30 – 12:00',
    title: 'Keynote Speech Section 2 & Bế mạc Phiên Toàn thể (Moderator: Prof. Alandeom Oliveira)',
    location: 'Van Long Ballroom - Emeralda Resort',
    category: 'plenary',
    participants: [...ALL_MEMBER_IDS],
    description: 'Địa điểm: Van Long Ballroom. Điều phối (Moderator): Prof. Alandeom Oliveira (University at Albany, SUNY, Mỹ).\n• 10:30 – 10:50: Keynote 5 — Prof. Susan Drake (Brock University, Canada)\n• 10:50 – 11:10: Keynote 6 — Prof. Gina O. Gonong (Philippine Normal University)\n• 11:10 – 11:30: Keynote 7 — Prof. Sujatha Mukiri (EFLU, Ấn Độ)\n• 11:30 – 11:45: Thảo luận bàn tròn (Panel Discussion 2)\n• 11:45 – 12:00: Bế mạc Phiên Toàn thể & Hướng dẫn đại biểu về các phòng phân ban.'
  },
  {
    id: 'sch-23-6',
    day: '23',
    date: '2026-10-23',
    fullDate: '23.10.2026',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '12:00 – 13:15',
    title: 'Ăn trưa (Lunch) & Chuẩn bị thiết bị báo cáo Ca 1',
    location: 'Nhà hàng Emeralda Resort & Phòng báo cáo',
    category: 'meal',
    participants: [...ALL_MEMBER_IDS],
    description: 'Dùng bữa trưa tại Nhà hàng Emeralda Resort (điều chỉnh bắt đầu lúc 12:00 do thêm bài Keynote 4). Từ 12:45: Nhóm Oral di chuyển tới phòng Van Trinh 2 Ballroom copy slide & test mic; Vũ Đình Khôi hoàn tất dán Poster PID 661 tại khu vực Hall.',
    memberNotes: {
      khanh_linh: 'Có mặt tại phòng Van Trinh 2 Ballroom trước 13:00 gặp Thư ký Nguyễn Trần Khánh Phương để nạp slide.',
      duc_kien: 'Kiểm tra slide bài PID 628 và mic trình bày tại phòng Van Trinh 2 Ballroom.',
      dinh_khoi: 'Hoàn tất treo Poster PID 661 tại khu vực Hall trước 13:05.'
    }
  },

  // ================= THỨ 6 (23/10/2026) - CHIỀU CA 1 (TRỌNG TÂM) =================
  {
    id: 'sch-23-7',
    day: '23',
    date: '2026-10-23',
    fullDate: '23.10.2026',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '13:15 – 15:10',
    title: '⭐ [NHIỆM VỤ ORAL] Session 2: Learner Development, Agency, and Educational Experience',
    location: 'Van Trinh 2 Ballroom - Emeralda Resort',
    category: 'highlight_oral',
    isHighlight: true,
    participants: [...ORAL_TEAM_IDS],
    description: 'Chủ tọa (Chair): Assoc. Prof. Lee Ju Seong | Thư ký: Ms. Nguyễn Trần Khánh Phương.\nĐịa điểm: Van Trinh 2 Ballroom.\nThứ tự 6 bài báo trong phiên (mỗi bài ~18 phút):',
    subItems: [
      { time: '13:15 – 13:33', text: 'PID 1061 — Hùng Lương Bá (FPT University): From "Intellectual Crutch" to "Cognitive Scaffold"...' },
      { time: '13:33 – 13:51', text: 'PID 725 — Nguyen My Binh, My Dinh (HUST): Exploring the Influence of ChatGPT Use on Learner Autonomy...' },
      { time: '13:51 – 14:09', text: '🔥 [TRỌNG TÂM] PID 628 — Integrating Learning Methods into an English Vocabulary Learning Application (CapyVocab) (Báo cáo viên: Nguyễn Khánh Linh & Trần Đức Kiên | Đồng tác giả: Quang Anh, Thị Hồng, Thảo Nguyên, Phương Ly, Thanh Tú)', highlight: true },
      { time: '14:09 – 14:27', text: 'PID 886 — VAN HOA TO (UTT): Blended learning for enhancing learner autonomy and engagement...' },
      { time: '14:27 – 14:45', text: 'PID 638 — Chau Nguyen (IU - VNU HCM): Students’ Perceptions of Text-based and Text-plus-Image Glosses...' },
      { time: '14:45 – 15:03', text: 'PID 897 — Thi Loc Duong (Anglia Ruskin University, UK): Academic Anxiety, Cognitive Interference...' }
    ],
    memberNotes: {
      khanh_linh: '🎤 Diễn giả chính trình bày bài PID 628 (khung 13:51 – 14:09) cùng Đức Kiên tại Van Trinh 2.',
      duc_kien: '🎤 Diễn giả chính trình bày bài PID 628 (khung 13:51 – 14:09) cùng Khánh Linh tại Van Trinh 2.',
      quang_anh: '📸 Dự nghe tại Van Trinh 2, phụ trách chụp ảnh/quay video phần trình bày của nhóm (13:51 – 14:09) & hỗ trợ Q&A.',
      thao_nguyen: '📝 Dự nghe tại Van Trinh 2, ghi chép câu hỏi phản biện từ Chủ tọa Lee Ju Seong và hội đồng trong phần Q&A.',
      thi_hong: '🤝 Dự nghe tại Van Trinh 2, hỗ trợ điều phối slide/thời gian và tổng hợp góp ý chuyên môn.',
      phuong_ly: '🤝 Dự nghe tại Van Trinh 2, hỗ trợ nhóm trả lời câu hỏi thảo luận và chụp ảnh lưu niệm cùng phiên.'
    }
  },
  {
    id: 'sch-23-8',
    day: '23',
    date: '2026-10-23',
    fullDate: '23.10.2026',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '13:15 – 15:10',
    title: '⭐ [NHIỆM VỤ POSTER] Poster Session No. 1–2 (Triển lãm & Trực poster)',
    location: 'Khu vực Hall Triển lãm Poster - Emeralda Resort',
    category: 'highlight_poster',
    isHighlight: true,
    participants: ['dinh_khoi'],
    description: 'Chủ tọa (Chairs): Assoc. Prof. Phạm Thị Thanh Hải, Assoc. Prof. Bùi Thị Thúy Hằng & Dr. Sujatha Mukiri | Thư ký: Dr. Lê Phương Thủy.\n• ⭐ Bài báo cáo của nhóm: PID 661 — Báo cáo viên: Vũ Đình Khôi (Hanoi University of Science and Technology).\n• Phân định ca mới: Poster Session No. 1–2 (thay vì 1–3). Địa điểm: Khu vực Hall.',
    memberNotes: {
      dinh_khoi: '🖼️ Có mặt xuyên suốt từ 13:15 – 15:10 tại vị trí Poster PID 661 (khu vực Hall) để đón tiếp Ban giám khảo và đại biểu, thuyết trình tóm tắt và trả lời câu hỏi. (Sau 14:15 các thành viên nhóm Oral có thể ghé qua chụp ảnh hỗ trợ).'
    }
  },
  {
    id: 'sch-23-9',
    day: '23',
    date: '2026-10-23',
    fullDate: '23.10.2026',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '13:15 – 15:10',
    title: '[Tham khảo] Các Phiên Song Song Khác trong Ca 1 (Session 1, 3, 4, 5)',
    location: 'Các phòng Van Trinh 1, Hoa Lu 1, Hoa Lu 2, Hoa Lu 3 - Emeralda Resort',
    category: 'other_sessions',
    isOptionalRef: true,
    participants: [...ALL_MEMBER_IDS],
    description: 'Diễn ra đồng thời với Session 2 và Poster No. 1–2:',
    subItems: [
      { time: 'Session 1', text: 'AI and Digital Innovation in Education: Van Trinh 1 Ballroom (Chair: Prof. Hatsuko Yoshikubo | Secretary: Dr. Đỗ Minh Triều): PID 570, 719, 767, 705, 689, 688.' },
      { time: 'Session 3', text: 'Teacher Development, Professional Identity & Reflective Practice: Hoa Lu 1 Ballroom (Chair: Dr. Lizana Oberholzer | Secretary: Dr. Vũ Thị Thanh Nhàn): PID 1023, 576, 593, 666, 676, 909.' },
      { time: 'Session 4', text: '🔄 Digital Innovation in Foreign Language Education (Chuyển lên Ca 1): Hoa Lu 2 Ballroom (Chair: Dr. Gina O. Gonong | Secretary: Dr. Hoàng Thị Phương Thảo): PID 590, 656, 753, 773, 1074, 729.' },
      { time: 'Session 5', text: 'Chinese Language Education & Teaching Innovation: Hoa Lu 3 Ballroom (Chair: Dr. Phan Vũ Tuấn Anh | Secretary: Dr. Nguyễn Thị Quỳnh Yến): PID 979, 599, 635, 777, 776.' }
    ]
  },

  // ================= THỨ 6 (23/10/2026) - CHIỀU CA 2 & TỐI =================
  {
    id: 'sch-23-10',
    day: '23',
    date: '2026-10-23',
    fullDate: '23.10.2026',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '15:10 – 15:30',
    title: 'Tiệc trà chiều (Tea Break) & Chúc mừng hoàn thành báo cáo',
    location: 'Sảnh tiệc trà - Emeralda Resort',
    category: 'meal',
    participants: [...ALL_MEMBER_IDS],
    description: 'Cả 7 thành viên (nhóm Oral Session 2 và Đình Khôi từ khu vực Poster) hội ngộ tại khu vực tiệc trà, nghỉ ngơi và chụp ảnh chung cả nhóm.'
  },
  {
    id: 'sch-23-11',
    day: '23',
    date: '2026-10-23',
    fullDate: '23.10.2026',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '15:30 – 17:10',
    title: 'Ca 2: Tự do tham dự các Phiên báo cáo chuyên đề (Session 6–10 & Poster No. 3–4)',
    location: 'Các phòng phân ban (Van Trinh 1-2, Hoa Lu 1-3) & Hall - Emeralda Resort',
    category: 'academic',
    participants: [...ALL_MEMBER_IDS],
    description: 'Cả nhóm đã hoàn thành xuất sắc nhiệm vụ báo cáo ở Ca 1, tự do lựa chọn tham dự các phiên quan tâm (Tổng thời lượng 100 phút):',
    subItems: [
      { time: 'Session 6', text: '🔄 Educational Leadership, Higher Education & Future Workforce (Chuyển xuống Ca 2): Van Trinh 1 Ballroom (Chair: Prof. Steffen Kersten | Secretary: Dr. Phạm Thị Thu) — 7 bài: PID 785 (PGS. Lê Hiếu Học), 1038, 1071, 837, 584, 942, 977.' },
      { time: 'Session 7', text: 'Language, Culture & Intercultural Communication: Van Trinh 2 Ballroom (Chair: Dr. Nguyễn Thị Cát Ngọc | Secretary: Dr. Lê Thị Lan) — 6 bài: PID 1060, 679, 686, 749, 880, 964.' },
      { time: 'Session 8', text: 'Translation, AI & Language Professional Practices: Hoa Lu 1 Ballroom (Chair: Dr. Alandeom Oliveira | Secretary: Dr. Trần Thị Vân Oanh) — 6 bài: PID 808, 918, 966, 746, 717, 727.' },
      { time: 'Session 9', text: 'Inclusive Education & Educational Practices: Hoa Lu 2 Ballroom (Chair: Dr. John R. Baker | Secretary: Dr. Nguyễn Thị Thu Trang) — 6 bài: PID 845, 614, 620, 629, 674, 764.' },
      { time: 'Session 10', text: 'Korean Language Teaching Innovations: Hoa Lu 3 Ballroom (Chair: Dr. Trần Thị Thu Phương | Secretary: Dr. Lê Thị Hạnh) — 5 bài: PID 932, 703, 696, 636, 755.' },
      { time: 'Poster No. 3–4', text: 'Triển lãm 16 bài Poster tại khu vực Hall (Chairs: Assoc. Prof. Nguyễn Việt Khoa, Dr. Susan Drake, Dr. Joanna Reid | Secretary: Dr. Hoàng Thu Thủy).' }
    ]
  },
  {
    id: 'sch-23-12',
    day: '23',
    date: '2026-10-23',
    fullDate: '23.10.2026',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '17:10 – 17:30',
    title: 'Báo cáo tổng kết toàn bộ các phiên Oral & Poster',
    location: 'Van Long Ballroom - Emeralda Resort',
    category: 'plenary',
    participants: [...ALL_MEMBER_IDS],
    description: 'Ban tổ chức tổng kết kết quả học thuật của 10 phiên Oral và các phiên Poster tại Van Long Ballroom.'
  },
  {
    id: 'sch-23-shuttle-afternoon',
    day: '23',
    date: '2026-10-23',
    fullDate: '23.10.2026',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '17:30 – 17:50',
    title: '🚌 Xe trung chuyển (Shuttle Transfer): Emeralda Resort → Alo Garden',
    location: 'Emeralda Resort → Khách sạn Alo Garden Ninh Bình',
    category: 'travel',
    participants: [...ALL_MEMBER_IDS],
    description: 'Xe đưa đại biểu từ Emeralda Resort về lại khách sạn Alo Garden sau khi kết thúc các phiên báo cáo để nghỉ ngơi và thay trang phục dự tiệc Gala Dinner.'
  },
  {
    id: 'sch-23-shuttle-gala',
    day: '23',
    date: '2026-10-23',
    fullDate: '23.10.2026',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '18:30 – 19:00',
    title: '🚌 Xe trung chuyển (Shuttle Transfer): Alo Garden → Nhà hàng 1969',
    location: 'Khách sạn Alo Garden → Nhà hàng 1969 (Ninh Bình)',
    category: 'travel',
    participants: [...ALL_MEMBER_IDS],
    description: 'Xe trung chuyển đón đại biểu lúc 18:30 tại khách sạn Alo Garden để di chuyển đến Nhà hàng 1969 tham dự tiệc Gala Dinner.'
  },
  {
    id: 'sch-23-13',
    day: '23',
    date: '2026-10-23',
    fullDate: '23.10.2026',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '19:00 – 21:30',
    title: 'Tiệc Gala Dinner Chính Thức',
    location: 'Nhà hàng 1969 (Đường Văn Tiến Dũng / Kim Đa, Phường Hoa Lư, TP. Ninh Bình)',
    category: 'meal',
    participants: [...ALL_MEMBER_IDS],
    description: 'Tham dự tiệc Gala Dinner trang trọng của Hội thảo ICEF 2026 tại Nhà hàng 1969 (Đường Văn Tiến Dũng / Kim Đa, Phường Hoa Lư, TP. Ninh Bình). Giao lưu âm nhạc, văn hóa và vinh danh bài báo xuất sắc.'
  },

  // ================= THỨ 7 (24/10/2026) =================
  {
    id: 'sch-24-1',
    day: '24',
    date: '2026-10-24',
    fullDate: '24.10.2026',
    dayTitle: 'THỨ 7 (24/10/2026): Check-out Khách sạn & Khởi hành về Hà Nội',
    time: '06:30 – 08:30',
    title: 'Ăn sáng tại khách sạn Alo Garden',
    location: 'Khách sạn Alo Garden Ninh Bình',
    category: 'meal',
    participants: [...ALL_MEMBER_IDS],
    description: 'Dùng bữa sáng tại khách sạn (đã bao gồm trong giá phòng).'
  },
  {
    id: 'sch-24-2',
    day: '24',
    date: '2026-10-24',
    fullDate: '24.10.2026',
    dayTitle: 'THỨ 7 (24/10/2026): Check-out Khách sạn & Khởi hành về Hà Nội',
    time: '08:30 – 09:30',
    title: 'Thu dọn hành lý & Làm thủ tục Check-out khách sạn Alo Garden',
    location: 'Quầy lễ tân - Khách sạn Alo Garden',
    category: 'hotel',
    participants: [...ALL_MEMBER_IDS],
    description: 'Kiểm tra kỹ đồ đạc cá nhân, giấy chứng nhận hội thảo (Certificate) và trả chìa khóa phòng trước 09:30.',
    memberNotes: {
      quang_anh: 'Trưởng phòng Nam kiểm tra phòng Triple và bàn giao chìa khóa.',
      thao_nguyen: 'Trưởng phòng Nữ kiểm tra phòng Quadruple và bàn giao chìa khóa.'
    }
  },
  {
    id: 'sch-24-3',
    day: '24',
    date: '2026-10-24',
    fullDate: '24.10.2026',
    dayTitle: 'THỨ 7 (24/10/2026): Check-out Khách sạn & Khởi hành về Hà Nội',
    time: '09:30 – 11:30',
    title: 'Xe xuất phát khởi hành về lại Hà Nội (Tòa nhà C7 ĐHBK)',
    location: 'ALO RESORT Ninh Bình → Tòa nhà C7 ĐH Bách khoa Hà Nội',
    category: 'travel',
    participants: [...ALL_MEMBER_IDS],
    speaker: 'BSX: 29E 17655 • Lx Thùy (0986 181 412)',
    description: 'Đúng 09:30 xe đón đoàn (BSX: 29E 17655, Lái xe: Lx Thùy - 📞 0986 181 412) xuất phát từ ALO RESORT đưa đoàn về lại điểm tập trung ban đầu tại Tòa nhà C7, ĐH Bách khoa Hà Nội.\n\n⚠️ Lưu ý chính thức: Đại biểu tham gia tour tham quan Tràng An sẽ đi theo khung thời gian và lịch trình riêng (Delegates joining the Tràng An tour will follow a separate schedule).'
  }
];

export const INITIAL_HOTEL_INFO = {
  hotelName: 'ALO RESORT NINH BÌNH (Alo Garden)',
  address: 'Số 7 Đường Võ Nguyên Giáp, Xã Ninh Khang, Huyện Hoa Lư, Tỉnh Ninh Bình',
  phone: '+84 889 556 379',
  note: 'Đã thanh toán 2 đêm (22/10 & 23/10/2026), đã bao gồm ăn sáng và thuế. Hotline lễ tân: +84 889 556 379. Thanh toán qua VietinBank: Đỗ Tiến Liêu - 103001060752. Có các tuyến Shuttle Bus đón/trả sang Emeralda Resort và Nhà hàng 1969.',
  rooms: [
    {
      id: 'room-nam',
      name: 'Phòng Nam (Triple - 3 người)',
      members: ['Nguyễn Quang Anh (Trưởng phòng)', 'Trần Đức Kiên', 'Vũ Đình Khôi'],
      cost: '750.000đ × 2 đêm = 1.500.000 VNĐ',
      payer: 'Nguyễn Quang Anh đã thanh toán 27/09',
      isPaid: true
    },
    {
      id: 'room-nu',
      name: 'Phòng Nữ (Quadruple - 4 người)',
      members: ['Nguyễn Thảo Nguyên (Trưởng phòng)', 'Nguyễn Khánh Linh', 'Trịnh Thị Hồng', 'Bùi Thị Phương Ly'],
      cost: '900.000đ × 2 đêm = 1.800.000 VNĐ',
      payer: 'Nguyễn Thảo Nguyên đã thanh toán 27/09',
      isPaid: true
    }
  ],
  papers: [
    {
      pid: 'PID 628',
      type: 'Oral Presentation',
      session: 'Session 2: Learner Development, Agency, and Educational Experience (13:15 – 15:10 Thứ 6, 23/10/2026)',
      room: 'Van Trinh 2 Ballroom - Emeralda Resort',
      time: '13:51 – 14:09 (Chính thức)',
      title: 'Integrating Learning Methods into an English Vocabulary Learning Application (CapyVocab)',
      chair: 'Assoc. Prof. Lee Ju Seong (The Education University of Hong Kong)',
      secretary: 'Ms. Nguyễn Trần Khánh Phương',
      speakers: ['Nguyễn Khánh Linh', 'Trần Đức Kiên'],
      coAuthors: ['Nguyễn Quang Anh', 'Trịnh Thị Hồng', 'Nguyễn Thảo Nguyên', 'Bùi Thị Phương Ly', 'Thanh Tú']
    },
    {
      pid: 'PID 661',
      type: 'Poster Presentation',
      session: 'Poster Session No. 1–2 (13:15 – 15:10 Thứ 6, 23/10/2026)',
      room: 'Khu vực Hall Triển lãm Poster - Emeralda Resort',
      time: '13:15 – 15:10 Thứ 6, 23/10/2026',
      title: 'Nghiên cứu & Báo cáo Poster ICEF 2026',
      chair: 'Assoc. Prof. Phạm Thị Thanh Hải, Assoc. Prof. Bùi Thị Thúy Hằng, Dr. Sujatha Mukiri',
      secretary: 'Dr. Lê Phương Thủy',
      presenter: 'Vũ Đình Khôi (HUST)'
    }
  ]
};
