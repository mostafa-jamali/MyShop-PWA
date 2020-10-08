import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup } from 'reactstrap';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Hidden from '@material-ui/core/Hidden';
import { connect } from 'react-redux';

import { increaseItemOfBasket, decreaseItemOfBasket, deleteBasket } from '../../Redux/Basket/Basket.action'

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        backgroundColor: '#f5f5f5',
        direction: "rtl",
        textAlign: "right",
        // padding: "20px 20px 100px",
        [theme.breakpoints.down('xs')]: {
            paddingTop: 0,
        },
    },
    baskets: {
        border: "2px solid white",
        [theme.breakpoints.down('xs')]: {
            padding: 10,
            borderRadius: 10,
            marginBottom: 10
        },
        [theme.breakpoints.up('sm')]: {
            padding: 10,
            borderRadius: 10,
            marginBottom: 10
        },
        [theme.breakpoints.up('md')]: {
            display: "flex",
            padding: 10,
            borderRadius: 10,
            margin: "10px 0px"
        },
        [theme.breakpoints.up('lg')]: {
            padding: 10,
            borderRadius: 10,
            margin: "10px 0px"
        },
    },
    img: {
        backgroundColor: "white",
        height: 300,
        [theme.breakpoints.down('xs')]: {
            width: "100%",
            height: "auto",
            padding: 5,
            margin: 0,
            borderRadius: "10px 10px 0px 0px",
        },
        [theme.breakpoints.up('sm')]: {
            width: "100%",
            height: "auto",
            padding: 10,
            margin: 0,
            borderRadius: "10px 10px 0px 0px",
        },
        [theme.breakpoints.up('md')]: {
            width: "50%",
            height: "auto",
            padding: 10,
            margin: 0,
            display: "flex",
            alignItems: "center",
            borderRadius: "0px 10px 10px 0px",
        },
        [theme.breakpoints.up('lg')]: {
            width: "40%",
            height: "auto",
            padding: 10,
            margin: 0,
            display: "flex",
            alignItems: "center",
            borderRadius: "0px 10px 10px 0px",
        },
    },
    info: {
        backgroundColor: "white",
        height: 300,
        fontFamily: "yekan",
        direction: "rtl",
        lineHeight: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start !important",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
            height: "auto",
            padding: 5,
            margin: "5px 0px",
            borderRadius: "0px 0px 10px 10px",
        },
        [theme.breakpoints.up('sm')]: {
            width: "100%",
            height: "auto",
            padding: 10,
            margin: "5px 0px 0px 0px",
            borderRadius: "0px 0px 10px 10px",
        },
        [theme.breakpoints.up('md')]: {
            width: "50%",
            height: "auto",
            padding: 10,
            margin: "0px 5px 0px 0px",
            display: "flex",
            alignItems: "center",
            borderRadius: "10px 0px 0px 10px",
        },
        [theme.breakpoints.up('lg')]: {
            width: "60%",
            height: "auto",
            padding: 10,
            margin: "0px 5px 0px 0px",
            display: "flex",
            alignItems: "center",
            borderRadius: "10px 0px 0px 10px",
        },
    },
    span: {
        fontFamily: "bYekan"
    },
    p: {
        fontFamily: "yekan",
        lineHeight: "20px",
        margin: 0,
        direction: "rtl"
    },
    h5: {
        [theme.breakpoints.down('xs')]: {
            fontSize: "16px"
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: "17px"
        },
        [theme.breakpoints.up('md')]: {
            fontSize: "18px"
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: "20px"
        },
    },
    h4: {
        [theme.breakpoints.down('xs')]: {
            // fontSize: "16px",
            // position:"absolute",
            // marginTop:"45px",
            display:"none"
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: "19px"
        },
        [theme.breakpoints.up('md')]: {
            fontSize: "22px"
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: "25px"
        },
    },
    noProduct: {
        [theme.breakpoints.down('xs')]: {
            fontSize: "14px",
            position:"absolute",
            marginTop:"45px",
        },
        [theme.breakpoints.up('sm')]: {
            fontSize: "17px"
        },
        [theme.breakpoints.up('md')]: {
            fontSize: "19px"
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: "22px"
        },
    },
    count: {
        display: "flex",
        backgroundColor: "yellow",
        margin: "10px"
    },
    countP: {
        width: "50px",
        marginBottom: "0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "bYekan",
        fontSize: "25px"
    },
    Link: {
        position: "fixed",
        zIndex: "1000",
        direction:"initial",
        "&:hover": {
            textDecoration: "none",
            color: "white"
        },
        [theme.breakpoints.down('sm')]: {
            backgroundColor: "#ff1f51",
            width: "100vW",
            height: "20px",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "20px",
            color: "white"
        },
    },
    pageName: {
        marginBottom: "0px",
        fontSize: "20px",
        direction: "rtl",
        textAlign: "right",
        padding: "10px 20px 0px 0px",
        color: "black",
        [theme.breakpoints.down('xs')]: {
            fontSize: "15px",
            padding: "0px 5px",
        },
    }
}));

function Basket({ basketList, increaseItemOfBasket, decreaseItemOfBasket, deleteBasket }) {
    const classes = useStyles();
    const createMarkup = (htmlresponse) => ({ __html: htmlresponse.description });


    const counterPlus = (ProductId) => {
        increaseItemOfBasket(ProductId); //increaseItemOfBasket coming from redux
    };
    const counterMinus = (ProductId) => {
        const basketProduct = basketList.find(item => item.id == ProductId)//basketList coming from redux
        if (basketProduct.counter > 1) {
            decreaseItemOfBasket(ProductId);//decreaseItemOfBasket coming from redux
        } else {
            deleteBasket(ProductId)//deleteBasket coming from redux
        }
    };

    const allRegularPrice = (item) => item.regular_price * item.counter
    const allSalePrice = (item) => item.sale_price * item.counter
    return (
        <div className={classes.root}>
            <Hidden smUp>
                <Link to="/" className={classes.Link}><p className={classes.pageName}>سبد خرید</p><ArrowForwardIcon /></Link>
            </Hidden>
            <h4 className={classes.h4}>محصولات موجود در سبد خرید</h4>
            <div>
                {
                    basketList.length >= 1 ?
                        basketList.map((item, index) =>
                            <div key={index} className={`${classes.baskets}`}>
                                <div className={`${classes.img}`}>
                                    <Link to={`/product/${item.id}`}>
                                        <img className={"col-12"} style={{ maxHeight: "400px" }} src={item.images[0].src} />
                                    </Link>
                                </div>
                                <div className={`${classes.info}`}>
                                    <h5 className={`${classes.h5}`}>{item.name}</h5><br />
                                    <span className={classes.p}><div dangerouslySetInnerHTML={createMarkup(item)}></div></span><br />
                                    <span className={classes.span}> امتیاز: <b>{item.average_rating}/5.00</b></span><br />
                                    <span className={classes.span}>قیمت اصلی: <b>{item.regular_price}{" "}تومان</b></span><br />
                                    <span className={classes.span}>قیمت با تخفیف: {
                                        item.on_sale ?
                                            <b>{item.sale_price}{" "}تومان</b>
                                            : "-"
                                    }</span>

                                    <div className={classes.count}>

                                        <Button onClick={() => counterPlus(item.id)}>+</Button>
                                        <p className={classes.countP}>{item.counter}</p>
                                        <Button onClick={() => counterMinus(item.id)}>-</Button>
                                    </div>
                                    <span className={classes.span}>قیمت کل سفارش:{" "}
                                        <b>
                                            {
                                                !item.sale_price ?
                                                    allRegularPrice(item)
                                                    :
                                                    allSalePrice(item)
                                            }
                                        </b>
                                        {" "}تومان
                                </span>
                                </div>
                            </div>
                        )
                        :
                        <p className={classes.noProduct}>هیچ محصولی در سبد خرید وجود ندارد</p>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        basketList: state.basketList.basket_list,
    }
}
export default connect(mapStateToProps, { increaseItemOfBasket, decreaseItemOfBasket, deleteBasket })(Basket);
