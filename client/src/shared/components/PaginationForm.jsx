import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * PaginationForm - Component phân trang chuẩn Nexora UI
 * Phong cách Soft-Glass + Pill Capsule + Tone Cam Hổ Phách
 *
 * @param {Object} props
 * @param {Object} [props.pagination] - Object trả về từ hook usePagination (nếu có)
 * @param {number} [props.currentPage=1] - Trang hiện tại
 * @param {number} [props.totalPages=1] - Tổng số trang
 * @param {number} [props.totalItems] - Tổng số bản ghi (để in thống kê)
 * @param {number} [props.itemsPerPage=10] - Số bản ghi mỗi trang
 * @param {Function} [props.onPageChange] - Hàm gọi khi đổi trang: (page) => void
 * @param {Function} [props.goToPage] - Alias cho onPageChange
 * @param {boolean} [props.canPrev] - Có thể lùi trang không
 * @param {boolean} [props.canNext] - Có thể tiến trang không
 * @param {string} [props.itemName="kết quả"] - Tên đơn vị hiển thị (ví dụ: "khóa học", "học viên")
 * @param {boolean} [props.showStats=true] - Có hiển thị dòng thống kê "Hiển thị 1 - 8 trên 45" không
 * @param {string} [props.className=""] - Class tuỳ biến ngoài container
 */
export default function PaginationForm({
  pagination,
  currentPage: propCurrentPage,
  totalPages: propTotalPages,
  totalItems: propTotalItems,
  itemsPerPage: propItemsPerPage,
  onPageChange,
  goToPage,
  canPrev: propCanPrev,
  canNext: propCanNext,
  itemName = "kết quả",
  showStats = true,
  className = "",
}) {
  // Đồng bộ giá trị từ prop lẻ hoặc prop pagination object
  const currentPage = propCurrentPage ?? pagination?.currentPage ?? 1;
  const totalPages = propTotalPages ?? pagination?.totalPages ?? 1;
  const totalItems = propTotalItems ?? pagination?.totalItems;
  const itemsPerPage = propItemsPerPage ?? pagination?.itemsPerPage ?? 10;
  const handlePageChange = onPageChange || goToPage || pagination?.goToPage;
  const canPrev = propCanPrev ?? pagination?.canPrev ?? currentPage > 1;
  const canNext = propCanNext ?? pagination?.canNext ?? currentPage < totalPages;

  // Nếu không có dữ liệu hoặc chỉ có 1 trang và không có tổng số item thì ẩn đi
  if (totalPages <= 1 && (!totalItems || totalItems <= itemsPerPage)) {
    return null;
  }

  // Tính khoảng hiển thị ví dụ: 1 - 8 trên 45
  const startItem = totalItems ? (currentPage - 1) * itemsPerPage + 1 : null;
  const endItem = totalItems
    ? Math.min(currentPage * itemsPerPage, totalItems)
    : null;

  // Thuật toán tạo danh sách số trang thông minh có dấu ba chấm (...)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  const handleNext = () => {
    if (canNext && handlePageChange) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (canPrev && handlePageChange) {
      handlePageChange(currentPage - 1);
    }
  };

  return (
    <div
      className={`w-full flex flex-col md:grid md:grid-cols-3 items-center gap-4 py-6 px-2 select-none ${className}`}
    >
      {/* 🌟 1. THỐNG KÊ SỐ LƯỢNG BẢN GHI (BÊN TRÁI) 🌟 */}
      <div className="flex items-center justify-center md:justify-start w-full">
        {showStats && totalItems !== undefined && totalItems !== null ? (
          <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
            <span>Hiển thị</span>
            <span className="font-extrabold text-orange-600 bg-orange-50/90 px-2 py-0.5 rounded-md border border-orange-200/80 shadow-2xs">
              {startItem} - {endItem}
            </span>
            <span>
              trên tổng số{" "}
              <strong className="text-slate-800 font-extrabold">
                {totalItems}
              </strong>{" "}
              {itemName}
            </span>
          </div>
        ) : null}
      </div>

      {/* 🌟 2. CỤM PHÂN TRANG (CHÍNH GIỮA 100% CÂN ĐỐI) 🌟 */}
      <div className="flex items-center justify-center w-full">
        <div
          className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm shadow-orange-500/5"
          style={{ borderRadius: "9999px" }}
        >
          {/* Nút Trước (Prev) */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={!canPrev}
            style={{ borderRadius: "9999px" }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 select-none ${
              canPrev
                ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100/90 cursor-pointer active:scale-95"
                : "opacity-40 cursor-not-allowed text-slate-400"
            }`}
            title="Trang trước"
          >
            <ChevronLeft size={14} className="shrink-0" />
            <span className="hidden sm:inline">Trước</span>
          </button>

          {/* Các số trang (Page numbers) */}
          <div className="flex items-center gap-1">
            {pages.map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs font-bold text-slate-400 select-none"
                  >
                    ...
                  </span>
                );
              }

              const isCurrent = page === currentPage;

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageChange && handlePageChange(page)}
                  style={{
                    borderRadius: "9999px",
                    background: isCurrent
                      ? "linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
                      : "transparent",
                  }}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all select-none cursor-pointer ${
                    isCurrent
                      ? "text-white font-extrabold shadow-md shadow-orange-500/35 scale-105"
                      : "text-slate-600 hover:text-orange-600 hover:bg-orange-50/80 active:scale-95"
                  }`}
                >
                  {page}
                </button>
              );
            })}
          </div>

          {/* Nút Sau (Next) */}
          <button
            type="button"
            onClick={handleNext}
            disabled={!canNext}
            style={{ borderRadius: "9999px" }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1 select-none ${
              canNext
                ? "text-slate-600 hover:text-slate-900 hover:bg-slate-100/90 cursor-pointer active:scale-95"
                : "opacity-40 cursor-not-allowed text-slate-400"
            }`}
            title="Trang sau"
          >
            <span className="hidden sm:inline">Sau</span>
            <ChevronRight size={14} className="shrink-0" />
          </button>
        </div>
      </div>

      {/* 🌟 3. CỘT CÂN BẰNG BÊN PHẢI (GIỮ CHO GIỮA LUÔN 100% CÂN ĐỐI) 🌟 */}
      <div className="hidden md:block w-full" />
    </div>
  );
}
