import { Col, Container, Row } from "react-bootstrap";
import UserTable from "../components/UsersTable";
import useUsers from "../hooks/useUsers";
import { useNavigate } from "react-router-dom";

import useEditUsers from "../hooks/useEditUser";

const AdminUserPage = () => {
  const { loading, error, userlist,getAll} = useUsers();

  const { getchane } = useEditUsers();

  const handleChangeStatus = async (data) => {
    try {
      console.log(data);
      await getchane(data);
      await getAll();
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col md={12}>
            <UserTable
              loading={loading}
              error={error}
              userlist={userlist}
              navigate={navigate}
              handleChangeStatus={handleChangeStatus}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminUserPage;
