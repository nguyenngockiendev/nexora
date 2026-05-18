import {
  CButton,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CCol,
  CRow,
} from "@coreui/react";

const DetailsCourse = ({
  detalscourse,
  error,
  loading,
  payment,
  errorPayment,
  paymentloading,
}) => {
  return (
    <div
      className="p-4"
      style={{
        background: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      {/* COURSE HERO */}
      <CCard
        className="border-0 shadow-sm mb-5"
        style={{
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <CRow className="g-0">
          {/* Thumbnail */}
          <CCol md={5}>
            <CCardImage
              src="https://images.unsplash.com/photo-1633356122544-f134324a6cee"
              style={{
                height: "100%",
                objectFit: "cover",
              }}
            />
          </CCol>

          {/* Content */}
          <CCol md={7}>
            <CCardBody className="p-4 h-100 d-flex flex-column">
              <div className="mb-3">
                <span className="badge bg-success mb-3">Live Course</span>

                <h2 className="fw-bold mb-3">React Master Course</h2>

                <p
                  className="text-medium-emphasis"
                  style={{
                    lineHeight: "1.8",
                  }}
                >
                  Learn React from beginner to advanced with real live
                  interactive classes. Build real projects and work directly
                  with the instructor.
                </p>
              </div>

              {/* Instructor */}
              <div
                className="d-flex align-items-center gap-3 mb-4"
                style={{
                  background: "#f8f9fa",
                  padding: "14px",
                  borderRadius: "14px",
                }}
              >
                <img
                  src="https://i.pravatar.cc/120?img=12"
                  alt="Instructor"
                  style={{
                    width: 65,
                    height: 65,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />

                <div>
                  <h6 className="fw-bold mb-1">John Doe</h6>

                  <div className="text-medium-emphasis small">
                    Senior Frontend Developer
                  </div>

                  <div className="small text-medium-emphasis">
                    8+ years experience
                  </div>
                </div>
              </div>

              {/* Bottom */}
              <div className="mt-auto d-flex justify-content-between align-items-center flex-wrap gap-3">
                <div>
                  <div className="text-medium-emphasis small">
                    Starting Price
                  </div>

                  <h3 className="fw-bold text-success mb-0">$49</h3>
                </div>

                <CButton
                  color="success"
                  size="lg"
                  style={{
                    borderRadius: "12px",
                    padding: "10px 20px",
                  }}
                >
                  Explore Classes
                </CButton>
              </div>
            </CCardBody>
          </CCol>
        </CRow>
      </CCard>

      {/* AVAILABLE CLASSES */}
      <div className="mb-4">
        <h3 className="fw-bold mb-1">Available Classes</h3>

        <p className="text-medium-emphasis">
          Choose the class schedule that fits you best
        </p>
      </div>
      {error && (
        <div className="text-center py-4">
          <p className="text-medium-emphasis">{error}</p>
        </div>
      )}

      {loading && (
        <div className="text-center py-4">
          <p className="text-medium-emphasis">Loading lessons...</p>
        </div>
      )}
      <CRow>
        {detalscourse?.map((item) => (
          <CCol md={6} lg={4} key={item._id} className="mb-4">
            <CCard
              className="h-100 border-0 shadow-sm"
              style={{
                borderRadius: "18px",
              }}
            >
              <CCardBody className="d-flex flex-column">
                {/* Top */}
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h5 className="fw-bold mb-1">{item?.className}</h5>

                    <div className="text-medium-emphasis small">
                      Live Interactive Class
                    </div>
                  </div>

                  <span className="badge bg-success">{item?.status}</span>
                </div>

                {/* Students */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between small mb-1">
                    <span>Seats</span>

                    <span>
                      {item?.currentStudents}/{item?.maxStudents}
                    </span>
                  </div>

                  <div
                    className="progress"
                    style={{
                      height: "8px",
                    }}
                  >
                    <div
                      className="progress-bar bg-success"
                      style={{
                        width: "60%",
                      }}
                    ></div>
                  </div>
                </div>

                {/* Schedule */}
                <div
                  className="small text-medium-emphasis mb-4"
                  style={{
                    lineHeight: "1.9",
                  }}
                >
                  <div>📅 Start Date: {item?.startDate}</div>

                  <div>⏳ End Date: {item?.endDate}</div>

                  <div>🗓 Schedule: {item?.schedule?.day}</div>

                  <div>
                    🕒 Time: {item?.schedule?.startTime}-
                    {item?.schedule?.endTime}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="text-medium-emphasis small">Class Price</div>

                  <h4 className="fw-bold text-success mb-0">{item?.price}đ</h4>
                </div>

                {/* Button */}
                <div className="mt-auto">
                  <CButton
                    color="success"
                    className="w-100"
                    style={{
                      borderRadius: "10px",
                    }}
                    onClick={() =>
                      payment(item.courseId._id, {
                        type: item?.courseId?.type,
                        classId: item?._id,
                      })
                    }
                  >
                    Buy This Class
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
        ))}
      </CRow>
    </div>
  );
};
export default DetailsCourse;
