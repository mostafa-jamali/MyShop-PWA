import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup } from 'reactstrap';
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        backgroundColor: '#f5f5f5',
        direction: "rtl",
        textAlign: "right",
        padding: "20px 20px 100px",
        [theme.breakpoints.down('xs')]: {
            paddingTop: 20,
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
            fontSize: "16px"
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
    }
}));

function Basket({ basketList }) {
    const classes = useStyles();
    const createMarkup = (htmlresponse) => ({ __html: htmlresponse.description });

    const [counter, setCounter] = useState({ countId: 1, count: 1 });
    const countMinus = (id) => {
        basketList.filter((item) => item.id == id ? setCounter([...counter, { countId: id, count: counter.count - 1 }])
            : setCounter([...counter])
        )
    };
    const countPlus = (id) => {
        setCounter([...counter, { countId: id, count: counter.count + 1 }])
    };
    const allRegularPrice = (item) => item.regular_price * counter.count
    const allSalePrice = (item) => item.sale_price * counter.count
    return (
        <div className={classes.root}>
            <h4 className={classes.h4}>محصولات موجود در سبد خرید</h4>
            <div className={""}>
                {
                    basketList.map((catProducts, index) =>
                        <div key={index} className={`${classes.baskets}`}>
                            <div className={`${classes.img}`}>
                                <Link to={`/product/${catProducts.id}`}>
                                    <img className={"col-12"} style={{ maxHeight: "400px" }} src={catProducts.images[0].src} />
                                </Link>
                            </div>
                            <div className={`${classes.info}`}>
                                <h5 className={`${classes.h5}`}>{catProducts.name}</h5><br />
                                <span className={classes.p}><div dangerouslySetInnerHTML={createMarkup(catProducts)}></div></span><br />
                                <span className={classes.span}> دسته‌بندی: <b>{catProducts.categories[0].name}</b></span><br />
                                <span className={classes.span}> امتیاز: <b>{catProducts.average_rating}/5.00</b></span><br />
                                <span className={classes.span}>قیمت اصلی: <b>{catProducts.regular_price}</b>{" "}تومان</span><br />
                                <span className={classes.span}>قیمت با تخفیف: {
                                    catProducts.on_sale ?
                                        <b>{catProducts.sale_price}{" "}تومان</b>
                                        : "-"
                                }</span>

                                <div className={classes.count}>
                                    <Button onClick={() => countPlus(catProducts.id)}>+</Button>
                                    <p className={classes.countP}>{counter.count}</p>
                                    <Button onClick={() => countMinus(catProducts.id)}>-</Button>
                                </div>
                                <span className={classes.span}>قیمت کل سفارش:{" "}
                                    <b>
                                        {
                                            !catProducts.sale_price ?
                                                allRegularPrice(catProducts)
                                                :
                                                allSalePrice(catProducts)
                                        }
                                    </b>
                                    {" "}تومان
                                </span>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        basketList: state.basketList.basket_list,
    }
}
export default connect(mapStateToProps, {})(Basket);
