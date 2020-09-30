import React, { Suspense } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import routes from '../Routes/Routes';


function Container() {
    return (
        <div>
            <Suspense fallback={<h1>Loading...</h1>}>
                <Router>
                    <Switch>
                        {
                            routes.map((item, index) =>
                                <Route key={index} path={item.path} exact={item.exact} render={props => <item.component {...props} />} />
                            )
                        }
                    </Switch>
                </Router>
            </Suspense>
        </div>
    )
}

export default Container
