import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Play, 
  Clock, 
  BookOpen, 
  Award, 
  Check, 
  Globe, 
  Calendar, 
  User, 
  ShoppingCart, 
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";

// Mock data mẫu để dựng giao diện chi tiết khóa học recorded
const MOCK_COURSE_DETAILS = {
  _id: "69cc8a351f83dc8f70f72b04",
  title: "Lập trình ReactJS từ Cơ Bản đến Nâng Cao",
  description: "Khóa học giúp bạn làm chủ ReactJS từ con số 0. Học qua thực hành dự án thực tế E-commerce, quản lý state nâng cao với Redux Toolkit, tối ưu hiệu năng và deploy ứng dụng.",
  price: 1200000,
  thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
  level: "Beginner",
  instructor: {
    name: "John Doe",
    avatar: "https://i.pravatar.cc/120?img=12",
    title: "Senior Frontend Engineer & Educator",
    bio: "Hơn 8 năm kinh nghiệm thực chiến phát triển ứng dụng Web tại các tập đoàn công nghệ lớn. Đam mê chia sẻ kiến thức lập trình thực tế và dễ tiếp cận cho người mới bắt đầu.",
    studentsCount: 15430,
    coursesCount: 5,
    rating: 4.8
  },
  updatedAt: "2026-07-25T10:00:00.000Z",
  benefits: [
    "Làm chủ toàn bộ React Hooks cốt lõi (useState, useEffect, useContext, useMemo...)",
    "Xây dựng trọn vẹn dự án E-commerce thực tế với giỏ hàng và thanh toán trực tuyến",
    "Hiểu sâu về Virtual DOM, cơ chế Re-rendering và cách tối ưu hiệu năng React",
    "Tích hợp và quản lý state toàn cục bằng Redux Toolkit chuyên nghiệp",
    "Deploy ứng dụng React lên Vercel, Netlify và cấu hình domain riêng"
  ],
  lessons: [
    { _id: "L1", title: "Giới thiệu tổng quan về khóa học và lộ trình học tập", duration: 12, order: 1, isPreview: true, videoUrl: "https://res.cloudinary.com/dhyod3ylx/video/upload/v1783228118/wmkr8ooccnkhtof3rq1c.mp4" },
    { _id: "L2", title: "Cơ bản về JSX và cách React render UI", duration: 25, order: 2, isPreview: true, videoUrl: "https://res.cloudinary.com/dhyod3ylx/video/upload/v1783228501/qqszhof7chwjueqlvi1a.mp4" },
    { _id: "L3", title: "Props và State - Quản lý luồng dữ liệu trong Component", duration: 32, order: 3, isPreview: false },
    { _id: "L4", title: "Vòng đời của Component và làm việc với useEffect Hook", duration: 40, order: 4, isPreview: false },
    { _id: "L5", title: "Xây dựng Component Custom Hook tái sử dụng logic", duration: 28, order: 5, isPreview: false },
    { _id: "L6", title: "Thực hành: Thiết kế giao diện Dashboard admin", duration: 55, order: 6, isPreview: false },
  ]
};

const CourseDetailsRecorded = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  // Dữ liệu thật sẽ fetch từ backend theo courseId, tạm thời lấy mock data
  const [course] = useState(MOCK_COURSE_DETAILS);
  const [activeLessonId, setActiveLessonId] = useState(null); // Quản lý bài đang click học thử
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewVideoUrl, setPreviewVideoUrl] = useState("");
  const [expandedSyllabus, setExpandedSyllabus] = useState(true);

  // Tính tổng thời lượng khóa học
  const totalDuration = course.lessons.reduce((acc, curr) => acc + curr.duration, 0);

  // Mở video học thử
  const handleOpenPreview = (videoUrl) => {
    if (!videoUrl) return;
    setPreviewVideoUrl(videoUrl);
    setShowPreviewModal(true);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 bg-transparent text-slate-800">
      
      {/* ── Grid Layout chính ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* CỘT TRÁI: THÔNG TIN CHI TIẾT KHÓA HỌC (Chiếm 2 phần) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* ── Section 1: Header / Hero Info ── */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-600 border border-orange-500/20">
              <BookOpen size={12} /> Khóa học Recorded
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-slate-800">
              {course.title}
            </h1>
            <p className="text-base md:text-lg text-slate-500 leading-relaxed">
              {course.description}
            </p>
            
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400 pt-2">
              <div className="flex items-center gap-1"><User size={14} /> Giảng viên: <span className="text-slate-600">{course.instructor.name}</span></div>
              <div className="flex items-center gap-1"><Globe size={14} /> Cấp độ: <span className="text-slate-600">{course.level}</span></div>
              <div className="flex items-center gap-1"><Calendar size={14} /> Cập nhật: <span className="text-slate-600">{new Date(course.updatedAt).toLocaleDateString("vi-VN")}</span></div>
            </div>
          </div>

          {/* ── Section 2: Bạn sẽ học được gì (Benefits) ── */}
          <div 
            className="p-6 md:p-8 rounded-3xl space-y-4"
            style={{
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.8)",
              backdropFilter: "blur(20px)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 32px rgba(194,110,30,0.04)"
            }}
          >
            <h3 className="text-xl font-bold text-slate-800">Bạn sẽ học được gì?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm font-medium text-slate-600">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} className="stroke-[3]" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Section 3: Đề cương khóa học (Syllabus) ── */}
          <div 
            className="rounded-3xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.55)",
              border: "1px solid rgba(255,255,255,0.75)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 8px 32px rgba(194,110,30,0.04)"
            }}
          >
            {/* Header Accordion */}
            <div 
              onClick={() => setExpandedSyllabus(!expandedSyllabus)}
              className="p-5 flex items-center justify-between cursor-pointer hover:bg-orange-500/[0.01] transition-colors"
              style={{ background: "rgba(249,115,22,0.03)", borderBottom: "1px solid rgba(255,255,255,0.6)" }}
            >
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">Nội dung khóa học</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-4">
                  <span>{course.lessons.length} bài học</span>
                  <span>•</span>
                  <span>Tổng thời lượng: {Math.round(totalDuration / 60)} giờ {totalDuration % 60} phút</span>
                </p>
              </div>
              <button className="p-2 rounded-xl bg-white/80 shadow-sm border border-slate-100 text-slate-500">
                {expandedSyllabus ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
            </div>

            {/* List Lessons */}
            {expandedSyllabus && (
              <div className="divide-y divide-slate-100/60">
                {course.lessons.map((lesson) => (
                  <div key={lesson._id} className="p-4 flex items-center justify-between gap-4 hover:bg-orange-500/[0.02] transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-500 flex items-center justify-center flex-shrink-0 font-black text-sm">
                        {lesson.order}
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{lesson.title}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                        <Clock size={12} /> {lesson.duration} phút
                      </span>
                      {lesson.isPreview && lesson.videoUrl && (
                        <button 
                          onClick={() => handleOpenPreview(lesson.videoUrl)}
                          className="px-2.5 py-1 text-xs font-bold rounded-lg text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center gap-1 border border-emerald-200"
                        >
                          <Play size={10} className="fill-current" /> Học thử
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Section 4: Giảng viên (Instructor) ── */}
          <div 
            className="p-6 md:p-8 rounded-3xl space-y-6"
            style={{
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.8)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 8px 32px rgba(194,110,30,0.04)"
            }}
          >
            <h3 className="text-xl font-bold text-slate-800">Thông tin giảng viên</h3>
            
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200">
                <img src={course.instructor.avatar} alt={course.instructor.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-2 flex-1">
                <h4 className="text-lg font-bold text-slate-800">{course.instructor.name}</h4>
                <p className="text-xs font-black text-orange-500 uppercase tracking-widest">{course.instructor.title}</p>
                
                {/* Stats */}
                <div className="flex gap-4 text-xs font-bold text-slate-400">
                  <div>⭐ {course.instructor.rating} Đánh giá</div>
                  <div>👥 {course.instructor.studentsCount.toLocaleString("vi-VN")} Học viên</div>
                  <div>📚 {course.instructor.coursesCount} Khóa học</div>
                </div>
                
                <p className="text-sm font-medium text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                  {course.instructor.bio}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* CỘT PHẢI: THẺ MUA KHÓA HỌC STICKY (Chiếm 1 phần) */}
        <div className="lg:sticky lg:top-8 space-y-6">
          
          <div 
            className="rounded-[2rem] overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.65)",
              border: "1px solid rgba(255,255,255,0.85)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 20px 48px rgba(194,110,30,0.08)"
            }}
          >
            {/* Thumbnail Video Preview Area */}
            <div className="relative aspect-video overflow-hidden m-2 rounded-2xl group cursor-pointer"
              onClick={() => handleOpenPreview(course.lessons[0].videoUrl)}
            >
              <img src={course.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/30 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/90 shadow-xl text-orange-500 flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                  <Play size={20} className="fill-current ml-1" />
                </div>
              </div>
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-slate-900/60 backdrop-blur text-white text-[10px] font-black uppercase tracking-wider">
                Xem Trailer giới thiệu
              </span>
            </div>

            {/* Purchase details body */}
            <div className="p-6 pt-4 space-y-6">
              
              {/* Price Tag */}
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Giá trọn gói</span>
                <h2 className="text-3xl font-black" style={{ background: "linear-gradient(135deg, #f97316, #fb923c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {course.price.toLocaleString("vi-VN")} ₫
                </h2>
              </div>

              {/* Purchase Action Buttons */}
              <div className="space-y-3">
                {/* 🔑 NÚT MUA CHÍNH: Bạn sẽ tích hợp logic gọi hàm payment() ở đây */}
                <button 
                  onClick={() => console.log("Gọi API Payment cho khóa học:", course._id)}
                  className="w-full py-3.5 rounded-2xl text-sm font-black text-white shadow-lg shadow-orange-500/25 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
                >
                  <ShoppingCart size={16} /> Đăng ký khóa học ngay
                </button>
                <p className="text-[11px] text-center font-bold text-slate-400">Cam kết hoàn tiền trong 7 ngày nếu không hài lòng</p>
              </div>

              {/* Core Features list */}
              <div className="pt-5 border-t border-slate-100 space-y-3.5 text-xs font-semibold text-slate-500">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center"><Clock size={12} /></div>
                  <span>Thời lượng khóa học: {Math.round(totalDuration / 60)} giờ</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center"><BookOpen size={12} /></div>
                  <span>Tổng số bài học: {course.lessons.length} bài</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center"><Award size={12} /></div>
                  <span>Chứng nhận hoàn thành khóa học</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* ── 5. PREVIEW VIDEO POPUP MODAL ── */}
      {showPreviewModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
          onClick={() => setShowPreviewModal(false)}
        >
          <div 
            className="w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative"
            style={{
              background: "rgba(255,255,255,0.9)",
              border: "1px solid rgba(255,255,255,1)",
              backdropFilter: "blur(20px)"
            }}
            onClick={(e) => e.stopPropagation()} // Chặn bong bóng sự kiện
          >
            {/* Modal Header */}
            <div className="p-4 flex items-center justify-between border-b border-slate-100">
              <h4 className="font-bold text-sm text-slate-700">Học thử bài học</h4>
              <button 
                onClick={() => setShowPreviewModal(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Video Player */}
            <div className="aspect-video bg-black">
              <video 
                src={previewVideoUrl} 
                controls 
                autoPlay 
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CourseDetailsRecorded;
