import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { toast } from "react-toastify";
import useUserRegister from "../hooks/useregister";
import RegisterForm from "../components/RegisterForm";
import { Col, Container, Row } from "react-bootstrap";
const Register = () => {
  const { register, handleSubmit } = useForm();
  const { registers, error, loading } = useUserRegister();
  const [avatar, Setavatar] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("repeatpassword", data.repeatpassword);
      formData.append("role", data.role);
      formData.append("avatar", avatar);
      const result = await registers(formData);

      if (result) {
        toast.success(result.message || "Register successfully");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md={9} lg={7} xl={6}>
            <RegisterForm
              register={register}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              error={error}
              navigate={navigate}
              Setavatar={Setavatar}
              loading={loading}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
