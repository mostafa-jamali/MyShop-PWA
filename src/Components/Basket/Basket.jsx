import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import { Divider } from '@material-ui/core';
import { Link } from "react-router-dom";
import { Row, Col } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    card: {
        height: 400,
        padding: theme.spacing(1),
        "&:hover": {
            boxShadow: "0px 0px 20px 8px red"
        },
        [theme.breakpoints.down('xs')]: {
            height: 300
        },

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
        width: "65%",
        maxHeight: 150,
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down('xs')]: {
            maxHeight: 120,
            width: "80%",
        },
        [theme.breakpoints.up('xs')]: {
            maxHeight: 120,
            width: "70%",
        },
    },
    cardFooter: {
        fontFamily: "bYekan",
        direction: "rtl",
        display: "flex",
        // flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down('xs')]: {
            fontSize: "60%"
        },
    },
    CardContent: {
        padding: 0,
        textAlign: "center",
        direction: "rtl",
        fontSize: "12px",
        [theme.breakpoints.down('xs')]: {
            fontSize: "60%"
        },
    },
    Link: {
        [theme.breakpoints.down('sm')]: {
            backgroundColor: "#ff1f51",
            width: "100vW",
            height: "20px",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "20px",
            color: "white"
        },
    }
}));

function Basket({ basketList }) {
    const classes = useStyles();

    return (
        <div>
            <Row className={"justify-content-center p-1"} style={{ minHeight: "80vh" }} xs={2} sm={3} md={4} lg={5} xl={6}>
                {
                    basketList.map((catProucts) =>
                        catProucts.name !== "تخفیفات" &&
                        <Col key={catProucts.id} className={"p-1"}>
                            <Card className={classes.card} variant="outlined" >
                                <CardActionArea className={classes.CardActionArea} component={Link} to={`/product/${catProucts.id}`}>
                                    <div className={classes.CardActionAreaImage}>
                                        <img style={{ width: "150px" }} src={catProucts.images[0].src} />
                                    </div>
                                    <div className={classes.CardContent} component="p" >
                                        {catProucts.name}
                                    </div>
                                </CardActionArea>
                                <Divider />
                                <CardActions className={classes.cardFooter}>
                                    {
                                        catProucts.on_sale ?
                                            <>
                                                <del>{catProucts.regular_price}</del>تومان
                                                <p>{catProucts.sale_price}</p>تومان
                                            </>
                                            :
                                            <p>{catProucts.regular_price}</p>
                                    }
                                </CardActions>
                            </Card>
                        </Col>
                    )}
            </Row>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        basketList: state.basketList.basket_list,
    }
}
export default connect(mapStateToProps, {})(Basket);
