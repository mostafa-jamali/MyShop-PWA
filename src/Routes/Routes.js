import React from 'react';


const Home = React.lazy(() => import('../Views/Home/Home'));
const SingleP = React.lazy(() => import('../Views/SingleP/SingleP'));
const Categories = React.lazy(() => import('../Views/Categories/Categories'));
const ListOfProduct = React.lazy(() => import('../Views/ListOfProduct/ListOfProduct'));


const routes= [
    { path: "/categories/:id", exact: true, component: Categories },
    { path: "/:runComponent", exact: true, component: ListOfProduct },
    { path: "/product/:id", exact: true, component: SingleP },
    { path: "/", exact: true, component: Home },
]

export default routes;