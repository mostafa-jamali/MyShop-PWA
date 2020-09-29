import React from 'react';


const Home = React.lazy(() => import('../Views/Home/Home'));
const SingleP = React.lazy(() => import('../Views/SingleP/SingleP'));
const Categories = React.lazy(() => import('../Views/Categories/Categories'));


const routes= [
    { path: "/categories", exact: true, component: Categories },
    { path: "/product/:id", exact: true, component: SingleP },
    { path: "/", exact: true, component: Home },
]

export default routes;