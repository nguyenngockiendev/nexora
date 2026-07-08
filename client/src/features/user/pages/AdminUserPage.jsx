import UserTable from "../components/UsersTable";
import useUsers from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";
import useEditUsers from "../hooks/useEditUser";

const AdminUserPage = () => {
  const { loading, error, userlist, getAll } = useUsers();
  const { getchane } = useEditUsers();
  const navigate = useNavigate();

  const handleChangeStatus = async (data) => {
    try {
      console.log(data);
      await getchane(data);
      await getAll();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserTable
      loading={loading}
      error={error}
      userlist={userlist}
      navigate={navigate}
      handleChangeStatus={handleChangeStatus}
    />
  );
};

export default AdminUserPage;
