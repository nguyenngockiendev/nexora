
import { useForm } from "react-hook-form";
import useForgotPassword from "../hooks/forgotpassword";
import FogotPassWordForm from "../components/ForgotPasswordForm";
import {Col, Container, Row}  from 'react-bootstrap'


const FogotPassword = () => {
  const { register, handleSubmit } = useForm();
  const { forgotpassword, error, status } = useForgotPassword();

  const onsubmit = async (data) => {
    try {
      const res = await forgotpassword(data);

      return res;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <Container>  
        <Row className="justify-content-center">
          <Col md={8}>
            <FogotPassWordForm 
            register={register}
            handleSubmit={handleSubmit}
            onsubmit={onsubmit}
            error={error}
            status={status}
             
            />
          </Col>
        </Row>
      </Container> 
    </div>
  );
};

export default FogotPassword;
