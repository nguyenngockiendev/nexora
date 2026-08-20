import UserProfileView from "../components/UserProfileView";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import useEditUsers from "../hooks/useEditUser";

import { useOutletContext } from "react-router-dom";

const ProfilePage = () => {
  const { dashboard, setDashboard } = useOutletContext();

  const { updateProfile, loading, changepassword, error } = useEditUsers();
  const [activeTab, setActiveTab] = useState("personal");
  const [avatarFile, setAvatarFile] = useState(null);

  const [formData, setFormData] = useState({
    fullName: dashboard?.name || "",
    email: dashboard?.email || "",
    phone: dashboard?.phone || "",
    bio: dashboard?.bio || "",
    avatar: dashboard?.avatar || "",
  });

  const [passData, setPassData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (dashboard) {
      setFormData({
        fullName: dashboard.name || "",
        email: dashboard.email || "",
        phone: dashboard.phone || "",
        bio: dashboard.bio || "",
        avatar: dashboard.avatar || "",
      });
    }
  }, [dashboard]);

  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file" && files?.[0]) {
      const file = files[0];
      setAvatarFile(file);
      setFormData((prev) => ({
        ...prev,
        avatar: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePassChange = (e) => {
    const { name, value } = e.target;
    setPassData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const newdata = new FormData();
    if (formData.fullName) newdata.append("name", formData.fullName);
    if (formData.email) newdata.append("email", formData.email);
    if (formData.phone) newdata.append("phone", formData.phone);
    if (formData.bio) newdata.append("bio", formData.bio);
    if (avatarFile) {
      newdata.append("avatar", avatarFile);
    }

    const result = await updateProfile(newdata);
    if (result) {
      setDashboard(result);
      toast.success("Cập nhật thông tin cá nhân thành công! ✨");
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();

    if (passData.newPassword !== passData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }
    const isChange = await changepassword(passData);

    if (isChange) {
      toast.success("Đổi mật khẩu thành công!");
      setPassData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      return;
    } else {
      toast.error("Sai mật khẩu");
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-140px)]">
      <UserProfileView
        userInfor={dashboard}
        setActiveTab={setActiveTab}
        handleSavePassword={handleSavePassword}
        handleSaveProfile={handleSaveProfile}
        handlePassChange={handlePassChange}
        handleInputChange={handleInputChange}
        activeTab={activeTab}
        formData={formData}
        passData={passData}
        loading={loading}
      />
    </div>
  );
};

export default ProfilePage;
