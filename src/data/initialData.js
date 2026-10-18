/**
 * initialData.js - Dữ liệu mặc định cho Hội thảo ICEF 2026
 * Nhóm Nghiên cứu HUST & HUCE - Emeralda Resort & Alo Garden Ninh Bình
 */

export const INITIAL_MEMBERS = [
  {
    id: 'quang_anh',
    name: 'Nguyễn Quang Anh',
    shortName: 'Quang Anh',
    gender: 'male',
    room: 'Phòng Nam (Triple - Khách sạn Alo Garden)',
    roomRole: 'Trưởng phòng Nam (Đã TT 1.500.000đ)',
    academicRole: 'Đồng tác giả PID 628 — Dự nghe, hỗ trợ kỹ thuật/ghi hình & Q&A tại Session 2',
    badge: 'Trưởng phòng Nam',
    icon: 'Key'
  },
  {
    id: 'duc_kien',
    name: 'Trần Đức Kiên',
    shortName: 'Đức Kiên',
    gender: 'male',
    room: 'Phòng Nam (Triple - Khách sạn Alo Garden)',
    roomRole: 'Thành viên phòng Nam (Đã bao gồm ăn sáng)',
    academicRole: '🎤 Diễn giả Báo cáo chính Oral PID 628 (Session 2, khung 13:51 – 14:09)',
    badge: 'Diễn giả Oral PID 628',
    icon: 'Mic'
  },
  {
    id: 'dinh_khoi',
    name: 'Vũ Đình Khôi',
    shortName: 'Đình Khôi',
    gender: 'male',
    room: 'Phòng Nam (Triple - Khách sạn Alo Garden)',
    roomRole: 'Thành viên phòng Nam (Đã bao gồm ăn sáng)',
    academicRole: '🖼️ Báo cáo viên chính Poster PID 661 (Trực tại Poster Session 1–3 từ 13:15 – 15:10)',
    badge: 'Báo cáo Poster PID 661',
    icon: 'Presentation'
  },
  {
    id: 'thao_nguyen',
    name: 'Nguyễn Thảo Nguyên',
    shortName: 'Thảo Nguyên',
    gender: 'female',
    room: 'Phòng Nữ (Quadruple - Khách sạn Alo Garden)',
    roomRole: 'Trưởng phòng Nữ (Đã TT 1.800.000đ)',
    academicRole: 'Đồng tác giả PID 628 — Dự nghe, hỗ trợ & ghi chép Q&A tại Session 2',
    badge: 'Trưởng phòng Nữ',
    icon: 'Key'
  },
  {
    id: 'khanh_linh',
    name: 'Nguyễn Khánh Linh',
    shortName: 'Khánh Linh',
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
    gender: 'female',
    room: 'Phòng Nữ (Quadruple - Khách sạn Alo Garden)',
    roomRole: 'Thành viên phòng Nữ (Đã bao gồm ăn sáng)',
    academicRole: 'Đồng tác giả PID 628 — Dự nghe, hỗ trợ & ghi chép Q&A tại Session 2',
    badge: 'Đồng tác giả PID 628',
    icon: 'GraduationCap'
  },
  {
    id: 'phuong_ly',
    name: 'Bùi Thị Phương Ly',
    shortName: 'Phương Ly',
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
    id: 'sch-hust-175507',
    day: '22',
    dayTitle: 'THỨ 5 (22/10/2026): Lịch học Đại học Bách khoa Hà Nội',
    time: '06:45 – 09:10',
    periodText: 'Tiết 1 - 3 (06:45 - 09:10)',
    title: '175507 - Lịch sử Đảng cộng sản Việt Nam - SSH1141',
    location: 'D5-301',
    category: 'academic',
    participants: [...ALL_MEMBER_IDS],
    speaker: 'Lê Thị Lan',
    description: '175507 - Lịch sử Đảng cộng sản Việt Nam - SSH1141\nGiảng viên: Lê Thị Lan\nĐịa điểm: D5-301 (Đại học Bách khoa Hà Nội)',
    memberNotes: {
      quang_anh: 'Tham gia học tập đầy đủ trước khi xuất phát đi Hội thảo ICEF 2026.'
    }
  },
  {
    id: 'sch-hust-174386',
    day: '22',
    dayTitle: 'THỨ 5 (22/10/2026): Lịch học Đại học Bách khoa Hà Nội',
    time: '09:20 – 11:45',
    periodText: 'Tiết 4 - 6 (09:20 - 11:45)',
    title: '174386 - Hệ thống và Công nghệ Mạng - IT3080',
    location: 'D7-404',
    category: 'academic',
    participants: [...ALL_MEMBER_IDS],
    speaker: 'Ngô Thị Hiển',
    description: '174386 - Hệ thống và Công nghệ Mạng - IT3080\nGiảng viên: Ngô Thị Hiển\nĐịa điểm: D7-404 (Đại học Bách khoa Hà Nội)',
    memberNotes: {
      quang_anh: 'Xin phép vắng mặt / học online để tham gia đoàn Hội thảo ICEF 2026 tại Ninh Bình.'
    }
  },
  {
    id: 'sch-22-1',
    day: '22',
    dayTitle: 'THỨ 5 (22/10/2026): Di chuyển, Check-in & Pre-conference Workshops',
    time: '09:30 – 10:00',
    title: 'Tập trung tại Đại học Bách khoa Hà Nội',
    location: 'Thư viện Tạ Quang Bửu (Đi vào cổng đường Trần Đại Nghĩa)',
    category: 'travel',
    participants: [...ALL_MEMBER_IDS],
    description: 'Cả nhóm 7 thành viên có mặt đúng giờ để điểm danh và chuẩn bị lên xe tập trung.',
    memberNotes: {
      quang_anh: 'Kiểm tra quân số phòng Nam (3 người).',
      thao_nguyen: 'Kiểm tra quân số phòng Nữ (4 người).',
      dinh_khoi: 'Kiểm tra ống đựng Poster PID 661 mang theo xe.'
    }
  },
  {
    id: 'sch-22-2',
    day: '22',
    dayTitle: 'THỨ 5 (22/10/2026): Di chuyển, Check-in & Pre-conference Workshops',
    time: '10:00 – 12:00',
    title: 'Xe di chuyển tập trung khởi hành đi Ninh Bình',
    location: 'Hà Nội → Ninh Bình',
    category: 'travel',
    participants: [...ALL_MEMBER_IDS],
    description: 'Di chuyển theo xe đoàn tới Ninh Bình.'
  },
  {
    id: 'sch-22-3',
    day: '22',
    dayTitle: 'THỨ 5 (22/10/2026): Di chuyển, Check-in & Pre-conference Workshops',
    time: '12:00 – 13:30',
    title: 'Đến Ninh Bình, ăn trưa và nghỉ ngơi',
    location: 'Ninh Bình',
    category: 'meal',
    participants: [...ALL_MEMBER_IDS],
    description: 'Cả đoàn dùng bữa trưa và nghỉ ngơi trước giờ nhận phòng.'
  },
  {
    id: 'sch-22-4',
    day: '22',
    dayTitle: 'THỨ 5 (22/10/2026): Di chuyển, Check-in & Pre-conference Workshops',
    time: '14:00 – 15:00',
    title: 'Làm thủ tục Check-in Khách sạn Alo Garden & Sang Emeralda Resort',
    location: 'Khách sạn Alo Garden → Emeralda Resort Ninh Bình',
    category: 'hotel',
    participants: [...ALL_MEMBER_IDS],
    description: 'Nhận 01 phòng Triple Nam (750k/đêm) và 01 phòng Quadruple Nữ (900k/đêm). Cất hành lý và di chuyển sang địa điểm hội thảo tại Emeralda Resort.',
    memberNotes: {
      quang_anh: 'Đại diện Trưởng phòng Nam làm thủ tục nhận phòng Triple (xuất trình bill 1.500.000đ nếu cần).',
      thao_nguyen: 'Đại diện Trưởng phòng Nữ làm thủ tục nhận phòng Quadruple (xuất trình bill 1.800.000đ nếu cần).'
    }
  },
  {
    id: 'sch-22-5',
    day: '22',
    dayTitle: 'THỨ 5 (22/10/2026): Di chuyển, Check-in & Pre-conference Workshops',
    time: '15:00 – 16:30',
    title: 'Pre-conference Workshop 1: “GenAI-Mediated Academic Writing: Using AI Without Outsourcing Your Scholarship”',
    location: 'Emeralda Resort Ninh Bình',
    category: 'academic',
    participants: [...ALL_MEMBER_IDS],
    description: 'Diễn giả: Assoc. Prof. Lee Ju Seong (The Education University of Hong Kong — đồng thời là Chủ tọa Session 2 ngày mai của nhóm). (Song song có phiên online của University of Glasgow).'
  },
  {
    id: 'sch-22-6',
    day: '22',
    dayTitle: 'THỨ 5 (22/10/2026): Di chuyển, Check-in & Pre-conference Workshops',
    time: '16:30 – 18:00',
    title: 'Pre-conference Workshop 3: “Publishing in Top Journals in the AI Era”',
    location: 'Emeralda Resort Ninh Bình',
    category: 'academic',
    participants: [...ALL_MEMBER_IDS],
    description: 'Diễn giả: Dr. Lizana Oberholzer (Chair of International Professional Development Association - IPDA, Anh).'
  },
  {
    id: 'sch-22-7',
    day: '22',
    dayTitle: 'THỨ 5 (22/10/2026): Di chuyển, Check-in & Pre-conference Workshops',
    time: '18:30 – 21:00',
    title: 'Tiệc Chào Mừng (Welcome Dinner)',
    location: 'Emeralda Resort Ninh Bình',
    category: 'meal',
    participants: [...ALL_MEMBER_IDS],
    description: 'Tham dự tiệc tối giao lưu cùng Ban tổ chức và các đại biểu quốc tế, sau đó về khách sạn Alo Garden nghỉ ngơi.'
  },

  // ================= THỨ 6 (23/10/2026) - SÁNG =================
  {
    id: 'sch-23-1',
    day: '23',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '08:00 – 08:30',
    title: 'Đăng ký đại biểu (Registration)',
    location: 'Sảnh chính - Emeralda Resort Ninh Bình',
    category: 'general',
    participants: [...ALL_MEMBER_IDS],
    description: 'Nhận thẻ đại biểu, tài liệu hội thảo. Kiểm tra phòng báo cáo Session 2 và vị trí treo Poster PID 661.',
    memberNotes: {
      khanh_linh: 'Kiểm tra danh sách trình chiếu bài PID 628 tại bàn BTC.',
      duc_kien: 'Kiểm tra kết nối file slide PID 628.',
      dinh_khoi: 'Xác nhận vị trí bảng dán Poster PID 661 tại khu vực Poster Session 1–3.'
    }
  },
  {
    id: 'sch-23-2',
    day: '23',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '08:35 – 08:50',
    title: 'Khai mạc Phiên Toàn thể (Plenary Session)',
    location: 'Hội trường chính - Emeralda Resort',
    category: 'plenary',
    participants: [...ALL_MEMBER_IDS],
    description: '08:35 – 08:45: Giới thiệu chương trình và đại biểu tham dự.\n08:45 – 08:50: Phát biểu khai mạc của Trưởng Ban tổ chức.'
  },
  {
    id: 'sch-23-3',
    day: '23',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '08:50 – 10:00',
    title: 'Keynote Speech Section 1 & Thảo luận bàn tròn 1',
    location: 'Hội trường chính - Emeralda Resort',
    category: 'plenary',
    participants: [...ALL_MEMBER_IDS],
    description: '• 08:50 – 09:10: Keynote 1 — Prof. Steffen Kersten (Dresden University of Technology, Đức)\n• 09:10 – 09:30: Keynote 2 — Dr. Lizana Oberholzer (Chair of IPDA, Anh)\n• 09:30 – 09:50: Keynote 3 — Assoc. Prof. Lee Ju Seong (Education University of Hong Kong)\n• 09:50 – 10:00: Thảo luận bàn tròn (Panel Discussion 1).'
  },
  {
    id: 'sch-23-4',
    day: '23',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '10:00 – 10:20',
    title: 'Chụp ảnh lưu niệm & Tiệc trà sáng (Photo Session & Tea Break)',
    location: 'Khu vực Hội trường - Emeralda Resort',
    category: 'meal',
    participants: [...ALL_MEMBER_IDS],
    description: 'Cả nhóm chụp ảnh lưu niệm cùng toàn thể đại biểu hội thảo và dùng tiệc trà.'
  },
  {
    id: 'sch-23-5',
    day: '23',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '10:20 – 11:45',
    title: 'Keynote Speech Section 2, Thảo luận 2 & Bế mạc Phiên Toàn thể',
    location: 'Hội trường chính - Emeralda Resort',
    category: 'plenary',
    participants: [...ALL_MEMBER_IDS],
    description: 'Điều phối (Moderator): Prof. Alandeom Oliveira (University at Albany, SUNY, Mỹ).\n• 10:20 – 10:40: Keynote 4 — Prof. Susan Drake (Brock University, Canada)\n• 10:40 – 11:00: Keynote 5 — Prof. Gina O. Gonong (Philippine Normal University)\n• 11:00 – 11:20: Keynote 6 — Prof. Sujatha Mukiri (EFLU, Ấn Độ)\n• 11:20 – 11:30: Thảo luận bàn tròn (Panel Discussion 2)\n• 11:30 – 11:45: Bế mạc Phiên Toàn thể & Hướng dẫn di chuyển về các phòng phiên song song.'
  },
  {
    id: 'sch-23-6',
    day: '23',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '11:45 – 13:15',
    title: 'Ăn trưa (Lunch) & Chuẩn bị thiết bị báo cáo Ca 1',
    location: 'Nhà hàng Emeralda Resort & Phòng báo cáo',
    category: 'meal',
    participants: [...ALL_MEMBER_IDS],
    description: 'Dùng bữa trưa. Từ 12:45: Nhóm Oral di chuyển tới phòng Session 2 copy slide & test âm thanh; Vũ Đình Khôi hoàn tất trưng bày Poster PID 661.',
    memberNotes: {
      khanh_linh: 'Có mặt tại phòng Session 2 trước 13:00 gặp Thư ký Nguyễn Trần Khánh Phương để nạp slide.',
      duc_kien: 'Kiểm tra slide bài PID 628 và mic trình bày tại phòng Session 2.',
      dinh_khoi: 'Hoàn tất treo Poster PID 661 trước 13:05.'
    }
  },

  // ================= THỨ 6 (23/10/2026) - CHIỀU CA 1 (TRỌNG TÂM) =================
  {
    id: 'sch-23-7',
    day: '23',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '13:15 – 15:10',
    title: '⭐ [NHIỆM VỤ ORAL] Session 2: Learner Development, Agency, and Educational Experience',
    location: 'Phòng Session 2 - Emeralda Resort',
    category: 'highlight_oral',
    isHighlight: true,
    participants: [...ORAL_TEAM_IDS],
    description: 'Chủ tọa (Chair): Assoc. Prof. Lee Ju Seong | Thư ký: Ms. Nguyễn Trần Khánh Phương.\nThứ tự 6 bài báo trong phiên (mỗi bài ~18 phút):',
    subItems: [
      { time: '13:15 – 13:33', text: 'PID 1061 — Hùng Lương Bá (FPT University): From "Intellectual Crutch" to "Cognitive Scaffold"...' },
      { time: '13:33 – 13:51', text: 'PID 725 — Nguyen My Binh, My Dinh (HUST): Exploring the Influence of ChatGPT Use on Learner Autonomy...' },
      { time: '13:51 – 14:09', text: '🔥 [TRỌNG TÂM] PID 628 — Integrating Learning Methods into an English Vocabulary Learning Application (Báo cáo viên: Nguyễn Khánh Linh & Trần Đức Kiên | Đồng tác giả: Quang Anh, Thị Hồng, Thảo Nguyên, Phương Ly, Thanh Tú)', highlight: true },
      { time: '14:09 – 14:27', text: 'PID 886 — VAN HOA TO (UTT): Blended learning for enhancing learner autonomy and engagement...' },
      { time: '14:27 – 14:45', text: 'PID 638 — Chau Nguyen (IU - VNU HCM): Students’ Perceptions of Text-based and Text-plus-Image Glosses...' },
      { time: '14:45 – 15:03', text: 'PID 897 — Thi Loc Duong (Anglia Ruskin University, UK): Academic Anxiety, Cognitive Interference...' }
    ],
    memberNotes: {
      khanh_linh: '🎤 Diễn giả chính trình bày bài PID 628 (khung 13:51 – 14:09) cùng Đức Kiên.',
      duc_kien: '🎤 Diễn giả chính trình bày bài PID 628 (khung 13:51 – 14:09) cùng Khánh Linh.',
      quang_anh: '📸 Dự nghe, phụ trách chụp ảnh/quay video phần trình bày của nhóm (13:51 – 14:09) & hỗ trợ Q&A.',
      thao_nguyen: '📝 Dự nghe, ghi chép câu hỏi phản biện từ Chủ tọa Lee Ju Seong và hội đồng trong phần Q&A.',
      thi_hong: '🤝 Dự nghe, hỗ trợ điều phối slide/thời gian và tổng hợp góp ý chuyên môn.',
      phuong_ly: '🤝 Dự nghe, hỗ trợ nhóm trả lời câu hỏi thảo luận và chụp ảnh lưu niệm cùng phiên.'
    }
  },
  {
    id: 'sch-23-8',
    day: '23',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '13:15 – 15:10',
    title: '⭐ [NHIỆM VỤ POSTER] Poster Sessions 1–3 (Triển lãm & Giải đáp trực tiếp)',
    location: 'Khu vực Triển lãm Poster 1–3 - Emeralda Resort',
    category: 'highlight_poster',
    isHighlight: true,
    participants: ['dinh_khoi'],
    description: 'Chủ tọa (Chairs): Assoc. Prof. Phạm Thị Thanh Hải, Assoc. Prof. Bùi Thị Thúy Hằng & Dr. Sujatha Mukiri | Thư ký: Dr. Lê Phương Thủy.\n• ⭐ Bài báo cáo của nhóm: PID 661 — Vũ Đình Khôi (Hanoi University of Science and Technology).\n• Các bài cùng phiên (17 posters): PID 623, 692, 707, 639, 661, 646, 662, 710, 711, 713, 714, 733, 740, 750, 786, 800, 887.',
    memberNotes: {
      dinh_khoi: '🖼️ Có mặt xuyên suốt từ 13:15 – 15:10 tại vị trí Poster PID 661 để đón tiếp Ban giám khảo và đại biểu, thuyết trình tóm tắt và trả lời câu hỏi. (Sau 14:15 các thành viên nhóm Oral có thể ghé qua chụp ảnh hỗ trợ).'
    }
  },
  {
    id: 'sch-23-9',
    day: '23',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '13:15 – 15:10',
    title: '[Tham khảo] Các Phiên Oral Song Song Khác trong Ca 1 (Session 1, 3, 4, 5)',
    location: 'Các phòng họp phân ban - Emeralda Resort',
    category: 'other_sessions',
    isOptionalRef: true,
    participants: [...ALL_MEMBER_IDS],
    description: 'Diễn ra đồng thời với Session 2 và Poster 1–3:',
    subItems: [
      { time: 'Session 1', text: 'AI and Digital Innovation in Education (Chair: Prof. Hatsuko Yoshikubo): PID 570 (13:15–13:33), PID 719 (13:33–13:51), PID 767 (13:51–14:09), PID 705 (14:09–14:27), PID 689 (14:27–14:45), PID 688 (14:45–15:03).' },
      { time: 'Session 3', text: 'Teacher Development, Professional Identity & Reflective Practice (Chair: Dr. Lizana Oberholzer): PID 1023, PID 576, PID 593, PID 666, PID 676, PID 909.' },
      { time: 'Session 4', text: 'Digital Innovation in Foreign Language Education (Chair: Dr. Gina O. Gonong): PID 590, PID 656, PID 753, PID 773, PID 1074, PID 729.' },
      { time: 'Session 5', text: 'Chinese Language Education & Teaching Innovation (Chair: Dr. Phan Vũ Tuấn Anh): PID 979, PID 599, PID 635, PID 777, PID 776.' }
    ]
  },

  // ================= THỨ 6 (23/10/2026) - CHIỀU CA 2 & TỐI =================
  {
    id: 'sch-23-10',
    day: '23',
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
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '15:30 – 17:10',
    title: 'Ca 2: Tự do tham dự các Phiên báo cáo chuyên đề (Session 6–10 & Poster 4–5)',
    location: 'Các phòng họp phân ban - Emeralda Resort',
    category: 'academic',
    participants: [...ALL_MEMBER_IDS],
    description: 'Cả nhóm đã hoàn thành nhiệm vụ báo cáo ở Ca 1, tự do lựa chọn tham dự các phiên quan tâm (Tổng thời lượng 100 phút):',
    subItems: [
      { time: 'Session 6', text: 'Educational Leadership & Future Workforce (Chair: Prof. Steffen Kersten) — 7 bài: PID 785 (PGS. Lê Hiếu Học), 1038, 1071, 837, 584, 942, 977.' },
      { time: 'Session 7', text: 'Language, Culture & Intercultural Communication (Chair: Dr. Nguyễn Thị Cát Ngọc) — 6 bài: PID 1060, 679, 686, 749, 880, 964.' },
      { time: 'Session 8', text: 'Translation, AI & Language Professional Practices (Chair: Dr. Alandeom Oliveira) — 6 bài: PID 808, 918, 966, 746, 717, 727.' },
      { time: 'Session 9', text: 'Inclusive Education & Educational Practices (Chair: Dr. John R. Baker) — 6 bài: PID 845, 614, 620, 629, 674, 764.' },
      { time: 'Session 10', text: 'Korean Language Teaching Innovations (Chair: Dr. Trần Thị Thu Phương) — 5 bài: PID 932, 703, 696, 636, 755.' },
      { time: 'Poster 4–5', text: 'Triển lãm 16 bài Poster (Chairs: PGS. Nguyễn Việt Khoa, Dr. Susan Drake, Dr. Joanna Reid): PID 805, 811, 819, 868, 877, 885, 909, 919, 926, 992, 994, 1019, 1045, 1046, 1066, 1044.' }
    ]
  },
  {
    id: 'sch-23-12',
    day: '23',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '17:10 – 17:30',
    title: 'Báo cáo tổng kết kết quả toàn bộ các phiên Oral & Poster',
    location: 'Hội trường chính - Emeralda Resort',
    category: 'plenary',
    participants: [...ALL_MEMBER_IDS],
    description: 'Ban tổ chức tổng kết kết quả học thuật của 10 phiên Oral và các phiên Poster.'
  },
  {
    id: 'sch-23-13',
    day: '23',
    dayTitle: 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
    time: '18:45 – 21:30',
    title: 'Tiệc Gala Dinner & Tham quan Phố cổ Hoa Lư',
    location: 'Emeralda Resort & Phố cổ Hoa Lư (Ninh Bình)',
    category: 'meal',
    participants: [...ALL_MEMBER_IDS],
    description: 'Tham dự tiệc Gala Dinner cùng hội thảo và chương trình tham quan trải nghiệm văn hóa tại Phố cổ Hoa Lư.'
  },

  // ================= THỨ 7 (24/10/2026) =================
  {
    id: 'sch-24-1',
    day: '24',
    dayTitle: 'THỨ 7 (24/10/2026): Check-out Khách sạn & Khởi hành về Hà Nội',
    time: '06:00 – 08:30',
    title: 'Ăn sáng tại khách sạn Alo Garden',
    location: 'Khách sạn Alo Garden',
    category: 'meal',
    participants: [...ALL_MEMBER_IDS],
    description: 'Dùng bữa sáng tại khách sạn (đã bao gồm trong giá phòng).'
  },
  {
    id: 'sch-24-2',
    day: '24',
    dayTitle: 'THỨ 7 (24/10/2026): Check-out Khách sạn & Khởi hành về Hà Nội',
    time: '08:30 – 09:30',
    title: 'Thu dọn hành lý & Làm thủ tục Check-out khách sạn Alo Garden',
    location: 'Quầy lễ tân - Khách sạn Alo Garden',
    category: 'hotel',
    participants: [...ALL_MEMBER_IDS],
    description: 'Kiểm tra kỹ đồ đạc cá nhân, giấy chứng nhận hội thảo (Certificate) và trả chìa khóa phòng.',
    memberNotes: {
      quang_anh: 'Trưởng phòng Nam kiểm tra phòng Triple và bàn giao chìa khóa.',
      thao_nguyen: 'Trưởng phòng Nữ kiểm tra phòng Quadruple và bàn giao chìa khóa.'
    }
  },
  {
    id: 'sch-24-3',
    day: '24',
    dayTitle: 'THỨ 7 (24/10/2026): Check-out Khách sạn & Khởi hành về Hà Nội',
    time: '10:00',
    title: 'Xe di chuyển tập trung khởi hành về lại Hà Nội',
    location: 'Ninh Bình → Thư viện Tạ Quang Bửu (ĐH Bách khoa Hà Nội)',
    category: 'travel',
    participants: [...ALL_MEMBER_IDS],
    description: 'Khởi hành về lại điểm tập trung ban đầu tại ĐH Bách khoa Hà Nội. (Lưu ý: Nếu nhóm có nhu cầu tham quan Quần thể danh thắng Tràng An từ 09:00 – 12:00 theo lịch chung, cả nhóm có thể chủ động đăng ký hoặc thu xếp phương tiện cho chiều về).'
  }
];

export const INITIAL_HOTEL_INFO = {
  hotelName: 'Khách sạn Alo Garden',
  note: 'Đã thanh toán 2 đêm (22/10 & 23/10/2026), đã bao gồm ăn sáng và thuế. Thanh toán qua VietinBank: Đỗ Tiến Liêu - 103001060752.',
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
      session: 'Session 2 (13:15 – 15:10 Thứ 6, 23/10/2026)',
      time: '13:51 – 14:09 (Dự kiến)',
      title: 'Integrating Learning Methods into an English Vocabulary Learning Application (CapyVocab)',
      chair: 'Assoc. Prof. Lee Ju Seong (The Education University of Hong Kong)',
      secretary: 'Ms. Nguyễn Trần Khánh Phương',
      speakers: ['Nguyễn Khánh Linh', 'Trần Đức Kiên'],
      coAuthors: ['Nguyễn Quang Anh', 'Trịnh Thị Hồng', 'Nguyễn Thảo Nguyên', 'Bùi Thị Phương Ly', 'Thanh Tú']
    },
    {
      pid: 'PID 661',
      type: 'Poster Presentation',
      session: 'Poster Session 1–3 (Triển lãm 17 bài poster)',
      time: '13:15 – 15:10 Thứ 6, 23/10/2026',
      title: 'Nghiên cứu & Báo cáo Poster ICEF 2026',
      chair: 'Assoc. Prof. Phạm Thị Thanh Hải, Assoc. Prof. Bùi Thị Thúy Hằng, Dr. Sujatha Mukiri',
      secretary: 'Dr. Lê Phương Thủy',
      presenter: 'Vũ Đình Khôi (HUST)'
    }
  ]
};
