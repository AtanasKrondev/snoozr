import React, { useContext } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider'
import LinearProgress from '@material-ui/core/LinearProgress';
import Board from '../Board/Board'
import Home from '../Home'
import SignIn from '../Auth/SignIn'
import SignUp from '../Auth/SignUp'
import Profile from '../Auth/Profile'
import NotFound from './NotFound';


export default function AppRouter() {
    const { user, loading } = useContext(UserContext);
    return (
        <>{loading ? <LinearProgress color="secondary" /> :
            <Switch>
                <Route path="/" exact>{user ? <Redirect to="/home" /> : <Redirect to="/signin" />}</Route>
                <Route path="/profile">{user ? <Profile /> : <Redirect to="/signin" />}</Route>
                <Route path="/home">{user ? <Home /> : <Redirect to="/signin" />}</Route>
                <Route path="/board/:id">{user ? <Board /> : <Redirect to="/signin" />}</Route>
                <Route path="/signin">{!user ? <SignIn /> : <Redirect to="/home" />}</Route>
                <Route path="/signup">{!user ? <SignUp /> : <Redirect to="/home" />}</Route>
                <Route path="*"><NotFound /></Route>
            </Switch>}
        </>
    )
}