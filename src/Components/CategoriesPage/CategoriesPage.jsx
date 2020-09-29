import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Divider } from '@material-ui/core';
import { Link } from "react-router-dom";
import { Row } from 'reactstrap';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Hidden from '@material-ui/core/Hidden';

import { api } from '../../WooCommerceRestApi/API'
import LoadingComponent from '../LoadingComponent/LoadingComponent'
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    AppBar: {
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        [theme.breakpoints.up('sm')]: {
            paddingLeft: "0%",
        },
        [theme.breakpoints.up('md')]: {
            paddingLeft: "5%"
        },
        [theme.breakpoints.up('lg')]: {
            paddingLeft: "10%"
        },
    },
    Tabs: {
        width: "160px",
        [theme.breakpoints.down('sm')]: {
            width: "20px",
        },
        [theme.breakpoints.up('sm')]: {
            width: "20px",
        },
        [theme.breakpoints.up('md')]: {
            width: "30px",
        },
        [theme.breakpoints.up('lg')]: {
            width: "50px",
        },
    },
    TabPanel: {
        backgroundColor: "#a677c7",
        position: "absolute",
        [theme.breakpoints.down('sm')]: {
            top: "100px",
        },
        [theme.breakpoints.up('sm')]: {
            top: "70px",
        },
        [theme.breakpoints.up('lg')]: {
            top: "90px",
        },
    },
    card: {
        height: 300,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        "&:hover": {
            boxShadow: "0px 0px 20px 8px red"
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
        width: "70%",
        maxHeight: 150,
    },
    cardFooter: {
        fontFamily: "bYekan",
        direction: "rtl",
    },
    CardContent: {
        padding: 0,
        textAlign: "center",
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


export default function ScrollableTabsButtonForce() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [categPage, setCategPage] = useState([]);
    const [categProducts, setCategProducts] = useState([]);
    const [CategoryId, setCategoryId] = useState([121]);
    const [pending, setPending] = useState(true);

    const productsOfCategoris = () => api.get("products", { per_page: 100, category: `${CategoryId}` }).then(
        res => {
            console.log(res.data);
            setCategProducts(res.data);
        }
    ).catch(error => console.log(error));

    const allCategoris = () => api.get("products/categories", { per_page: 100 }).then(
        res => {
            console.log(res.data);
            setCategPage(res.data);
            setPending(false)
            productsOfCategoris();
        }
    ).catch(error => console.log(error));

    useEffect(() => {
        productsOfCategoris()
    }, [CategoryId]);

    useEffect(() => {
        allCategoris()
    }, [])


    const getCategoryId = (id) => { setCategoryId(id) };
    const createMarkup = (htmlresponse) => ({ __html: htmlresponse.price_html });

    return (
        <div>

            <div className={classes.root}>
                {
                    pending ?
                        <LoadingComponent />
                        :
                        <>
                            <AppBar position="static" color="default" className={classes.AppBar} >
                                <Hidden smUp>
                                    <Link to="/" className={classes.Link}>دسته‌بندی محصولات<ArrowForwardIcon /></Link>
                                </Hidden>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    variant="scrollable"
                                    scrollButtons="on"
                                    indicatorColor="primary"
                                    textColor="primary"
                                    aria-label="scrollable force tabs example"
                                >
                                    {
                                        categPage.map((tabCategory, idx) =>
                                            tabCategory.display === "default" &&
                                            <Tab key={idx} label={tabCategory.name} icon={<img src={tabCategory.image.src} className={classes.Tabs} />}
                                                onClick={() => getCategoryId(tabCategory.id)} {...a11yProps(idx)} />
                                        )
                                    }
                                </Tabs>
                            </AppBar>
                        </>
                }
                {
                    categPage.map((tabCategory, inx) =>
                        <TabPanel value={value} index={inx} key={inx} className={classes.TabPanel}>
                            <Row className={"justify-content-center"} xs={1} sm={3} md={4} lg={5}>
                                {
                                    categProducts.map((catProucts) =>
                                        catProucts.name !== "تخفیفات" &&
                                        <Card key={catProucts.id} className={classes.card} variant="outlined" >
                                            <CardActionArea className={classes.CardActionArea} component={Link} to={`/product/${catProucts.id}`}>
                                                <div className={classes.CardActionAreaImage}>
                                                    <img style={{ width: "80%" }} src={catProucts.images[0].src} />
                                                </div>
                                                <CardContent className={classes.CardContent}>
                                                    <Typography gutterBottom component="p" >
                                                        {catProucts.name}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <Divider />
                                            <CardActions className={classes.cardFooter}>
                                                <div dangerouslySetInnerHTML={createMarkup(catProucts)}></div>
                                            </CardActions>
                                        </Card>
                                    )}
                            </Row>
                        </TabPanel>
                    )
                }
            </div>
        </div>
    );
}