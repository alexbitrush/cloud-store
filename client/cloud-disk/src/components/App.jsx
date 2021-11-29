import Navbar from "./Navbar/navbar";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Registration from "./registration/Registration";
import Login from "./registration/Login";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { auth } from "../actions/user";
import Disk from "./disk/Disk";

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth())
    }, [])
    
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        {!isAuth ? 
          <Switch>
            <Route path="/registartion" component={Registration} />
            <Route path="/login" component={Login} />
            <Redirect to="/login" />
          </Switch>
          :
          <Switch>
            <Route path="/login" component={Disk} />
            <Redirect to="/" />
          </Switch>
        }
      </div>
    </BrowserRouter>
  );
}
export default App;
