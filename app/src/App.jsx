import React from 'react'
import { 
    BrowserRouter as Router,
    Switch, 
    Route
} from 'react-router-dom'

import Search from './pages/search'
import Details from './pages/details/index';

export const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Search} />
                <Route path="/details/:id" component={Details} />
            </Switch>
        </Router>
    )
}
