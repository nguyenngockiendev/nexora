import DetailsUSer from "../components/DetailsUserTable";
import { useParams } from "react-router-dom";
import UserDetailsUser from "../hooks/useDetailsUser";

const DetailsPage = () => {
  const { userId } = useParams();
 
  const { loading, error, userlist, numberErrolments,totalOrder,numberlive} =
    UserDetailsUser(userId);
    
  return (
    <div className="w-full">
      <div className="mx-auto w-full">
        <DetailsUSer
          loading={loading}
          error={error}
          userlist={userlist}
          numberErrolments={numberErrolments}
          totalOrder={totalOrder}
          numberlive={numberlive}
        />
      </div>
    </div>
  );
};

export default DetailsPage;
