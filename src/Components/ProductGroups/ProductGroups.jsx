import React, { useState, useEffect } from 'react';
import { api } from '../../WooCommerceRestApi/API'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";

import LoadingComponent from '../LoadingComponent/LoadingComponent';
import ProductGroupsMobile from '../ProductGroupsMobile/ProductGroupsMobile'

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        minWidth: 150,
        padding: "10px 2px",
        background: "#004FF9",  /* fallback for old browsers */
        background: "-webkit-linear-gradient(to top, #FFF94C, #004FF9)",  /* Chrome 10-25, Safari 5.1-6 */
        background: "linear-gradient(to top, #FFF94C, #004FF9)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        "&:hover":{
            textDecoration:"none",
        }
    },
    allGroups: {
        marginTop: 70,
        display: "flex",
        justifyContent: "center",
        direction: "rtl",
        background: "#5D26C1",  /* fallback for old browsers */
        background: "-webkit-linear-gradient(to top, #fdeff9, #ec38bc, #5D26C1)",  /* Chrome 10-25, Safari 5.1-6 */
        background: "linear-gradient(to top, #fdeff9, #ec38bc, #5D26C1)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        padding: 10,
        borderRadius: "0px 0px 20px 20px"
    }
}));

function ProductGroups() {
    const classes = useStyles();
    const [categories, setCategories] = useState([])
    const [pending, setPending] = useState(true)

    useEffect(() => {
        api.get("products/categories", { per_page: 100 }).then(
            res => {
                setCategories(res.data);
                setPending(false)
            }
        ).catch(error => console.log(error))
    }, [])
    return (
        <div className={classes.allGroups}>
            <Hidden mdDown>
                {
                    pending ?
                        <LoadingComponent />
                        :
                        <Grid item >
                            {
                                categories.map((item) =>
                                    item.display === "default" &&
                                    <Link key={item.id} to={`/categories/${item.id}`}>
                                        <Button className={classes.margin} variant="contained">{item.name}</Button>
                                    </Link>
                                )
                            }
                        </Grid>
                }
            </Hidden>
            <Hidden lgUp>
                <ProductGroupsMobile />
            </Hidden>
        </div>
    )
}

export default ProductGroups
