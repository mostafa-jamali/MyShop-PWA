import React, { useState, useEffect } from 'react';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import StoreIcon from '@material-ui/icons/Store';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Button from '@material-ui/core/Button';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { useParams } from 'react-router-dom';

import { api } from "../../WooCommerceRestApi/API"
import { Divider, Paper } from '@material-ui/core';
import './SingleProduct.css'
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#4f2e74",
        [theme.breakpoints.up('lg')]: {
            height: "100vh"
        },
    },
    information: {
        direction: "rtl"
    },
    Icons: {
        "&:hover": {
            cursor: "pointer",
        }
    },
    carousel: {
        backgroundColor: "white",
    },
    img: {
        maxWidth: "100%",
        maxHeight: "400px",
    },
    userComments: {
        cursor: "pointer",
        "&:hover": {
            boxShadow: "0px 0px 20px 3px gray"
        }
    }
}))

function SingleProduct() {
    let { id } = useParams()
    const classes = useStyles();

    const [newProduct, setNewProduct] = useState([]);
    const [ProductImg, setProductImg] = useState([]);
    const [productCategories, setProductCategories] = useState([]);
    useEffect(() => {
        api.get(`products/${id}`).then(
            res => {
                console.log(res.data);
                setNewProduct(res.data);
                setProductImg(res.data.images);
                setProductCategories(res.data.categories);
            })
    }, [])

    const createMarkup = (newProduct) => ({ __html: newProduct.price_html });

    return (
        <div className={`${classes.root} d-flex flex-column flex-xl-row justify-content-center align-items-center col-lg-12 pt-3 p-1 px-md-2 px-lg-3 py-sm-3 p-0`}>
            <div className={"col-12 col-sm-8 col-md-6 col-lg-6 col-xl-4 p-2 p-md-3 border rounded"}>
                <Carousel autoPlay={true} infiniteLoop showArrows={true} showThumbs={false} showStatus={false}>
                    {
                        ProductImg.map((item, index) =>
                            <div key={index} className={classes.carousel}>
                                <img className={classes.img} src={item.src} alt="" />
                            </div>
                        )
                    }
                </Carousel>
                <div className={"p-sm-2 mt-1 rounded bg-light"}>
                    <FavoriteIcon className={`${classes.Icons} mx-2`} color="action" />
                    <ShareIcon className={classes.Icons} color="action" />
                </div>
            </div>
            <div className={`${classes.information} col-12 col-sm-8 col-md-6 col-lg-6 col-xl-4  m-1 m-xl-5 pb-xl-3 border rounded bg-light`}>
                <div className={"mt-3 p-0 p-sm-1"}>
                    <div className={"px-sm-1 mt-3"}>
                        <p>{newProduct.name}</p>
                    </div>
                    <div>
                        {
                            newProduct.on_sale &&
                            <h4>پیشنهاد <span style={{ color: "red" }}>شگفت‌انگیز</span> </h4>
                        }
                    </div>
                </div>
                <Divider variant="middle" />
                <div className={`${classes.userComments} p-3 rounded`}>
                    <ChatBubbleIcon color="action" className={"mx-2"} />
                            نظرات کاربران
                </div>
                <Divider variant="middle" />
                <div className={"m-2"}>
                    <BookmarkIcon color="action" />
                    گارانتی اصالت و سلامت کالا
                    </div>
                <Divider variant="middle" />
                <div className={"m-2"}>
                    <div className={"my-3"}>
                        <StoreIcon color="action" />
                        فروش توسط <b>مای‌شاپ</b>
                    </div>
                    <div className="mx-auto rounded">
                        <h5><b><div dangerouslySetInnerHTML={createMarkup(newProduct)} style={{ fontFamily: "bYekan", margin: "20px 0px" }}></div></b></h5>
                        <Button variant="contained" color="primary" >
                            <AddShoppingCartIcon color="action" className={"mx-1"} />
                            افزودن به سبد خرید
                        </Button>
                    </div>
                </div>
                <div className={"p-2"}>
                    {productCategories.map((item, index) =>
                        <Button key={index} variant="contained" color="primary" className={"m-2"}>{item.name}</Button>
                    )}
                </div>
            </div>
        </div >
    )
}

export default SingleProduct
