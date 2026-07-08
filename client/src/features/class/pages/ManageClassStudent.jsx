import { toast } from "react-toastify";
import ClassStudents from "../components/ClassStudents";
import { useNavigate, useParams } from "react-router-dom";
import useClassStudents from "../hooks/useClassStudents";

const ManageClassStudents = () => {
  const { classId } = useParams();

  const { liststudents, error, loading, RemoveStuden, GetAllStudents, sucess } =
    useClassStudents(classId);
    
  const handremoveStudent = async (data) => {
    try {
      await RemoveStuden(data);
      await GetAllStudents();
      toast(sucess);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  return (
    <ClassStudents
      liststudents={liststudents}
      error={error}
      loading={loading}
      handremoveStudent={handremoveStudent}
      navigate={navigate}
    />
  );
};

export default ManageClassStudents;
