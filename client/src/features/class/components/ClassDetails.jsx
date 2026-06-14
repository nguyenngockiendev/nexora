import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Pagination,
  Table,
} from "react-bootstrap";

const ClassDetails = ({ liststudents, handremoveStudent }) => {
  return (
    <>
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Students</h3>
          <p className="text-muted mb-0">
            Manage students enrolled in this class
          </p>
        </div>

        <Button variant="outline-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Class
        </Button>
      </div>

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="fw-semibold mb-0">Student List</h5>

            <div style={{ width: "320px" }}>
              <InputGroup>
                <InputGroup.Text>
                  <i className="bi bi-search"></i>
                </InputGroup.Text>

                <Form.Control placeholder="Search by name or email..." />
              </InputGroup>
            </div>
          </div>

          <Table responsive hover className="align-middle mb-0">
            <thead>
              <tr>
                <th>Student</th>
                <th>Email</th>
                <th>Joined Date</th>
                <th>Status</th>
                <th width="80">Actions</th>
              </tr>
            </thead>

            <tbody>
              {liststudents?.studentinactive?.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={item?.userId?.avatar}
                        alt=""
                        className="rounded-circle me-3"
                        width="40"
                        height="40"
                      />

                      <div>
                        <div className="fw-semibold">{item?.userId?.name}</div>
                      </div>
                    </div>
                  </td>

                  <td>{item?.userId?.email}</td>

                  <td>22/03/2024</td>

                  <td>
                    <Badge bg="danger">{item?.status}</Badge>
                  </td>

                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handremoveStudent(item)}
                      >
                        <i className="bi bi-person-x me-1"></i>
                        add in class
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          <div className="d-flex justify-content-end mt-4">
            <Pagination className="mb-0">
              <Pagination.Prev />

              <Pagination.Item active>1</Pagination.Item>

              <Pagination.Item>2</Pagination.Item>

              <Pagination.Item>3</Pagination.Item>

              <Pagination.Next />
            </Pagination>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
export default ClassDetails;
