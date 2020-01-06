import { Switch, Route, Redirect } from 'react-router-dom'
import React from 'react'
import Overview from './container/overview'
import Lonedictionary from './container/loneDictionary'

const Router = () => (
    <Switch>
        <Redirect exact from='/' to="/overview" />
        <Route path='/overview' component={Overview} />
        <Route path='/dictionary/:id' component={Lonedictionary} />
    </Switch>
)

export default Router