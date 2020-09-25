import React from 'react';


const Home = React.lazy(() => import('../Views/Home/Home'));
const SingleP = React.lazy(() => import('../Views/SingleP/SingleP'));


const routes= [
    { path: "/product/:id", exact: false, component: SingleP },
    { path: "/", exact: true, component: Home },
]

export default routes;