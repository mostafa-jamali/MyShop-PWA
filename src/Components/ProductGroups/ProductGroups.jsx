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
        color:"white",
        borderRadius:40,
        background: "#3275fc",  /* fallback for old browsers */
        "&:hover":{
            textDecoration:"none",
            color:"black",
            background: "white",
        }
    },
    allGroups: {
        marginTop: 70,
        display: "flex",
        justifyContent: "center",
        direction: "rtl",
        background: "#7e51d0",  /* fallback for old browsers */
        padding: 10,
        // borderRadius: "0px 0px 20px 20px"
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
