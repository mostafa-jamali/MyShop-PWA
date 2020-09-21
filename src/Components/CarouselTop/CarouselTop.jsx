import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Carousel } from 'react-responsive-carousel';
import TV from '../../assets/images/TV.jpg'
import Watch from '../../assets/images/Watch.jpg'
import radio from '../../assets/images/radio.jpg'
import nesquit from '../../assets/images/nesquit.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    // roo]]]
}))

function CarouselTop() {
    const classes = useStyles();

    return (
        <Carousel className={classes.root}>
            <div>
                <img src={Watch} />
                <p className="legend">ساعت هوششمند</p>
            </div>
            <div>
                <img src={TV} />
                <p className="legend">تلویزیون</p>
            </div>
            <div>
                <img src={radio} />
                <p className="legend">رادیو</p>
            </div>
            <div>
                <img src={nesquit} />
                <p className="legend">نسکوئیت</p>
            </div>
        </Carousel>
    );
};

export default CarouselTop;