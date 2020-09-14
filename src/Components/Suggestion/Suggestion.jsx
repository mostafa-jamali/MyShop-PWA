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
    },
    allCards: {
        display: "flex",
        direction: "rtl",
        overflowX: "scroll",
    },
    CardContent: {
        padding: 0
    }
}));

function Suggestion() {
    const classes = useStyles();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        api.get("products").then(
            res => {
                setProduct(res.data);
            }
        ).catch(error => console.log(error))
    }, [])
    
    return (
        <div className={classes.root}>
            <div >
                <p>پیشنهاد <span>شگفت‌انگیز</span></p>
            </div>
            <div className={classes.allCards}>
                {product.map(item =>
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
                            {
                                !item.sale_price ?
                                    <div>
                                        <br />
                                        {item.regular_price}
                                    </div>
                                    : <div>
                                        <del>{item.regular_price}</del><br />
                                        {item.sale_price}
                                    </div>
                            }
                        </CardActions>
                    </Card>
                )}
            </div>
        </div>
    )
}

export default Suggestion
