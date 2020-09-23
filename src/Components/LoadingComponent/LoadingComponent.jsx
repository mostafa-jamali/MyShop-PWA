import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        display: 'flex',
        justifyContent: "center",
        margin: theme.spacing(2),

    },
}));

export default function CircularIndeterminate() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CircularProgress />
            <CircularProgress color="secondary" />
        </div>
    );
}