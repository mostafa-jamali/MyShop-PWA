import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ProductGroups from '../../Components/ProductGroups/ProductGroups'
import Suggestion from '../../Components/Suggestion/Suggestion'
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: "yellow",
        padding: 10,
        height: 150
    },
}))

function DefaultFooter() {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.root}>carousel top</div>
            <div>
                <ProductGroups />
                <Suggestion />
            </div>

        </div>
    )
}

export default DefaultFooter
