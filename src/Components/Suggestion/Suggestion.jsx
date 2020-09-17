import React, { useState, useEffect } from 'react';
import { api } from "../../WooCommerceRestApi/API"

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';

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
        height: 300,
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
    CardActionAreaImage: {
        width: "80%",
        height: 200,
        padding: "auto"
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
    }
}));

function Suggestion() {
    const classes = useStyles();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        api.get("products", { per_page: 20 }).then(
            res => {
                setProduct(res.data);
            }
        ).catch(error => console.log(error))
    }, [])

    const createMarkup = (htmlresponse) => ({ __html: htmlresponse.price_html });

    return (
        <div className={classes.root}>
            <div>
                <p className={classes.pTag}>پیشنهاد <span>شگفت‌انگیز</span></p>
            </div>
            <div className={classes.allCards}>
                {product.map(item =>
                    item.on_sale ?
                        <Card key={item.id} className={classes.card} variant="outlined" >
                            <CardActionArea className={classes.CardActionArea}>
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
                        : null
                )}
            </div>
        </div >
    )
}

export default Suggestion
