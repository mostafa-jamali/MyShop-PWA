import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ProductGroups from '../../Components/ProductGroups/ProductGroups'
import Suggestion from '../../Components/Suggestion/Suggestion'
import Newest from '../../Components/Newest/Newest'
import HighestScore from '../../Components/HighestScore/HighestScore';
import MostVisited from '../../Components/MostVisited/MostVisited'
const useStyles = makeStyles((theme) => ({
    carousel: {
        backgroundColor: "yellow",
        padding: 10,
        height: 150,
        position: "relative",
        top: 70,
    },
}))

function DefaultFooter() {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.carousel}>carousel top</div>
            <div>
                <ProductGroups />
                <Suggestion />
                <Newest />
                <HighestScore/>
                <MostVisited/>
            </div>

        </div>
    )
}

export default DefaultFooter
