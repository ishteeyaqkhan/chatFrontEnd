import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { object, string } from 'yup';
import "./login.css";

let userSchema = object({

    email: string().required(),
    password: string()
        .required('No password provided.')
});
const Login = () => {

    const ivalue = {
        email: "",
        password: ""
    }
    const { errors, handleChange, handleSubmit } = useFormik({
        onSubmit: async (value, action) => {
            try {
                action.setSubmitting(true)
                let res = await axios.post("http://localhost:4000/api/login", value)
                debugger
                action.setSubmitting(false)
            } catch (error) {
                action.setSubmitting(false)
                debugger
                console.log(error)
            }
        },
        validationSchema: userSchema,
        validateOnChange: false,
        initialValues: ivalue
    })
    return (
        <div className="d-flex justify-content-center mt-5 ">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={handleChange} name="email" type="email" placeholder="Enter email" />
                    <p className='text-danger'>{errors?.email}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={handleChange} name="password" placeholder="Password" />
                    <p className='text-danger'>{errors?.password}</p>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Login