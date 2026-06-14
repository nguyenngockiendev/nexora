import { Col, Container, Row } from "react-bootstrap";
import DetailsUSer from "../components/DetailsUserTable";
import { useParams } from "react-router-dom";
import UserDetailsUser from "../hooks/useDetailsUser";

const DetailsPage = () => {
  const { userId } = useParams();
 
  const { loading, error, userlist, numberErrolments,totalOrder,numberlive} =
    UserDetailsUser(userId);
  return (
    <div>
      <Container>
        <Row className="justify-content-center">
          <Col md={12}>
            <DetailsUSer
              loading={loading}
              error={error}
              userlist={userlist}
              numberErrolments={numberErrolments}
              totalOrder={totalOrder}
              numberlive={numberlive}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailsPage;
