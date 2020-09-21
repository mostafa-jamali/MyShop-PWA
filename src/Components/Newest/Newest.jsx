import React, { useState, useEffect } from 'react';
import { api } from "../../WooCommerceRestApi/API"

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import './Newest.css'

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        direction: "rtl",
        textAlign: "right"
    },
    pTag: {
        marginBottom: 0,
    },
    card: {
        minWidth: 200,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
    },
    CardActionArea: {
        height: "80%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        marginTop: theme.spacing(1),
    },
    cardFooter: {
        // marginBottom: 0
    },
    allCards: {
        display: "flex",
        direction: "rtl",
        overflowX: "scroll",
    },
    CardContent: {
        padding: 0
    },
    newestLabel: {
        display: "flex",
        justifyContent: "space-between"
    },
}));

function Newest() {
    const classes = useStyles();
    const [newest, setNewest] = useState([]);

    // const newestProduct = (dateProduct) => {
    //     if (((new Date().getTime() - new Date(dateProduct.date_modified).getTime()) / 1000000) < 2500) {
    //         return true
    //     }
    // }

    useEffect(() => {
        api.get("products", { per_page: 100 }).then(
            res => {
                setNewest(res.data);
            }
        ).catch(error => console.log(error))
    }, [])

    const createMarkup = (htmlresponse) => ({ __html: htmlresponse.price_html });

    return (
        <div className={classes.root}>
            <div className={classes.newestLabel}>
                <p className={classes.pTag}>جدیدترین‌ها</p>
                <a className={`${classes.pTag}`}>لیست کامل</a>
            </div>
            <div className={classes.allCards}>
                {newest.map(item => (
                    (parseInt(((new Date().getTime() - new Date(item.date_modified).getTime())) / 1000000) <= +20000) &&
                    <Card key={item.id} className={classes.card} variant="outlined">
                        <CardActionArea className={classes.CardActionArea}>
                            <img style={{ width: "80%" }} src={item.images[0].src} />
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
                )}
            </div>
        </div>
    )
}

export default Newest
