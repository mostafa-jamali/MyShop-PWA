import React, { useState } from 'react';
import { Form, Button, Alert } from 'reactstrap';

import { connect, useSelector } from 'react-redux';

import FormInput from '../FormInput/FormInput';
import { userLogin } from '../../../Redux/auth/auth.thunk';

function Login({userLogin}) {
    // const myUser = useSelector(state => state.auth.token)
    // console.log(myUser);

    const errors = useSelector(state => state.auth.errors)
    const [userData, setUserDate] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDate({ ...userData, [name]: value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // const data = new FormData(e.target)
        userLogin(userData)
    }
    return (
        <div className="col-12 d-flex justify-content-center">
            <Form onSubmit={handleSubmit} className="col-8" style={{textAlign:"left"}}>
                <h1 className={'my-4'}>Sign In</h1>
                {errors && errors.message ?
                    <Alert color="danger">{errors.message}</Alert> : null
                }
                <FormInput id='username' value={userData.username} onChange={handleChange} />
                <FormInput id='email' value={userData.email} placeholder="email" onChange={handleChange} />
                <FormInput type={'password'} id='password' value={userData.password} onChange={handleChange} />
                <Button type='submit'>Login</Button>{' '}
                <Button type='reset'>Clear</Button> {' '}
                <Button>I don't hanve an account</Button>
            </Form>
        </div>
    )
}

export default connect(null, { userLogin })(Login)
