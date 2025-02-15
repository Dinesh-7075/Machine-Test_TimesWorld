import React, { useState } from 'react'
import { Button, Form, Row, Col, Container } from 'react-bootstrap';
import image1 from "../image1.png";
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [pwdError, setPwdError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setEmailError('Invalid email address');
            return;
        }
        if (!validatePassword(password)) {
            setPwdError('Invalid password');
            return;
        }
        else {
            setEmailError('');
            setPwdError('');
            setEmail('');
            setPassword(''); 
            navigate('/home');
        }
    }
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
      
    function validatePassword(password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
        return passwordRegex.test(password);
    }
    return (
        <Container className="ml-5 container">
            <Row className="justify-content-center">
                <Col md={6} lg={4} xl={8}> 
                    <div className='d-flex justify-content-between align-items-center gap-5'>
                        <div style={{width:"280px"}}>
                        <div className='mb-3'>
                            <h4 style={{ fontSize: '32px', fontWeight: "700" }}>Sign In</h4>
                        </div>
                        <div className='d-flex flex-row mb-4 align-items-center gap-2'>
                            <span className='font-weight-normal'>New user?</span>
                            <a className='text-primary'>Create an account</a>
                        </div>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail" onChange={(e) => setEmail(e.target.value)}>
                                <Form.Control style={{border: "2px solid #3E3E3E"}} className='rounded-0' type="email" placeholder="Username or email" />
                                {emailError && <Form.Text  className="text-danger">
                                    Enter valid email address
                                </Form.Text>}
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(e) => setPassword(e.target.value)}>
                                <Form.Control style={{border: "2px solid #3E3E3E"}} className='rounded-0' type="password" placeholder="Password" />
                                {pwdError && <Form.Text  className="text-danger">
                                    Enter valid password
                                </Form.Text>}
                            </Form.Group>
                            <Form.Group className="mb-3 mw-100 mh-100 ml-3" controlId="formBasicCheckbox">
                                <Form.Check className='checkBox'  type="checkbox"  label="Keep me signed in" />
                            </Form.Group>
                            <Button className='rounded-0' style={{width:"280px", height:"44px", backgroundColor:"#3C3C3C", border:"none"}} type="submit" onClick={(e) => handleSubmit(e)}>
                            Sign In
                            </Button>
                        </Form>
                        <div className="d-flex flex-row items-center align-items-center gap-2 mt-3"> 
                            <hr style={{width:"25%"}} className=" border-3 border-dark" />
                            <p style={{width:"50%", fontWeight: "600"}} className="text-center mt-2 mb-2">Or Sign In with</p>
                            <hr style={{width:"25%"}} className="border-3 border-dark" />
                        </div>
                        <div className="mt-2 d-flex justify-content-evenly"> {/* Added margin top for spacing */}
                            <Button variant="secondary" className="mx-2 rounded-circle"><i className="bi bi-google"></i></Button> {/* Example: Google */}
                            <Button variant="secondary" className="mx-2 rounded-circle"><i className="bi bi-facebook"></i></Button> {/* Example: Facebook */}
                            <Button variant="secondary" className="mx-2 rounded-circle"><i className="bi bi-linkedin"></i></Button> {/* Example: LinkedIn */}
                            <Button variant="secondary" className="mx-2 rounded-circle"><i className="bi bi-twitter"></i></Button> {/* Example: Twitter */}
                        </div>
                        </div>
                        <div className='imgContainer'>
                            <img src={image1} />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage;