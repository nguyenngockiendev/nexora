import { useNavigate, useParams } from "react-router-dom";
import useJoinClass from "../hooks/useJoinLiveClass";
import ClassRoom from "../components/ClassMeetingbox";

const LiveclassRoom = () => {
  const { classId } = useParams();
  const { classs, error, loading } = useJoinClass(classId);
  const navigate = useNavigate();

  return (
    <ClassRoom
      classs={classs}
      error={error}
      loading={loading}
      navigate={navigate}
    />
  );
};

export default LiveclassRoom;
