import { useState } from "react";
import { toast } from "react-toastify";
import HelpCenterView from "../components/HelpCenterView";
import useHelp from "../hooks/useHelp";

export default function HelpPage() {
  const {
    loading,
    notifications,
    teacherRequests,
    Setnotifications,
    sendHelpMessage,
    getNotifications,
  } = useHelp();

  const [formData, setFormData] = useState({
    category: "payment",
    subject: "",
    message: "",
  });
  const [activeFilter, setActiveFilter] = useState("all");

  const [openFaqId, setOpenFaqId] = useState(1);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (category) => {
    setFormData((prev) => ({ ...prev, category }));
  };

  const toggleFaq = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const handleSubmitTicket = async (e) => {
    e.preventDefault();

    if (!formData.subject.trim() || !formData.message.trim()) {
      toast.error("Vui lòng điền đầy đủ tiêu đề và nội dung cần hỗ trợ!");
      return;
    }

    const payload = {
      title: `[${formData.category.toUpperCase()}] ${formData.subject.trim()}`,
      message: formData.message.trim(),
    };

    const res = await sendHelpMessage(payload);

    if (res) {
      toast.success(
        "Gửi yêu cầu hỗ trợ thành công! Ban Quản Trị sẽ phản hồi sớm nhất. ✨",
      );

      Setnotifications((prev) => [res, ...prev]);
      setFormData({ category: "payment", subject: "", message: "" });
    } else {
      toast.error("Gửi yêu cầu thất bại, vui lòng thử lại!");
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-140px)]">
      <HelpCenterView
        formData={formData}
        handleInputChange={handleInputChange}
        handleCategoryChange={handleCategoryChange}
        handleSubmitTicket={handleSubmitTicket}
        notifications={notifications}
        teacherRequests={teacherRequests}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        openFaqId={openFaqId}
        toggleFaq={toggleFaq}
        loading={loading}
      />
    </div>
  );
}
