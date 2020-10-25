import React, { useState } from 'react';
import { Form, Button, Alert } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";

import { connect, useSelector } from 'react-redux';

import MyFormInput from '../FormInput/FormInput';
import { userLogin } from '../../../Redux/auth/auth.thunk';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20,
        [theme.breakpoints.down('xs')]: {
            padding: "10px 5px",
        },
    },
    form: {
        textAlign: "right",
        direction: "rtl",
        border:"1.5px solid gray",
        padding: 10,
        borderRadius:10,
        [theme.breakpoints.down('xs')]: {
            width: "90%"
        },
        [theme.breakpoints.up('sm')]: {
            width: "50%",
            margin: 50,
        },
        [theme.breakpoints.up('md')]: {
            width: "30%",
            margin: 50,
        },
        [theme.breakpoints.up('lg')]: {
            width: "25%",
            margin: 50,
        },
    },
}))


function Login({ userLogin }) {
    // const myUser = useSelector(state => state.auth.token)
    // console.log(myUser);
    const classes = useStyles();

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
        <div className={classes.root}>
            <Form onSubmit={handleSubmit} className={classes.form}>
                <h1 className={'my-4'}>ورود</h1>
                {errors && errors.message ?
                    <Alert color="danger">{errors.message}</Alert> : null
                }
                <MyFormInput id='نام کاربری' value={userData.username} placeholder="نام کاربری خود را وارد کنید" onChange={handleChange} />
                <MyFormInput id='ایمیل' value={userData.email} type="email" placeholder="ایمیل خود را وارد کنید" onChange={handleChange} />
                <Button type='submit' color="primary" >ورود</Button>{' '}
                <Link to="/register"><Button type='button'>ثبت نام</Button></Link>
            </Form>
        </div>
    )
}

export default connect(null, { userLogin })(Login)
