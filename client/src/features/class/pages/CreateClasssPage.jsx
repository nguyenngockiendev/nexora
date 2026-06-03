import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";
import CreateClassForm from "../components/CreateClassForm";
import useCreateClass from "../hooks/useCreateClass";
import useUpdateClass from "../hooks/useUpdataclass";

const CreateClass = () => {
  const { courseId } = useParams();
  const { classId } = useParams();
  const location = useLocation();
  const classsdata = location?.state?.data;
  const { notification, Create, loading } = useCreateClass();

  const {
    notification: classnotification,
    Update,
    loading: classloading,
  } = useUpdateClass();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  useEffect(() => {
    if (classsdata) {
      reset({
        Classname: classsdata.className,
        Description: classsdata.description,
        Studentsnumber: classsdata.maxStudents,
        Dealine: classsdata.registerDeadline?.split("T")[0],
        Meetinglink: classsdata.meetingLink,

        Day: classsdata?.schedule?.day,
        Starttime: classsdata?.schedule?.startTime,
        Endtime: classsdata?.schedule?.endTime,

        Startdate: classsdata.startDate?.split("T")[0],
        Enddate: classsdata.endDate?.split("T")[0],
        Price: classsdata?.price,
      });
    }
  }, [classsdata]);
  const onUpdate = async (data) => {
    try {
      const result = await Update(data, classId);
      if (result) {
        toast.success("Update successfuly!");
        navigate("/my/class");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await Create(data, courseId);

      toast.success(notification || "Create class successfully!");
      navigate("/my/class");
      return;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={12}>
            <CreateClassForm
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={classsdata ? onUpdate : onSubmit}
              loading={loading}
              notification={notification}
              classsdata={classsdata}
              navigate={navigate}
              classloading={classloading}
              classnotification={classnotification}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateClass;
