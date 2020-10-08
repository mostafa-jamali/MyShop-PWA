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
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Hidden from '@material-ui/core/Hidden';
import { useParams } from 'react-router-dom';
import { Divider } from '@material-ui/core';
import { useHistory } from "react-router-dom";

//react-share icon
import { TelegramShareButton } from "react-share";

import { api } from "../../WooCommerceRestApi/API"
import LoadingComponent from '../LoadingComponent/LoadingComponent'
// redux
import { connect } from 'react-redux';
import { useSelector } from 'react-redux'
import { addBasket } from '../../Redux/Basket/Basket.action';
import { addFavorite, deleteFavorite } from '../../Redux/Favorites/Favorites.action'


const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#4f2e74",
        position: "relative",
        [theme.breakpoints.down('xs')]: {
            marginTop: "35px"
        },
        [theme.breakpoints.up('lg')]: {
            height: "100vh"
        },
    },
    information: {
        direction: "rtl"
    },
    FavoriteIcon: {
        "&:hover": {
            cursor: "pointer",
        }
    },
    FavoriteStyle: {
        color: "red !important"
    },
    unfavorite: {

    },
    ShareIcon: {
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
    },
    Link: {
        position: "fixed",
        zIndex: "1000",
        top: 0,
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
            color: "white",
        },
    }
}))

function SingleProduct({ basketList, addBasket, addFavorite, deleteFavorite }) {
    let history = useHistory();

    let { id } = useParams() //id coming from router
    const myFavorite = useSelector(state => state.favoriteList.favorite_list.find(item => item.id == id)) //myFavorite coming from redux
    const classes = useStyles();

    const [newProduct, setNewProduct] = useState({ images: [], categories: [] });
    const [pending, setPending] = useState(true);

    const changeFavorite = (product) => {
        !myFavorite && addFavorite({ ...product, favStatus: true }); //addFavorite coming from redux
        myFavorite && deleteFavorite(product.id); // deleteFavorite coming from redux
    }
    useEffect(() => {
        api.get(`products/${id}`).then(
            res => {
                setNewProduct(res.data);
                setPending(false);
            })
    }, [])

    const handleAddBasket = (product) => {
        const basketProduct = basketList.find(item => item.id == product.id)
        if (!basketProduct) {
            addBasket({ ...product, counter: 1 })
        }
    }

    return (
        <React.Fragment>
            <Hidden smUp>
                <Link to="/" className={classes.Link}>بازگشت<ArrowForwardIcon /></Link>
            </Hidden>
            {
                pending ?
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 40 }}>
                        <LoadingComponent />
                    </div>
                    :
                    <div className={`${classes.root} d-flex flex-column flex-xl-row justify-content-center align-items-center col-lg-12 pt-3 p-1 px-md-2 px-lg-3 py-sm-3 p-0`}>
                        <div className={"col-12 col-sm-8 col-md-6 col-lg-6 col-xl-4 p-2 p-md-3 border rounded"}>
                            <Carousel autoPlay={true} infiniteLoop showArrows={true} showThumbs={false} showStatus={false}>
                                {
                                    newProduct.images.map((item, index) =>
                                        <div key={index} className={classes.carousel}>
                                            <img className={classes.img} src={item.src} alt="" />
                                        </div>
                                    )
                                }
                            </Carousel>
                            <div className={"p-sm-2 mt-1 rounded bg-light"}>
                                <FavoriteIcon className={`${classes.FavoriteIcon} mx-2 ${myFavorite ? `${classes.FavoriteStyle}` : `${classes.unFavorite}`}`}
                                    onClick={() => changeFavorite(newProduct)} color="action" />
                                <TelegramShareButton url={`/product/${newProduct.id}`} >
                                    <ShareIcon className={classes.ShareIcon} size={25} round={true} color="action" ></ShareIcon>
                                </TelegramShareButton>
                            </div>
                        </div>
                        <div className={`${classes.information} col-12 col-sm-8 col-md-6 col-lg-6 col-xl-4  m-1 m-xl-5 pb-xl-3 border rounded bg-light`}>
                            <div className={"mt-3 p-0 p-sm-1"}>
                                <div className={"px-sm-1 mt-3"}>
                                    <h5><b>{newProduct.name}</b></h5>
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
                                    <h5><b>
                                        {
                                            !newProduct.sale_price ?
                                                <div style={{ fontFamily: "bYekan", margin: "20px 0px" }}>
                                                    <br />
                                                    {newProduct.regular_price}تومان
                                                </div>
                                                :
                                                <div style={{ fontFamily: "bYekan", margin: "20px 0px" }}>
                                                    <del>{newProduct.regular_price}{" "}تومان</del><br />
                                                    {newProduct.sale_price}{" "}تومان
                                                </div>
                                        }
                                    </b></h5>
                                    <Button variant="contained" color="primary" onClick={() => handleAddBasket(newProduct)} >
                                        <AddShoppingCartIcon color="action" className={"mx-1"} />
                                        افزودن به سبد خرید
                                        </Button>
                                </div>
                            </div>
                        </div>
                    </div >
            }
        </React.Fragment>
    )
}
const mapStateToProps = (state) => {
    return {
        basketList: state.basketList.basket_list,
    }
}
export default connect(mapStateToProps, { addBasket, addFavorite, deleteFavorite })(SingleProduct);