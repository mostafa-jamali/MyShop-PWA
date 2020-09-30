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
import { Row, Col } from 'reactstrap';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Hidden from '@material-ui/core/Hidden';
import { useParams } from 'react-router-dom';

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
        width: "100%",
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
    allProduct: {
        width: "100vw",
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


export default function CategoriesPage() {
    let { id } = useParams()
    const classes = useStyles();

    const convertIdToValue = (catId) => {
        switch (catId) {
            case 52:
                return 0;
            case 62:
                return 1;
            case 76:
                return 2;
            case 81:
                return 3;
            case 86:
                return 4;
            case 119:
                return 5;
            case 121:
                return 6;
            default:
                return 0;
        }
    }
    // const [allIds, setAllIds] = useState([52, 62, 76, 81, 86, 119, 121])
    const [categPage, setCategPage] = useState([]);
    const [categProducts, setCategProducts] = useState([]);
    const [CategoryId, setCategoryId] = useState(52);
    const [value, setValue] = useState(0);
    const [pending, setPending] = useState(true);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const allCategoris = () => {
        return new Promise((resolve, reject) => {
            api.get(`products/categories`, { per_page: 100, orderby: "id" }).then(
                res => {
                    setCategPage(res.data);
                    resolve(res.data);
                }
            ).catch(error => {
                console.log(error);
                reject(error);
            });
        })
    }

    const productsOfCategoris = () => api.get("products", { per_page: 100, category: `${CategoryId}` }).then(
        res => {
            setCategProducts(res.data);
            setPending(false)
        }
    ).catch(error => console.log(error));

    // useEffect(() => {
    //     productsOfCategoris()
    // }, [CategoryId]);

    useEffect(() => {
        allCategoris().then(productsOfCategoris())
    }, [CategoryId])


    const getCategoryId = (id) => { setCategoryId(id) };
    const createMarkup = (htmlresponse) => ({ __html: htmlresponse.price_html });

    return (
        <div>
            {
                pending ?
                    <LoadingComponent />
                    :
                    <div className={classes.root}>
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
                                            onClick={() => getCategoryId(tabCategory.id)} component={Link} to={`/categories/${tabCategory.id}`} {...a11yProps(idx)} />
                                    )
                                }
                            </Tabs>
                        </AppBar>
                        <div className={classes.allProduct}>
                            {
                                categPage.map((tabCategory, inx) =>
                                    <TabPanel value={value} index={inx} key={inx} className={classes.TabPanel}>
                                        <Row className={"justify-content-center p-1"} style={{ minHeight: "80vh" }} xs={2} sm={3} md={4} lg={5} xl={6}>
                                            {
                                                categProducts.map((catProucts) =>
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
                                                                <div dangerouslySetInnerHTML={createMarkup(catProucts)}></div>
                                                            </CardActions>
                                                        </Card>
                                                    </Col>
                                                )}
                                        </Row>
                                    </TabPanel>
                                )
                            }
                        </div>
                    </div>
            }
        </div>
    );
}