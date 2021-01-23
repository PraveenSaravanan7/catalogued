import './App.css'
import {Switch, Route, Redirect } from 'react-router-dom'
import CacheRoute, { CacheSwitch } from 'react-router-cache-route'

import {HomePage} from './pages/HomePage'
import { UserPage } from "./pages/UserPage";
import { EditProfile } from "./pages/EditProfile";
import { AddPost } from "./pages/AddPost";
import { CategoryPage } from "./pages/CategoryPage";
import { ProductPage } from "./pages/ProductPage";
const ls=require("local-storage")

function App() {
  return (
    <div className="app-div m-auto">
    <CacheSwitch>
    <Route exact path={"/"}  >
        {ls('accessToken')?<Redirect to={'/user/me'}></Redirect>:<Redirect to={'/login'}></Redirect>}
      </Route>      
      <CacheRoute  exact path="/user/:id" component={UserPage}  ></CacheRoute>
      <Route exact path="/login" component={HomePage}></Route>
      <Route exact path="/editprofile" component={EditProfile}></Route>
      <Route exact path="/addpost" component={AddPost}></Route>
      <CacheRoute multiple exact path="/category/:id" component={CategoryPage}></CacheRoute>
      <CacheRoute multiple exact path="/product/:id" component={ProductPage}></CacheRoute>
    </CacheSwitch>
    </div>
  );
}

export default App;
