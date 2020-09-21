import React, { useState, useEffect } from 'react';
import { api } from '../../WooCommerceRestApi/API'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import ProductGroupsMobile from '../ProductGroupsMobile/ProductGroupsMobile'

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        minWidth: 150,
        padding: "10px 2px"
    },
    allGroups: {
        marginTop: 70,
        display: "flex",
        justifyContent: "center",
        direction: "rtl",
        overflowX: "scroll",
        background: "#24fe41", /* fallback for old browsers */
        background: "linear-gradient(to top, #24fe41, #fdfc47)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        padding: 10
    }
}));

function ProductGroups() {
    const classes = useStyles();
    const [categories, setCategories] = useState([])

    useEffect(() => {
        api.get("products/categories", { per_page: 100 }).then(
            res => {
                setCategories(res.data);
                console.log(res.data);
            }
        ).catch(error => console.log(error))
    }, [])
    return (
        <div className={classes.allGroups}>
            <Hidden mdDown>
                <Grid item >
                    {
                        categories.map((item) =>
                            item.display === "default" &&
                            <Button key={item.id} className={classes.margin} variant="contained" color="primary">{item.name}</Button>
                        )
                    }
                </Grid>
            </Hidden>
            <Hidden lgUp>
                <ProductGroupsMobile/>
            </Hidden>
        </div>
    )
}

export default ProductGroups
