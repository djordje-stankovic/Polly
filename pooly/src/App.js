import React from 'react';
import './App.scss';
import Login from './components/login-component';
import Pool from './components/pool-component';
import NewPool from './components/new-pool-component';
import {Route, Switch , BrowserRouter} from "react-router-dom";
import SingUp from './components/singUp-component';
import {ProtectedRoute} from './components/protectedRoute.js';


function App() {
  return (
    <div className="container-fluid"> 
        <Switch>
            <Route path="/login" component={Login}/>
            <ProtectedRoute path="/new" component={NewPool}/>
            <Route path='/singup' component={SingUp}/>
            <Route path='/' component={Pool}/>
        </Switch>
   </div>
  );
}

export default App;
