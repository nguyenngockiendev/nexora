import { useState } from "react";
import { Star, Send, MessageSquare, Trash2 } from "lucide-react";
import useRating from "../hooks/useRating";

const CourseRating = ({ courseId }) => {
  const { ratings, loading, CreateAndUpdate, daleteRating } = useRating(courseId);

  const [userRating, setUserRating] = useState(5);
  const [userComment, setUserComment] = useState("");
  const ratingList = Array.isArray(ratings) ? ratings : (ratings?.ratings || []);
  const displayRating = ratings?.avgRatingcou || ratings?.averageRating || 5.0;

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!userComment.trim()) return;

    await CreateAndUpdate({
      rating: userRating,
      comment: userComment,
    });

    setUserComment(""); 
  };

  return (
    <div className="w-full space-y-4">
      {/* Tiêu đề card */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100/80">
        <h4 className="text-base font-bold text-slate-800 flex items-center gap-2 m-0">
          <MessageSquare size={17} className="text-orange-500" />
          Đánh giá khóa học
        </h4>
        <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60 flex items-center gap-1">
          <Star size={12} fill="currentColor" /> {displayRating} ({ratingList.length})
        </span>
      </div>

      {/* Form viết nhận xét */}
      <form onSubmit={handleSubmitReview} className="w-full space-y-3 bg-white/70 p-3.5 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-600">Đánh giá của bạn:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setUserRating(star)}
                className="p-0.5 border-0 bg-transparent cursor-pointer hover:scale-110 transition-transform"
              >
                <Star
                  size={16}
                  className={star <= userRating ? "text-amber-400" : "text-slate-300"}
                  fill={star <= userRating ? "currentColor" : "none"}
                />
              </button>
            ))}
          </div>
        </div>

        <textarea
          rows={3}
          value={userComment}
          onChange={(e) => setUserComment(e.target.value)}
          placeholder="Viết nhận xét của bạn về khóa học..."
          className="w-full p-2.5 text-xs rounded-xl border border-slate-200 outline-none focus:border-orange-500 bg-white transition-all resize-none"
        />

        <button
          type="submit"
          className="w-full py-2 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 border-0 cursor-pointer shadow-md hover:scale-[1.01] active:scale-95 transition-all"
          style={{ background: "linear-gradient(135deg, #f97316, #ea580c)" }}
        >
          <Send size={12} /> Gửi đánh giá
        </button>
      </form>
      {loading && (
        <div className="text-center py-2 text-xs text-slate-400 font-semibold">
          Đang tải đánh giá...
        </div>
      )}

      <div className="space-y-2.5 max-h-[190px] overflow-y-auto pr-1">
        {ratingList.length === 0 && !loading && (
          <div className="text-center py-3 text-xs text-slate-400">
            Chưa có đánh giá nào. Hãy là người đầu tiên nhận xét!
          </div>
        )}

        {ratingList.map((rev) => (
          <div key={rev._id || rev.id} className="w-full p-3 rounded-2xl bg-white/80 border border-slate-100/80 shadow-sm space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {rev.userId?.avatar ? (
                  <img
                    src={rev.userId.avatar}
                    alt=""
                    className="w-5 h-5 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 text-[10px] font-bold flex items-center justify-center">
                    {(rev.userId?.name || rev.name || "H")[0]}
                  </div>
                )}
                <span className="text-xs font-bold text-slate-700">
                  {rev.userId?.name || rev.name || "Học viên"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={10}
                      className={s <= rev.rating ? "text-amber-400" : "text-slate-200"}
                      fill={s <= rev.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                {/* Nút xóa đánh giá */}
                {daleteRating && (
                  <button
                    onClick={() => daleteRating(rev._id)}
                    className="p-1 border-0 bg-transparent text-slate-300 hover:text-rose-500 cursor-pointer transition-colors"
                    title="Xóa nhận xét"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
            </div>
            <p className="text-xs text-slate-500 m-0 leading-relaxed pl-7">"{rev.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseRating;
