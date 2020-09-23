import React, { useState, useEffect } from 'react';
import { api } from "../../WooCommerceRestApi/API"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
// import debounce from "lodash.debounce";
import { useHistory, BrowserRouter as Router, Link } from "react-router-dom";

import LoadingComponent from '../LoadingComponent/LoadingComponent'
import './CardProducts.css'


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        direction: "rtl",
        textAlign: "right"
    },
    pTag: {
        marginBottom: 0
    },
    card: {
        minWidth: 200,
        maxWidth: 201,
        height: 300,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    CardActionArea: {
        height: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingTop: theme.spacing(1),
    },
    CardActionAreaImage: {
        width: "80%",
        height: 180,
        display: "flex",
        alignItems: "center"
    },
    cardFooter: {
    },
    allCards: {
        display: "flex",
        direction: "rtl",
        overflowX: "scroll",
    },
    CardContent: {
        padding: 0,
        textAlign: "center"
    },
    newestLabel: {
        display: "flex",
        justifyContent: "space-between"
    },
}));

function Suggestion({ componentName }) {
    let history = useHistory();

    const classes = useStyles();
    const [product, setProduct] = useState([]);
    const [runComponent, setRunComponent] = useState(componentName);
    const [pending, setPending] = useState(true);

    const createMarkup = (htmlresponse) => ({ __html: htmlresponse.price_html });

    useEffect(() => {
        api.get("products", { per_page: 100 }).then(
            res => {
                setProduct(res.data);
                setPending(false);
            }
        )
    }, [])

    return (
        <div className={classes.root}>
            <div className={classes.newestLabel}>
                {runComponent === "Suggestion" &&
                    <p className={classes.pTag}>
                        <>پیشنهاد <span>شگفت‌انگیز</span></>
                    </p>
                }
                {runComponent === "HighestScore" &&
                    <>
                        <p className={classes.pTag}>پرامتیازترین</p>
                        <a className={`${classes.pTag}`}>لیست کامل</a>
                    </>
                }
                {runComponent === "Newest" &&
                    <>
                        <p className={classes.pTag}>جدیدترین</p>
                        <a className={`${classes.pTag}`}>لیست کامل</a>
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
                                <Router>
                                    <CardActionArea className={classes.CardActionArea} component={Link} to={`/product${item.id}`}>
                                        <div className={classes.CardActionAreaImage}>
                                            <img style={{ width: "80%" }} src={item.images[0].src} />
                                        </div>
                                        <CardContent className={classes.CardContent}>
                                            <Typography gutterBottom component="p" >
                                                {item.name}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Router>
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
