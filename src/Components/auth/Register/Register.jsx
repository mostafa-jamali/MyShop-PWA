import React, { useState, useEffect } from 'react';
import { Form, Button } from 'reactstrap';
import { useSelector } from 'react-redux'
import { connect } from 'react-redux';

import FormInput from '../FormInput/FormInput';
import { userRegister } from '../../../Redux/auth/auth.thunk';
import { api } from '../../../WooCommerceRestApi/API'

function Register({ userRegister }) {

    // const myUser = useSelector(state => state.auth.user)
    // console.log(myUser);
    // useEffect(() => {
    //     api.get('customers', { per_page: 100, orderby: "id" }).then(res => {
    //         console.log(res.data);
    //     })
    // }, [])

    const [userData, setUserDate] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDate({ ...userData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // const data = new FormData(e.target)
        userRegister(userData)
    }
    return (
        <div className="col-12 d-flex justify-content-center">
            <Form onSubmit={handleSubmit} className="col-8" style={{ textAlign: "left" }}>
                <h1 className={'my-4'}>Register</h1>
                <FormInput id='first_name' value={userData.first_name} placeholder="first name" onChange={handleChange} />
                <FormInput id='last_name' value={userData.last_name} placeholder="last name" onChange={handleChange} />
                <FormInput id='username' value={userData.username} placeholder="username" onChange={handleChange} />
                <FormInput id='email' value={userData.email} placeholder="email" onChange={handleChange} />
                <FormInput type={'password'} id='password' placeholder="password" value={userData.password} onChange={handleChange} />
                <FormInput type={'password'} id='password2' placeholder="password2" value={userData.password2} onChange={handleChange} />
                <Button type='submit'>Register</Button>{' '}
                <Button type='reset'>Clear</Button> {' '}
                <Button>Already hava an account!</Button>
            </Form>
        </div>
    )
}

export default connect(null, { userRegister })(Register)
