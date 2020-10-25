import React, { useState, useEffect } from 'react';
import { Form, Button } from 'reactstrap';
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import CheckCircleOutlineRoundedIcon from '@material-ui/icons/CheckCircleOutlineRounded';

import { connect } from 'react-redux';

import MyFormInput from '../FormInput/FormInput';
import { userRegister } from '../../../Redux/auth/auth.thunk';
import { api } from '../../../WooCommerceRestApi/API'

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
        border: "1.5px solid gray",
        padding: 10,
        borderRadius: 10,
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
    link: {
        color: "black",
        paddingRight: 10
    }
}))

function Register({ userRegister }) {
    const classes = useStyles();

    // const myUser = useSelector(state => state.auth.user)
    // console.log(myUser);
    useEffect(() => {
        api.get('customers', { per_page: 100, orderby: "id" }).then(res => {
            console.log(res.data);
        })
    }, [])

    const [userData, setUserDate] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDate({ ...userData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        userRegister(userData)
    }
    return (
        <div className={classes.root}>
            <Form onSubmit={handleSubmit} className={classes.form}>
                <h1 className={'my-4'}>ثبت نام</h1>
                <MyFormInput id='نام' name="first_name" value={userData.first_name} placeholder="نام خود را وارد کنید" onChange={handleChange} />
                <MyFormInput id='نام خانوادگی' name="last_name" value={userData.last_name} placeholder="نام خانوادگی خود را وارد کنید" onChange={handleChange} />
                <MyFormInput id='نام کاربری' name="username" value={userData.username} placeholder="نام کاربری خود را وارد کنید" onChange={handleChange} />
                <MyFormInput id='ایمیل' name="email" value={userData.email} type="email" placeholder="ایمیل خود را وارد کنید" onChange={handleChange} />
                <Button type='submit' color="primary">ثبت نام</Button>{' '}
                <Link to="/login" className={classes.link}>
                    <CheckCircleOutlineRoundedIcon />
                    قبلاً ثبت نام کرده‌ام!
                    </Link>
            </Form>
        </div>
    )
}

export default connect(null, { userRegister })(Register)
