import ClassDetails from "../components/ClassDetails";
import { useNavigate, useParams } from "react-router-dom";
import useClassStudents from "../hooks/useClassStudents";
import { toast } from "react-toastify";

const ClassDetailsPage = () => {
  const { classId } = useParams();

  const { liststudents, error, loading, RefectStuden } =
    useClassStudents(classId);
  const navigate = useNavigate();
  const handremoveStudent = async (data) => {
    try {
      await RefectStuden(data);
      navigate(-1);
      toast("Restored successfully!");
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ClassDetails liststudents={liststudents} handremoveStudent={handremoveStudent}/>
  );
};

export default ClassDetailsPage;
