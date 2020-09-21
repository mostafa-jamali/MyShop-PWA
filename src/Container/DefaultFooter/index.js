import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ProductGroups from '../../Components/ProductGroups/ProductGroups'
import Suggestion from '../../Components/Suggestion/Suggestion'
import Newest from '../../Components/Newest/Newest'
import HighestScore from '../../Components/HighestScore/HighestScore';
import MostVisited from '../../Components/MostVisited/MostVisited'
import CarouselComp from '../../Components/CarouselTop/CarouselTop';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import banerLeft from '../../assets/images/baner1.png'
import banerRight from '../../assets/images/baner2.png';

const useStyles = makeStyles((theme) => ({
    carousel: {
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
            <Grid className={classes.carousel} spacing={3}>
                <Hidden mdDown>
                    <Grid item >
                        <img style={{ width: "70%" }} src={banerLeft} alt="" />
                    </Grid>
                </Hidden>
                <Grid item xs={12} sm={10} md={9} lg={8}>
                    <Paper>
                        <CarouselComp />
                    </Paper>
                </Grid>
                <Hidden mdDown>
                    <Grid item >
                        <img style={{ width: "70%" }} src={banerRight} alt="" />
                    </Grid>
                </Hidden>
            </Grid>
            <div>
                <ProductGroups />
                <Suggestion />
                <Newest />
                <HighestScore />
                <MostVisited />
            </div>
        </div>
    )
}

export default DefaultFooter
