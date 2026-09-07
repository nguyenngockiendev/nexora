import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import useJoinClass from "../hooks/useJoinLiveClass";
import ClassRoom from "../components/ClassMeetingbox";
import useClassChat from "../hooks/useClassChat";

import { toast } from "react-toastify";
import { useState } from "react";
import useSumbitAss from "../hooks/useSumbitAss";
import { useEffect } from "react";

const LiveclassRoom = () => {
  const { dashboard } = useOutletContext() || {};
  const { classId } = useParams();
  const { classs, error, loading } = useJoinClass(classId);
  const { message, loadings, sendMess } = useClassChat(classId);
  const { SumbitAss, assesment, getAssesment,SumbitGrade } = useSumbitAss();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [Assfile, setAssfile] = useState(null);
  const [studentFile, setStudentFile] = useState(null);
  const [selectedAssId, setSelectedAssId] = useState("");
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    deadline: "",
  });
  useEffect(() => {
    if (classId) {
      getAssesment(classId);
    }
  }, [classId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handsumbit = async (e) => {
    if (e) e.preventDefault();
    try {
      if (!input.title) {
        toast.error("Vui lòng nhập tiêu đề bài tập!");
        return;
      }
      if (!Assfile) {
        toast.error("Vui lòng chọn file đính kèm!");
        return;
      }
      const formdata = new FormData();
      formdata.append("title", input.title);
      formdata.append("description", input.description);
      formdata.append("deadline", input.deadline);
      formdata.append("fileAss", Assfile);

      const reult = await SumbitAss(formdata, classId);
      if (reult) {
        setShowUploadModal(false);
        setAssfile(null);
        setInput({ title: "", description: "", deadline: "" });
        toast.success("Tải lên thành công!");
        getAssesment(classId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handSubmitStudent = async (e) => {
    if (e) e.preventDefault();
    try {
      if (!selectedAssId) {
        toast.error("Vui lòng chọn bài tập cần nộp!");
        return;
      }
      if (!studentFile) {
        toast.error("Vui lòng chọn file bài làm của bạn!");
        return;
      }
      const formdata = new FormData();
      formdata.append("assignmentId", selectedAssId);
      formdata.append("fileAss", studentFile);

      const result = await SumbitGrade(formdata, classId);
      if (result) {
        setShowStudentModal(false);
        setStudentFile(null);
        setSelectedAssId("");
        toast.success("Nộp bài tập thành công!");
        getAssesment(classId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ClassRoom
      handsumbit={handsumbit}
      handSubmitStudent={handSubmitStudent}
      input={input}
      setAssfile={setAssfile}
      Assfile={Assfile}
      studentFile={studentFile}
      setStudentFile={setStudentFile}
      selectedAssId={selectedAssId}
      setSelectedAssId={setSelectedAssId}
      handleInputChange={handleInputChange}
      classs={classs}
      error={error}
      loading={loading}
      navigate={navigate}
      message={message}
      loadings={loadings}
      sendMess={sendMess}
      setShowUploadModal={setShowUploadModal}
      showUploadModal={showUploadModal}
      showStudentModal={showStudentModal}
      setShowStudentModal={setShowStudentModal}
      assesment={assesment}
      user={dashboard}
    />
  );
};

export default LiveclassRoom;
