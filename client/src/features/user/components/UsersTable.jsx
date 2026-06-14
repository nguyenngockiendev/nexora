import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  Col,
  Form,
  InputGroup,
  Pagination,
  Row,
  Table,
} from "react-bootstrap";

const UserTable = ({
  loading,
  error,
  userlist,
  navigate,
  handleChangeStatus,
}) => {
  return (
    // {/* Header */}

    <div>
      <h3 className="fw-bold mb-1">User Management</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {/* Filter */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row className="g-3">
            <Col lg={5}>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control placeholder="Search by name or email..." />
              </InputGroup>
            </Col>

            <Col lg={3}>
              <ButtonGroup className="w-100">
                <Button variant="primary">Student</Button>
                <Button variant="outline-primary">Instructor</Button>
              </ButtonGroup>
            </Col>

            <Col lg={2}>
              <Form.Select>
                <option>All Status</option>
                <option>Active</option>
                <option>Banned</option>
              </Form.Select>
            </Col>

            <Col lg={2}>
              <Button variant="outline-secondary" className="w-100">
                Reset Filters
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Table */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Table hover responsive className="align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Joined</th>
                <th>Courses</th>
                <th width="220">Actions</th>
              </tr>
            </thead>

            <tbody>
              {userlist?.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={item?.avatar}
                        alt=""
                        width="45"
                        height="45"
                        className="rounded-circle"
                      />

                      <div>
                        <div className="fw-semibold">{item?.name}</div>
                        <small className="text-muted"></small>
                      </div>
                    </div>
                  </td>

                  <td>{item?.email}</td>

                  <td>
                    <Badge bg="primary">{item?.role}</Badge>
                  </td>

                  <td>
                    <Badge bg="success">{item?.status}</Badge>
                  </td>

                  <td>{item.joid}</td>
                  <td>{item.totalcourse} Courses</td>

                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant="outline-info"
                        onClick={() => navigate(`details/${item._id}`)}
                      >
                        View
                      </Button>

                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleChangeStatus(item)}
                      >
                        {item.status === "active" ? "Ban" : "Open"}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <small className="text-muted">Showing 1 - 10 of 120 users</small>

        <Pagination className="mb-0">
          <Pagination.Prev />

          <Pagination.Item active>1</Pagination.Item>
          <Pagination.Item>2</Pagination.Item>
          <Pagination.Item>3</Pagination.Item>

          <Pagination.Next />
        </Pagination>
      </div>
    </div>
  );
};
export default UserTable;
