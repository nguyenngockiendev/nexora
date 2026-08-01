import { useNavigate, useParams } from "react-router-dom";
import useJoinClass from "../hooks/useJoinLiveClass";
import ClassRoom from "../components/ClassMeetingbox";
import useClassChat from "../hooks/useClassChat";

const LiveclassRoom = () => {
  const { classId } = useParams();
  const { classs, error, loading } = useJoinClass(classId);
  const {message,loadings, sendMess } = useClassChat(classId);
 
  const navigate = useNavigate();

  return (
    <ClassRoom
      classs={classs}
      error={error}
      loading={loading}
      navigate={navigate}
      message={message}
      loadings={loadings}
      sendMess={sendMess}
    />
  );
};

export default LiveclassRoom;
