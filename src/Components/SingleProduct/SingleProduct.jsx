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

import { api } from "../../WooCommerceRestApi/API"
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {

    }
}))

function SingleProduct() {
    const classes = useStyles();

    const [newProduct, setNewProduct] = useState([]);
    const [ProductImg, setProductImg] = useState([]);
    const [productCategories, setProductCategories] = useState([]);
    const [relatedId, setRelatedId] = useState([])
    useEffect(() => {
        api.get(`products/677`).then(
            res => {
                console.log(res.data);
                setNewProduct(res.data);
                setProductImg(res.data.images);
                setProductCategories(res.data.categories);
                setRelatedId(res.data.related_ids)
            })
    }, [])

    const createMarkup = (newProduct) => ({ __html: newProduct.price_html });

    return (
        <div className={"col-12 col-sm-10 col-md-6 mx-auto py-sm-3 p-0"}>
            <Carousel autoPlay infiniteLoop showArrows={false} showThumbs={false} showStatus={false}>
                {
                    ProductImg.map((item, index) =>
                        <div key={index}>
                            <img src={item.src} alt="" />
                        </div>
                    )
                }
            </Carousel>
            <div className={"shadow p-0 p-sm-1"}>
                <div className={"pt-sm-2"}>
                    <Tooltip title="اشتراک گذاری">
                        <IconButton aria-label="share">
                            <ShareIcon color="action" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="منتخب">
                        <IconButton aria-label="favorite">
                            <FavoriteIcon color="action" />
                        </IconButton>
                    </Tooltip>
                </div>
                <div>
                    <p>{newProduct.name}</p>
                </div>
                <div>
                    {
                        newProduct.on_sale &&
                        <p>
                            <>پیشنهاد <span>شگفت‌انگیز</span></>
                        </p>
                    }
                </div>
            </div>
            <div className={"shadow"}>
                <Tooltip title="نظرات کاربران">
                    <IconButton aria-label="ChatBubble">
                        نظرات کاربران
                        <ChatBubbleIcon color="action" className={"mx-2"} />
                    </IconButton>
                </Tooltip>
            </div>
            <div className={"shadow py-2"}>
                گارانتی اصالت و سلامت کالا
                <Tooltip title="گارانتی">
                    <IconButton aria-label="ChatBubble">
                        <BookmarkIcon color="action" />
                    </IconButton>
                </Tooltip>
                <Divider variant="middle" />
                    فروش توسط دیجی کالا
                <Tooltip title="digikala">
                    <IconButton aria-label="ChatBubble">
                        <StoreIcon color="action" />
                    </IconButton>
                </Tooltip>
                <div className="mx-auto rounded">
                    <h5><div dangerouslySetInnerHTML={createMarkup(newProduct)}></div></h5>
                    <Button variant="contained" color="primary" >
                        افزودن به سبد خرید
                        <AddShoppingCartIcon color="action" className={"mx-1"} />
                    </Button>
                </div>
            </div>
            <div className={"p-2"}>
                {productCategories.map((item, index) =>
                    <Button key={index} variant="contained" color="primary" className={"m-2"}>{item.name}</Button>
                )}
            </div>
            <div>
                <div>محصولات مشابه</div>
                <div>
                    {
                        relatedId.map((item) =>
                            <>
                                {item}{'    '}
                            </>
                        )
                    }
                </div>
        </div>
        </div >
    )
}

export default SingleProduct
