import { Badge, Button, Card, Col, Row, Table } from "react-bootstrap";

const DetailsUSer = ({
  loading,
  error,
  userlist,
  numberErrolments,
  totalOrder,
  numberlive,
}) => {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">User Details</h3>
          {error && <p className="text-danger">{error}</p>}
          {loading && <p className="text-muted">Loading...</p>}
          <p className="text-muted mb-0">
            View detailed information, enrollments and order history
          </p>
        </div>

        <Button variant="outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </Button>
      </div>
      {/* Back */}
      <div className="mb-4">
        <Button variant="link" className="text-decoration-none p-0">
          <i className="bi bi-arrow-left me-2"></i>
          Back to User Management
        </Button>
      </div>

      <Card
        className="border-0 shadow-sm overflow-hidden mb-4"
        style={{ borderRadius: "20px" }}
      >
        <div
          style={{
            height: "120px",
            background: "linear-gradient(135deg, #0d6efd 0%, #4f8cff 100%)",
          }}
        />

        <Card.Body>
          <div className="d-flex flex-column flex-lg-row align-items-lg-center">
            <img
              src={userlist?.user?.avata}
              alt=""
              width="100"
              height="100"
              className="rounded-circle border border-4 border-white shadow-sm"
              style={{
                marginTop: "-70px",
                objectFit: "cover",
              }}
            />

            <div className="ms-lg-4 mt-3 mt-lg-0">
              <h3 className="fw-bold mb-1">{userlist?.user?.name}</h3>

              <p className="text-muted mb-2">{userlist?.user?.email}</p>

              <div className="d-flex gap-2 flex-wrap">
                <Badge bg="primary">Student</Badge>
                <Badge bg="success">{userlist?.status}</Badge>
              </div>

              <small className="text-muted d-block mt-3">
                Joined: 22/03/2024
              </small>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Statistics */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{ borderRadius: "16px" }}
          >
            <Card.Body className="text-center py-4">
              <div className="fs-1 fw-bold text-primary">
                {numberErrolments}
              </div>

              <div className="text-muted">Total Enrollments</div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{ borderRadius: "16px" }}
          >
            <Card.Body className="text-center py-4">
              <div className="fs-1 fw-bold text-success">{totalOrder}</div>

              <div className="text-muted">Total Orders</div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{ borderRadius: "16px" }}
          >
            <Card.Body className="text-center py-4">
              <div className="fs-1 fw-bold text-warning">{numberlive}</div>

              <div className="text-muted">Live Classes</div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Learning History */}
      <Card
        className="border-0 shadow-sm mb-4"
        style={{ borderRadius: "16px" }}
      >
        <Card.Header className="bg-white border-0 py-3">
          <h5 className="fw-bold mb-0">Learning History</h5>
        </Card.Header>

        <Card.Body className="p-0">
          <Table hover responsive className="align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Course</th>
                <th>Type</th>
                <th>Price</th>
                <th>Status</th>
                <th>Enrolled Date</th>
              </tr>
            </thead>

            <tbody>
              {userlist?.finalresult?.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item?.thumbnail}
                        alt=""
                        width="80"
                        height="50"
                        className="rounded"
                      />
                      <div>
                        <div className="fw-semibold">{item?.title}</div>
                        <small className="text-muted">
                          {item?.description}
                        </small>
                      </div>
                    </div>
                  </td>

                  <td>
                    <Badge bg="warning">{item?.type}</Badge>
                  </td>

                  <td>{item?.coursePrice}</td>

                  <td>
                    <Badge bg="success">{item?.status}</Badge>
                  </td>

                  <td>01/06/2026</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Order History */}
      <Card className="border-0 shadow-sm" style={{ borderRadius: "16px" }}>
        <Card.Header className="bg-white border-0 py-3">
          <h5 className="fw-bold mb-0">Order History</h5>
        </Card.Header>

        <Card.Body className="p-0">
          <Table hover responsive className="align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Order ID</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {userlist?.order?.map((item) => (
                <tr key={item._id}>
                  <td>ORD00</td>

                  <td>
                    <Badge bg="primary">
                      {item?.classId != null ? "live" : "recorded"}
                    </Badge>
                  </td>

                  <td>{item?.price}đ</td>

                  <td>
                    {item?.status === "completed" ? (
                      <Badge bg="success">{item?.status}</Badge>
                    ) : item?.status === "pending" ? (
                      <Badge bg="warning">{item?.status}</Badge>
                    ) : (
                      <Badge bg="danger">{item?.status}</Badge>
                    )}
                  </td>

                  <td> {new Date(item.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};
export default DetailsUSer;
