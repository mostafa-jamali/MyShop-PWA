import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Hidden from '@material-ui/core/Hidden';
import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

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
    allPage: {
        // position: "fixed",
    },
    contain: {
        disply: "flex",
        [theme.breakpoints.down('xs')]: {
            flexDirection: "column"
        },
        [theme.breakpoints.up('sm')]: {
            flexDirection: "column"
        },
        [theme.breakpoints.up('md')]: {
            flexDirection: "column"
        },
        [theme.breakpoints.up('lg')]: {
            display: "flex",
            flexDirection: "row"
        },
    },
    rightSide: {
        [theme.breakpoints.down('xs')]: {
            width: "100%"
        },
        [theme.breakpoints.up('sm')]: {
            width: "100%"
        },
        [theme.breakpoints.up('md')]: {
            width: "100%"
        },
        [theme.breakpoints.up('lg')]: {
            width: "70%"
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
            width: "30%",
            height: "auto",
            padding: 10,
            margin: 0,
            display: "flex",
            alignItems: "center",
            borderRadius: "0px 10px 10px 0px",
        },
        [theme.breakpoints.up('lg')]: {
            width: "30%",
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
        color: "#757272",
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
            margin: "1px 0px",
            borderRadius: "0px 0px 10px 10px",
        },
        [theme.breakpoints.up('sm')]: {
            width: "100%",
            height: "auto",
            padding: 10,
            margin: "1px 0px 0px 0px",
            borderRadius: "0px 0px 10px 10px",
        },
        [theme.breakpoints.up('md')]: {
            width: "70%",
            height: "auto",
            padding: 10,
            margin: "0px 1px 0px 0px",
            display: "flex",
            alignItems: "center",
            borderRadius: "10px 0px 0px 10px",
        },
        [theme.breakpoints.up('lg')]: {
            width: "70%",
            height: "auto",
            padding: 10,
            margin: "0px 1px 0px 0px",
            display: "flex",
            alignItems: "center",
            borderRadius: "10px 0px 0px 10px",
        },
    },
    span: {
        fontFamily: "bYekan"
    },
    allPrice: {
        color: "#383737",
        fontFamily: "bYekan"
    },
    p: {
        fontFamily: "bYekan",
        lineHeight: "20px",
        margin: 0,
        direction: "rtl"
    },
    h5: {
        fontFamily:"bYekan",
        color: "#383737",
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
            display: "none"
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
            position: "absolute",
            marginTop: "45px",
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
        border: "1px solid #e0dbdb",
        margin: "10px",
        borderRadius: 10,
        color: "black !important",
    },
    buttonCount: {
        width: 33,
        height: 33,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: 20,
        "&:hover": {
            fontSize: 25,
        }
    },
    countP: {
        width: "30px",
        color: "#02aaff",
        marginBottom: "0px",
        borderRight: "1px solid #e0dbdb",
        borderLeft: "1px solid #e0dbdb",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "bYekan",
        fontSize: "22px"
    },
    Link: {
        position: "fixed",
        zIndex: "1000",
        direction: "initial",
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
    },
    infoAllProducts: {
        height: 330,
        border: "2px solid white",
        borderRadius: 10,
        backgroundColor: "white",
        padding: 10,
        [theme.breakpoints.down('xs')]: {
            width: "100%"
        },
        [theme.breakpoints.up('sm')]: {
            width: "60%"
        },
        [theme.breakpoints.up('md')]: {
            width: "50%"
        },
        [theme.breakpoints.up('lg')]: {
            width: "30%"
        },
    },
    payButton: {
        width: "60%"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "yekan"
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        direction: "rtl",
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

function Basket({ basketList, increaseItemOfBasket, decreaseItemOfBasket, deleteBasket }) {
    const classes = useStyles();
    const createMarkup = (htmlresponse) => ({ __html: htmlresponse.description });

    const discountPercent = (item) => {
        if (item.on_sale) {
            return Math.round((item.regular_price - item.sale_price) * 100 / item.regular_price)
        } else {
            return 0
        }
    }
    const [motori, setMotori] = useState(15000);
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


    const priceProduct = (item) => {
        if (item.on_sale) {
            return item.sale_price * item.counter
        } else {
            return item.regular_price * item.counter
        }
    }
    const pricePay = () => {
        return basketList.reduce((sum, item) =>
            priceProduct(item) + sum, 0) + motori
    }

    // for modal pricePay
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <Hidden smUp>
                <Link to="/" className={classes.Link}><p className={classes.pageName}>سبد خرید</p><ArrowForwardIcon /></Link>
            </Hidden>
            <div className={`p-1 pt-4 p-sm-3 p-md-3 pt-md-4 p-lg-5 ${classes.allPage}`}>
                <h4 className={classes.h4}>سبد خرید</h4>
                <Divider className={`mb-4`} />
                <div className={`${classes.contain}`}>
                    <div className={`${classes.rightSide}`}>
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
                                            <span className={classes.span}> درصد تخفیف: <b>{discountPercent(item)}{" "}%</b></span><br />
                                            <span className={classes.span}>قیمت با تخفیف: {
                                                item.on_sale ?
                                                    <b>{item.sale_price}{" "}تومان</b>
                                                    : "-"
                                            }</span>

                                            <div className={classes.count}>
                                                <div className={classes.buttonCount} onClick={() => counterPlus(item.id)}>+</div>
                                                <p className={classes.countP}>{item.counter}</p>
                                                <div className={classes.buttonCount} onClick={() => counterMinus(item.id)}>-</div>
                                            </div>
                                            <span className={classes.allPrice}>قیمت کل سفارش:{" "}
                                                <b style={{ color: "#02aaff" }}>
                                                    {priceProduct(item)}
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
                    <div className={`m-xl-2 ${classes.infoAllProducts}`}>
                        <h3 className={"mb-4"}>اطلاعات خرید {""}</h3>
                        <p style={{ fontFamily: "bYekan" }}>تعداد کالاها: <span style={{ fontSize: "25px", color: "#02aaff" }}>{basketList.length}</span></p>
                        <Divider className={"my-3"} />
                        <p style={{ fontFamily: "bYekan" }}>هزینه پیک موتوری : {motori} تومان</p>
                        <Divider className={"my-3"} />
                        <p>مبلغ قابل پرداخت : <span style={{ fontFamily: "bYekan", color: "#02aaff", fontSize: "25px" }}>{pricePay()}</span> تومان</p>
                        <Divider className={"my-3"} />
                        <div className={`d-flex justify-content-center`}>
                            <Button variant="contained" color="secondary" className={classes.payButton} onClick={handleOpen}> پرداخت</Button>
                            {/* modal for pricePay*/}
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                className={classes.modal}
                                open={open}
                                onClose={handleClose}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={open}>
                                    <div className={classes.paper}>
                                        <div>
                                            <SentimentVeryDissatisfiedIcon fontSize="large" style={{ marginBottom: "25px" }} />
                                            <SentimentVeryDissatisfiedIcon fontSize="large" style={{ marginBottom: "25px" }} />
                                            <SentimentVeryDissatisfiedIcon fontSize="large" style={{ marginBottom: "25px" }} />
                                        </div>
                                        <p id="transition-modal-description">متأسفانه در حال حاضر این قابلیت در دسترس نمیباشد.</p>
                                    </div>
                                </Fade>
                            </Modal>
                        </div>
                    </div>
                </div>
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
