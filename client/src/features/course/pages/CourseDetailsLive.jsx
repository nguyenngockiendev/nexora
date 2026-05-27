

// import {useParams} from "react-router-dom";

// import DetailsCourse from "../../features/components/CourseDetails";
// import { useDetailsCourse } from "../../features/hooks/useDetailsCourseClass";
// import usePayment from "../../features/hooks/usePayment";
// import { Col, Container, Row } from "react-bootstrap";
// const DetailsCourseLive = () => {
//   const { courseId } = useParams();
//   const { detalscourse, error, loading } = useDetailsCourse(courseId);
//   const {
//     payment,
//     error: errorPayment,
//     loading: paymentloading,
//   } = usePayment();
//   return (
//     <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
//       <Container>
//         <Row className="justify-content-center">
//           <Col md={12}>
//             <DetailsCourse
//               detalscourse={detalscourse}
//               error={error}
//               loading={loading}
//               payment={payment}
//               errorPayment={errorPayment}
//               paymentloading={paymentloading}
//             />
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default DetailsCourseLive;
