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
        borderRadius: "10px",
        [theme.breakpoints.down('xs')]: {
            margin: theme.spacing(1),
            padding: "7px 10px",
        },
    },
    NewestClass: {
        backgroundColor: "#7944ff"
    },
    SuggestionClass: {
        backgroundColor: "#4aff52"
    },
    pTag: {
        marginBottom: 0,
        [theme.breakpoints.down('xs')]: {
            fontSize: "12px",
            margin: "5px 0px"
        },
    },
    aTag: {
        color: "blue",
        marginBottom: 0,
        "&:hover": {
            textDecoration: "none",
            cursor: "pointer"
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: "12px",
            margin: "5px 0px"
        },
    },
    card: {
        minWidth: 200,
        maxWidth: 201,
        height: 300,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        "&:hover": {
            boxShadow: "0px 0px 20px 8px gray"
        },
        [theme.breakpoints.down('xs')]: {
            minWidth: 120,
            maxWidth: 121,
            height: 200,
        },
    },
    CardActionArea: {
        height: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: theme.spacing(1),
        "&:hover": {
            color: "black",
            textDecoration: "none"
        }
    },
    CardActionAreaImage: {
        // width: "80%",
        height: 180,
        zIndex: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "centeer",
        [theme.breakpoints.down('xs')]: {
            height: 110,
        },
    },
    cardFooter: {
        zIndex: "100",
        fontFamily: "bYekan",
        direction: "rtl",
        textAlign: "left",
        [theme.breakpoints.down('xs')]: {
            fontSize: "60%",
            zIndex: "100",
        },
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
        zIndex: "100",
        padding: "0px !important",
        textAlign: "center",
        fontSize: "12px",
        [theme.breakpoints.down('xs')]: {
            fontSize: "50% !important"
        },
    },
    newestLabel: {
        display: "flex",
        justifyContent: "space-between",
        padding: `0px ${theme.spacing(2)}px`,
        backgroundColor: "#f2ff8c",
        border: "0.5px solid blue",
        borderRadius: "5px",
        [theme.breakpoints.down('xs')]: {
            padding: `0px ${theme.spacing(1)}px`,
        },
    },
}));

function Suggestion({ componentName }) {

    const classes = useStyles();
    const [product, setProduct] = useState([]);
    const [runComponent, setRunComponent] = useState(componentName);
    const [pending, setPending] = useState(true);

    const createMarkup = (htmlresponse) => ({ __html: htmlresponse.price_html });

    useEffect(() => {
        api.get("products", runComponent === "Suggestion" ? { per_page: 15 } : (runComponent === "Newest" ? { per_page: 10, orderby: "date" } : { per_page: 100 })).then(
            res => {
                setProduct(res.data);
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
                            <>پیشنهاد <span style={{ fontFamily: "SignPainterHouse", color: "red" }}>شگفت‌انگیز</span></>
                        </h5>
                        <Link to={`/${runComponent}`} className={`${classes.aTag}`}>لیست کامل</Link>
                    </>
                }
                {runComponent === "HighestScore" &&
                    <>
                        <h5 className={classes.pTag}>پرامتیازترین</h5>
                        <Link to={`/${runComponent}`} className={`${classes.aTag}`}>لیست کامل</Link>
                    </>
                }
                {runComponent === "Newest" &&
                    <>
                        <h5 className={classes.pTag}>جدیدترین</h5>
                        <Link to={`/${runComponent}`} className={`${classes.aTag}`}>لیست کامل</Link>
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
                                || (runComponent === "Newest"))
                            &&
                            <Card key={item.id} className={classes.card} variant="outlined" >
                                <CardActionArea className={classes.CardActionArea} component={Link} to={`/product/${item.id}`}>
                                    <div className={classes.CardActionAreaImage}>
                                        <img style={{ width: "100%" }} src={item.images[0].src} />
                                    </div>
                                    {/* <CardContent > */}
                                    <div className={classes.CardContent} component="p" >
                                        {item.name}
                                    </div>
                                    {/* </CardContent> */}
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
