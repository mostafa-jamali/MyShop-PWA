import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProductGroups from '../../Components/ProductGroups/ProductGroups'
import CardProducts from '../../Components/CardProducts/CardProducts'
import CarouselTop from '../../Components/CarouselTop/CarouselTop';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import banerLeft from '../../assets/images/baner1.png'
import banerRight from '../../assets/images/baner2.png';
import SingleProduct from '../../Components/SingleProduct/SingleProduct';

const useStyles = makeStyles((theme) => ({
    myCarousel: {
        position: "relative",
        top: 70,
        backgroundColor: "yellow",
        margin: 0,
        padding: "20px 0px 0px 0px",
        display: "flex",
        justifyContent: "center",
        overflowX: "hidden"
    },
}))

function DefaultFooter() {
    const classes = useStyles();

    return (
        <div>
            <Grid className={classes.myCarousel}>
                <Hidden mdDown>
                    <Grid item >
                        <img style={{ width: "70%", marginTop: "0px"}} src={banerLeft} alt="" />
                    </Grid>
                </Hidden>
                <Grid item xs={12} sm={10} md={9} lg={8}>
                    <Paper>
                        <CarouselTop />
                    </Paper>
                </Grid>
                <Hidden mdDown>
                    <Grid item >
                        <img style={{ width: "70%", marginTop: "0px" }} src={banerRight} alt="" />
                    </Grid>
                </Hidden>
            </Grid>
            <div>
                <ProductGroups />
                <CardProducts componentName={"Suggestion"} />
                <CardProducts componentName={"Newest"} />
                <CardProducts componentName={"HighestScore"} />
            </div>
        </div>
    )
}

export default DefaultFooter
