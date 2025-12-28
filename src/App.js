import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Login from './components/Login'
import RestaurantDetails from './components/RestaurantDetails'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import Cart from './components/Cart'
import OrderDetails from './components/OrderDetails'
import Profile from './components/Profile'
import FavouriteRestaurants from './components/FavouriteRestaurants'
/* import './App.css'
                                                  import {Switch, Route, Redirect} from 'react-router-dom'
                                                  import Login from './components/Login'
                                                  import Home from './components/Home'
                                                  import ProtectedRoute from './components/ProtectedRoute'
                                                  import NotFound from './components/NotFound'

                                                  const App = () => (
                                                  <Switch>
                                                  <Route exact path="/login" component={Login} />
                                                  <ProtectedRoute exact path="/" component={Home} />
                                                  <Route path="/not-found" component={NotFound} />
                                                  <Redirect to="/not-found" />
                                                  </Switch>
                                                  )

                                                  export default App */

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/restaurants-list/:id"
      component={RestaurantDetails}
    />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <Route exact path="/orderdetails" component={OrderDetails} />
    <Route exact path="/profile" component={Profile} />
    <Route
      exact
      path="/favourite-restaurants"
      component={FavouriteRestaurants}
    />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
