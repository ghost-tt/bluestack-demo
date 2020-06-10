import React from 'react'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'; //Added to support Routing
import TabHeader from '../components/TabHeader';
import HomePage from '../components/HomPage';
import Tabs from '../components/Tabs';
import MultiTabs from '../components/MultiTabs';
import NotFoundPage from '../components/NotFoundPage';


const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                {/* <TabHeader/> */}
                    <Switch>
                        <Route path='/' component={HomePage} exact={true}></Route>
                        <Route path='/tab' component={MultiTabs} exact={true} />
                        <Route path='/tab/:id' component={Tabs}></Route>
                        <Route component={NotFoundPage} />
                    </Switch>
            </div>
        </BrowserRouter>
    )
}


export default AppRouter;
