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

import { api } from '../../WooCommerceRestApi/API'


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
    Tabs: {

    },
}));


export default function ScrollableTabsButtonForce() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [categPage, setCategPage] = useState([]);
    const [categProducts, setCategProducts] = useState([]);
    const [innerCategProducts, setInnerCategProducts] = useState([]);

    const productsOfCategoris = () => api.get("products", { per_page: 100 }).then(
        res => {
            console.log(res.data);
            setCategProducts(res.data);
            setInnerCategProducts(res.data.categories)
        }
    ).catch(error => console.log(error));

    const allCategoris = () => api.get("products/categories", { per_page: 100 }).then(
        res => {
            console.log(res.data);
            setCategPage(res.data);
            productsOfCategoris();
        }
    ).catch(error => console.log(error));


    useEffect(() => {
        allCategoris()
    }, [])



    return (
        <div className={classes.root}>
            <AppBar position="static" color="default" >
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
                        categPage.map((tabCategori, idx) =>
                            tabCategori.display === "default" &&
                            <Tab key={idx} label={tabCategori.name} icon={<img src={tabCategori.image.src} style={{ width: "20%" }} />} {...a11yProps(idx)} />
                        )
                    }
                </Tabs>
            </AppBar>
            {
                categPage.map((tabCategori, inx) =>
                    innerCategProducts.map((catProucts) =>
                        catProucts[0].name === tabCategori &&
                        <TabPanel value={value} index={inx}>
                            {catProucts.name}{inx}
                        </TabPanel>
                    )
                )
            }
            {/* <TabPanel value={value} index={0}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
            <TabPanel value={value} index={4}>
                Item Five
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Six
            </TabPanel>
            <TabPanel value={value} index={6}>
                Item Seven
            </TabPanel> */}
        </div>
    );
}