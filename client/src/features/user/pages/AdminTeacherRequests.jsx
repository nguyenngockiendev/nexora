import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useRequestIntructor from "../hooks/useRequestIntructor";
import useHelp from "../../help/hooks/useHelp";
import AdminSupportManagerView from "../../help/components/AdminSupportManagerView";

const AdminTeacherRequests = () => {
  const { requestList, GetPendingIns, ResIns, loading: teacherLoading } =
    useRequestIntructor();
  const { getAllForAdmin, replyToUser, loading: helpLoading } = useHelp();

  const [helpList, setHelpList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [replyText, setReplyText] = useState("");
  const [isActionLoading, setIsActionLoading] = useState(false);

  const fetchAllData = async () => {
    try {
      await GetPendingIns();
      const notifs = await getAllForAdmin();
      setHelpList(notifs || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // Hợp nhất dữ liệu từ cả 2 nguồn: Đơn Giảng viên + Yêu cầu Hỗ trợ
  const combinedList = [
    // 1. Danh sách Đơn Giảng viên
    ...(requestList || []).map((req) => ({
      id: req._id,
      type: "teacher",
      title: `Đăng ký Giảng viên: ${req.specialty || "Chưa rõ chuyên môn"}`,
      message:
        req.opinion ||
        "Tôi mong muốn tham gia giảng dạy và chia sẻ kiến thức trên nền tảng Nexora.",
      specialty: req.specialty,
      proofImage: req.proofImage,
      sender: req.userId,
      status: req.status || "pending",
      categoryBadge: "Duyệt Giảng viên",
      createdAt: req.createdAt,
      createdAtFormatted: req.createdAt
        ? new Date(req.createdAt).toLocaleDateString("vi-VN")
        : "Mới đây",
    })),

    // 2. Danh sách Yêu cầu Hỗ trợ (Help Tickets)
    ...(helpList || []).map((notif) => {
      const isResolved = notif.type === "help_reply" || notif.receiverId != null;
      return {
        id: notif._id,
        type: "help",
        title: notif.title,
        message: notif.message,
        sender: notif.senderId,
        receiverId: notif.receiverId,
        status: isResolved ? "resolved" : "pending",
        categoryBadge:
          notif.type === "help_reply"
            ? "Đã phản hồi"
            : notif.type === "help_request"
            ? "Hỗ trợ học viên"
            : "Thông báo",
        createdAt: notif.createdAt,
        createdAtFormatted: notif.createdAt
          ? new Date(notif.createdAt).toLocaleDateString("vi-VN")
          : "Mới đây",
      };
    }),
  ];

  // Tự động chọn item đầu tiên nếu chưa có item nào được chọn
  useEffect(() => {
    if (!selectedItem && combinedList.length > 0) {
      setSelectedItem(combinedList[0]);
    } else if (selectedItem) {
      // Cập nhật lại object selectedItem nếu danh sách thay đổi
      const found = combinedList.find((i) => i.id === selectedItem.id);
      if (found) setSelectedItem(found);
    }
  }, [requestList, helpList]);

  // Xử lý gửi phản hồi cho học viên
  const handleSendReply = async (receiverId, title) => {
    if (!replyText.trim()) {
      toast.error("Vui lòng nhập nội dung phản hồi!");
      return;
    }
    if (!receiverId) {
      toast.error("Không tìm thấy ID người nhận!");
      return;
    }

    try {
      setIsActionLoading(true);
      const res = await replyToUser(receiverId, {
        title: `[PHẢN HỒI] ${title}`,
        message: replyText.trim(),
        type: "help_reply",
      });

      if (res) {
        toast.success("Gửi phản hồi cho người dùng thành công! ✨");
        setReplyText("");
        await fetchAllData();
      }
    } catch (error) {
      console.log(error);
      toast.error("Gửi phản hồi thất bại!");
    } finally {
      setIsActionLoading(false);
    }
  };

  // Xử lý Duyệt hoặc Từ chối đơn Giảng viên
  const handleTeacherAction = async (requestId, userId, approvedStatus) => {
    if (!requestId || !userId) {
      toast.error("Thiếu thông tin yêu cầu!");
      return;
    }

    try {
      setIsActionLoading(true);
      await ResIns({
        requestId,
        userId,
        approved: approvedStatus,
      });
      await fetchAllData();
    } catch (error) {
      console.log(error);
    } finally {
      setIsActionLoading(false);
    }
  };

  // Xử lý Phát Thông Báo chung hoặc Gửi Note riêng
  const handleBroadcastNote = async ({ targetRole, receiverId, title, message }) => {
    if (!title.trim() || !message.trim()) {
      toast.error("Vui lòng nhập đầy đủ tiêu đề và nội dung thông báo!");
      return false;
    }

    try {
      setIsActionLoading(true);
      const isDirect = targetRole === "direct" && receiverId;
      const res = await replyToUser(isDirect ? receiverId : "all", {
        title: title.trim(),
        message: message.trim(),
        targetRole: isDirect ? "direct" : targetRole,
        type: isDirect ? "admin_note" : "broadcast",
      });

      if (res) {
        toast.success(
          isDirect
            ? "Gửi lời nhắn riêng cho người dùng thành công! ✨"
            : `Đã phát thông báo tới ${
                targetRole === "all"
                  ? "toàn bộ hệ thống"
                  : targetRole === "student"
                  ? "tất cả học viên"
                  : "tất cả giảng viên"
              }! 📢`
        );
        await fetchAllData();
        return true;
      }
      return false;
    } catch (error) {
      console.log(error);
      toast.error("Phát thông báo thất bại!");
      return false;
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-140px)]">
      <AdminSupportManagerView
        combinedList={combinedList}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        replyText={replyText}
        setReplyText={setReplyText}
        handleSendReply={handleSendReply}
        handleTeacherAction={handleTeacherAction}
        handleBroadcastNote={handleBroadcastNote}
        loading={teacherLoading || helpLoading}
        isActionLoading={isActionLoading}
      />
    </div>
  );
};

export default AdminTeacherRequests;
