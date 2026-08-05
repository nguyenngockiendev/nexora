import { useState } from "react";
import RequestInstructor from "../components/RequestIntructor";
import useRequestIntructor from "../hooks/useRequestIntructor";
import { toast } from "react-toastify";

const BecomeInstructor = () => {
  const [opinion, setOpinion] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [proofImage, setProofImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const { sendRequest, loading, error } = useRequestIntructor();

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProofImage(file);
      setPreviewUrl(URL.createObjectURL(file)); 
    }
  };

  
  const handleRemoveImage = () => {
    setProofImage(null);
    setPreviewUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!opinion || !specialty || !proofImage) {
      toast.error("Vui lòng điền đầy đủ thông tin và tải ảnh minh chứng!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("specialty", specialty);
      formData.append("opinion", opinion);
      formData.append("proofImage", proofImage);
      
      await sendRequest(formData);
      setOpinion("");
      setSpecialty("");
      setProofImage(null);
      setPreviewUrl("");
    } catch (err) {
      const msg = err.response?.data?.message || error || "Gửi đơn thất bại, vui lòng thử lại.";
      toast.error(msg);
    }
  };

  return (
    <div>
      <RequestInstructor
        opinion={opinion}
        setOpinion={setOpinion}
        specialty={specialty}
        setSpecialty={setSpecialty}
        proofImage={proofImage}
        previewUrl={previewUrl}
        handleImageChange={handleImageChange}
        handleRemoveImage={handleRemoveImage}
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default BecomeInstructor;
