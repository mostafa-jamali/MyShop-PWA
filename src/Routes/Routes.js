import React from 'react';

const Home = React.lazy(() => import('../Views/Home/Home'));
const Product = React.lazy(() => import('../Views/Product/Product'));


const routes= [
    { path: "/", exact: true, component: Home },
    { path: "/product", exact: true, component: Product }
]

export default routes;