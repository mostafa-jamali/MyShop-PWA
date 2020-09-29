import React, { useState, useEffect } from 'react';
import { api } from "../../WooCommerceRestApi/API"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import { Link } from "react-router-dom";

import LoadingComponent from '../LoadingComponent/LoadingComponent'
import './CardProducts.css'


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        direction: "rtl",
        textAlign: "right",
        padding: "10px 30px",
        border: "2px solid gray",
        borderRadius: "30px",
    },
    NewestClass: {
        backgroundColor: "#7944ff"
    },
    SuggestionClass: {
        backgroundColor: "#4aff52"
    },
    pTag: {
        marginBottom: 0
    },
    aTag: {
        color: "blue",
        marginBottom: 0,
        "&:hover": {
            textDecoration: "none",
            cursor: "pointer"
        }
    },
    card: {
        minWidth: 200,
        maxWidth: 201,
        height: 300,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        "&:hover": {
            boxShadow: "0px 0px 20px 8px gray"
        }
    },
    CardActionArea: {
        height: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: theme.spacing(1),
        "&:hover": {
            color: "black",
            textDecoration: "none"
        }
    },
    CardActionAreaImage: {
        width: "80%",
        height: 180,
        display: "flex",
        alignItems: "center"
    },
    cardFooter: {
        fontFamily: "bYekan",
        direction: "rtl",
        textAlign: "left"
    },
    allCards: {
        display: "flex",
        direction: "rtl",
        overflowX: "scroll",
        '&::-webkit-scrollbar': {
            height: '0.6em'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'slategrey',
            borderRadius: "10px",
        }
    },
    CardContent: {
        padding: 0,
        textAlign: "center",
    },
    newestLabel: {
        display: "flex",
        justifyContent: "space-between",
        padding: `0px ${theme.spacing(2)}px`,
        backgroundColor: "#f2ff8c",
        border: "0.5px solid blue",
        borderRadius: "15px"
    },
}));

function Suggestion({ componentName }) {

    const classes = useStyles();
    const [product, setProduct] = useState([]);
    const [runComponent, setRunComponent] = useState(componentName);
    const [pending, setPending] = useState(true);

    const createMarkup = (htmlresponse) => ({ __html: htmlresponse.price_html });

    useEffect(() => {
        api.get("products", runComponent === "Suggestion" ? { per_page: 15 } : { per_page: 100 }).then(
            res => {
                setProduct(res.data);
                console.log(res.data);
                setPending(false);
            }
        )
    }, [])

    return (
        <div className={`${classes.root} ${runComponent === "Newest" ? classes.NewestClass : classes.SuggestionClass}`} >
            <div className={classes.newestLabel}>
                {runComponent === "Suggestion" &&
                    <>
                        <h5 className={classes.pTag}>
                            <>پیشنهاد <span style={{fontFamily: "SignPainterHouse", color: "red"}}>شگفت‌انگیز</span></>
                        </h5>
                        <a className={`${classes.aTag}`}>لیست کامل</a>
                    </>
                }
                {runComponent === "HighestScore" &&
                    <>
                        <h5 className={classes.pTag}>پرامتیازترین</h5>
                        <a className={`${classes.aTag}`}>لیست کامل</a>
                    </>
                }
                {runComponent === "Newest" &&
                    <>
                        <h5 className={classes.pTag}>جدیدترین</h5>
                        <a className={`${classes.aTag}`}>لیست کامل</a>
                    </>
                }
            </div>
            <div className={classes.allCards}>
                {
                    pending ?
                        <LoadingComponent />
                        :
                        product.map(item =>
                            ((item.on_sale && runComponent === "Suggestion")
                                || ((item.average_rating >= 3) && runComponent === "HighestScore")
                                || ((parseInt(((new Date().getTime() - new Date(item.date_modified).getTime())) / 1000000) <= +20000) && runComponent === "Newest"))
                            &&
                            <Card key={item.id} className={classes.card} variant="outlined" >
                                <CardActionArea className={classes.CardActionArea} component={Link} to={`/product/${item.id}`}>
                                    <div className={classes.CardActionAreaImage}>
                                        <img style={{ width: "80%" }} src={item.images[0].src} />
                                    </div>
                                    <CardContent className={classes.CardContent}>
                                        <Typography gutterBottom component="p" >
                                            {item.name}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <Divider />
                                <CardActions className={classes.cardFooter}>
                                    <div dangerouslySetInnerHTML={createMarkup(item)}></div>
                                </CardActions>
                            </Card>
                        )
                }
            </div>
        </div >
    )
}

export default Suggestion
