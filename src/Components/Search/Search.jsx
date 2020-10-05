import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import { Col, Row } from 'reactstrap';
import { Link } from "react-router-dom";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Hidden from '@material-ui/core/Hidden';
import { Form, FormGroup, Input } from 'reactstrap';

import { api } from '../../WooCommerceRestApi/API'
import LoadingComponent from '../LoadingComponent/LoadingComponent';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "#a677c7",
        minHeight: "100vh"
    },
    row: {
        position: "relative",
        [theme.breakpoints.down('xs')]: {
            marginTop: "24px"
        },
    },
    card: {
        height: 300,
        padding: theme.spacing(1),
        "&:hover": {
            boxShadow: "0px 0px 20px 8px red"
        },
        [theme.breakpoints.down('xs')]: {
            height: 250
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
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
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
        position: "fixed",
        zIndex: "1000",
        "&:hover": {
            textDecoration: "none",
            color: "white"
        },
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
    },
    pageName: {
        marginBottom: "0px",
        fontSize: "20px",
        direction: "rtl",
        textAlign: "right",
        padding: "10px 20px 0px 0px",
        color: "white",
        [theme.breakpoints.down('xs')]: {
            fontSize: "15px",
            padding: "0px 5px",
        },
    }
}));
function Search() {
    const classes = useStyles();

    const [productList, setProductList] = useState([]);
    const [pending, setPending] = useState(true);
    const [search, setSearch] = useState("");

    const handleChange = (event) => {
        const { value } = event.target;
        setSearch(value);
    }

    useEffect(() => {
        api.get("products", { per_page: 100 }).then(
            res => {
                setProductList(res.data);
                setPending(false);
            }
        )
    }, [])

    let searchProduct = productList.filter(item => item.name.toLowerCase().startsWith(search.toLowerCase()));


    return (
        <div className={classes.root}>
            <Hidden smUp>
                <div className={classes.Link}>
                    <Input className="" style={{ direction: "rtl", height: 25 }} type='search' id='search' name={'search'} value={search} placeholder="جستجوی نام محصول" onChange={handleChange} />
                    <Link to="/"><ArrowForwardIcon style={{ color: "white", marginLeft: 6 }} /></Link>
                </div>
            </Hidden>
            <Hidden xsDown>
                <Form className="py-2 px-3 mx-sm-5 mx-md-5 rounded bg-success">
                    <FormGroup>
                        <Input className="my-3" style={{ direction: "rtl" }} type='search' id='search' name={'search'} value={search} placeholder="جستجوی نام محصول" onChange={handleChange} />
                    </FormGroup>
                </Form>
            </Hidden>
            <div className={`justify-content-center p-3`}>
                {
                    pending ?
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" , marginTop:20}}>
                            <LoadingComponent />
                        </div>
                        :
                        <Row className={`justify-content-end p-1 ${classes.row}`} xs={2} sm={3} md={4} lg={5} xl={6}>
                            {
                                searchProduct.map((item) =>
                                    item.name !== "تخفیفات" &&
                                    <Col key={item.id} className={"p-1"}>
                                        <Card className={classes.card} variant="outlined" >
                                            <CardActionArea className={classes.CardActionArea} component={Link} to={`/product/${item.id}`}>
                                                <div className={classes.CardActionAreaImage}>
                                                    <img style={{ width: "100%" }} src={item.images[0].src} />
                                                </div>
                                                <div className={classes.CardContent} component="p" >
                                                    {item.name}
                                                </div>
                                            </CardActionArea>
                                            <Divider />
                                            <CardActions className={classes.cardFooter} >
                                                {
                                                    !item.sale_price ?
                                                        <div>
                                                            <br />
                                                            {item.regular_price}تومان
                                                    </div>
                                                        : <div>
                                                            <del>{item.regular_price}{" "}تومان</del><br />
                                                            {item.sale_price}{" "}تومان
                                                    </div>
                                                }
                                            </CardActions>
                                        </Card>
                                    </Col>
                                )}
                        </Row>
                }
            </div>
        </div>
    )
}

export default Search
