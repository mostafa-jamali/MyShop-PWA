import React from 'react';


const Home = React.lazy(() => import('../Views/Home/Home'));
const SingleP = React.lazy(() => import('../Views/SingleP/SingleP'));
const Categories = React.lazy(() => import('../Views/Categories/Categories'));
const ListOfProduct = React.lazy(() => import('../Views/ListOfProduct/ListOfProduct'));
const BasketPage = React.lazy(() => import('../Views/BasketPage/BasketPage'));
const FavoritePage = React.lazy(() => import('../Views/FavoritePage/FavoritePage'));
const SearchPage = React.lazy(() => import('../Views/SearchPage/SearchPage'));
const LoginPage = React.lazy(() => import('../Views/LoginPage/LoginPage'));
const RegisterPage = React.lazy(() => import('../Views/RegisterPage/RegisterPage'));


const routes= [
    { path: "/register", exact: true, component: RegisterPage },
    { path: "/login", exact: true, component: LoginPage },
    { path: "/searchProduct", exact: true, component: SearchPage },
    { path: "/favorite", exact: true, component: FavoritePage },
    { path: "/basket", exact: true, component: BasketPage },
    { path: "/categories/:id", exact: true, component: Categories },
    { path: "/:runComponent", exact: true, component: ListOfProduct },
    { path: "/product/:id", exact: true, component: SingleP },
    { path: "/", exact: true, component: Home },
]

export default routes;