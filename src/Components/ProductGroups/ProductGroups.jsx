import React, { useState, useEffect } from 'react';
import { api } from '../../WooCommerceRestApi/API'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        minWidth: 150,
        padding: "10px 2px"
    },
    allGroups: {
        marginTop: 70,
        display: "flex",
        direction: "rtl",
        overflowX: "scroll",
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
            {
                categories.map((item) =>
                    item.display == "default" &&
                    <Button key={item.id} className={classes.margin} variant="contained" color="primary">{item.name}</Button>
                )
            }
        </div>
    )
}

export default ProductGroups
