import { Button, Card, CardBody, Form } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

const CreateClassForm = ({
  register,
  handleSubmit,
  onSubmit,
  loading,
  notification,
  classsdata,
  navigate,
  classloading,
  classnotification,
}) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center py-5"
      style={{
        background: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <h2>{notification}</h2>
      <Card
        className="border-0"
        style={{
          width: "100%",
          maxWidth: "900px",
          borderRadius: "24px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        }}
      >
        <CardBody className="p-5">
          {/* Header */}
          <div className="mb-5">
            <h1 className="fw-bold mb-2">Create Live Class</h1>

            <p className="text-medium-emphasis mb-0">
              Setup your live learning classroom
            </p>
          </div>

          {/* Basic Information */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              className="p-4 mb-4"
              style={{
                background: "#fff",
                borderRadius: "18px",
                border: "1px solid #e9ecef",
              }}
            >
              <h5 className="fw-bold mb-4">Basic Information</h5>

              <div className="mb-4">
                <label className="form-label fw-semibold">Class Name</label>

                <Form.Control
                  placeholder="e.g., React Bootcamp for Beginners"
                  style={{
                    padding: "12px",
                    borderRadius: "12px",
                  }}
                  required="Class name is required"
                  {...register("Classname")}
                />
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Description</label>

                <textarea
                  className="form-control"
                  rows={4}
                  placeholder="This is a comprehensive React Bootcamp designed for beginners to master React.js and build real-world projects."
                  style={{
                    borderRadius: "12px",
                    padding: "14px",
                    resize: "none",
                  }}
                  {...register("Description")}
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold">
                    Maximum Students
                  </label>

                  <Form.Control
                    type="number"
                    placeholder="enter the maximum number of students allowed in the class"
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                    }}
                    {...register("Studentsnumber")}
                    required="Students numberis required"
                  />
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div
              className="p-4 mb-4"
              style={{
                background: "#fff",
                borderRadius: "18px",
                border: "1px solid #e9ecef",
              }}
            >
              <h5 className="fw-bold mb-4">Timeline & Meeting</h5>

              <div className="row">
                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold">
                    Register Deadline
                  </label>

                  <Form.Control
                    type="date"
                    placeholder="Deadline for students to register"
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                    }}
                    {...register("Dealine")}
                    required="Dealine is required"
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold">Meeting Link</label>

                  <Form.Control
                    placeholder="https://zoom.us/..."
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                    }}
                    {...register("Meetinglink")}
                    required="Meetinglink is required"
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold">Start Date</label>

                  <Form.Control
                    type="date"
                    placeholder="Start date and time of the class"
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                    }}
                    {...register("Startdate")}
                    required="Start date is required"
                  />
                </div>

                <div className="col-md-6 mb-4">
                  <label className="form-label fw-semibold">End Date</label>

                  <Form.Control
                    type="date"
                    placeholder="End date and time of the class"
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                    }}
                    {...register("Enddate")}
                    required="End date  is required"
                  />
                </div>
              </div>
            </div>

            {/* Weekly Schedule */}
            <div
              className="p-4 mb-4"
              style={{
                background: "#fff",
                borderRadius: "18px",
                border: "1px solid #e9ecef",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="fw-bold mb-0">Weekly Schedule</h5>
              </div>

              <div className="row align-items-end mb-3">
                <div className="col-md-4">
                  <label className="form-label">Day</label>

                  <Form.Select
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                    }}
              
                    {...register("Day")}
                    required="Day is required"
                  >
                    <option value="">Select date</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </Form.Select>
                </div>

                <div className="col-md-3">
                  <label className="form-label">Start Time</label>

                  <Form.Control
                    type="time"
                    placeholder="Start time of the class session"
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                    }}
                    {...register("Starttime")}
                    required="Start time is required"
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label">End Time</label>

                  <Form.Control
                    type="time"
                    placeholder="End time of the class session"
                    style={{
                      padding: "12px",
                      borderRadius: "12px",
                    }}
                    {...register("Endtime")}
                    required="End time is required"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6 mb-4">
              <label className="form-label fw-semibold">Price</label>

              <Form.Control
                type="number"
                placeholder="enter price for class"
                style={{
                  padding: "12px",
                  borderRadius: "12px",
                }}
                {...register("Price")}
                required="price is required"
              />
            </div>
            {/* Buttons */}
            <div className="d-flex gap-3">
              {classsdata && (
                <Button
                  type="submit"
                  color="success"
                  className="flex-grow-1"
                  style={{
                    padding: "14px",
                    borderRadius: "12px",
                    fontWeight: "600",
                  }}
                >
                  Update Live Class
                </Button>
              )}
              {!classsdata && (
                <Button
                  type="submit"
                  color="success"
                  className="flex-grow-1"
                  style={{
                    padding: "14px",
                    borderRadius: "12px",
                    fontWeight: "600",
                  }}
                >
                  Create Live Class
                </Button>
              )}

              <Button
                color="light"
                style={{
                  padding: "14px 24px",
                  borderRadius: "12px",
                  border: "1px solid #dee2e6",
                }}
                onClick={() => navigate("/courses")}
              >
                Back
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};
export default CreateClassForm;
