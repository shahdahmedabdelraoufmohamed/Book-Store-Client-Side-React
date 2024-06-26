import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import Books from "./Pages/Books/Books";
import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import ViewBook from "./Pages/ViewBook/ViewBook";
import Login from "./Pages/Login/Login";
import ClientSelectComponent from "./Pages/ClientSelect/ClientSelectComponent";
import RegitserComponent from "./Pages/Register/RegisterComponent";
import FilterBooks from "./Pages/FilterPage/FilterPage";
import FilterPublisher from "./Pages/FilterPage/FilterPublisher";
import FilterPrice from "./Pages/FilterPage/FilterPrice";
import PublisherOrderList from "./Pages/PublisherOrder/PunlisherOrderList";
import PublishABook from "./Pages/PublishABook/PublishABook";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Search from "./Pages/Search/Search";
import { AuthContext, AuthProvider } from "./Context/AuthContext";
import PrivateRoute from "./Network/PrivateRoute";
import test from "./Pages/Test/test";
import Profile from "./Pages/Profile/Profile";
import PublisherPrivateRoute from "./Network/PublisherPriavteRoute";
import UpdateABook from "./Pages/UpdateABook/UpdateABook";
import PublisherBooks from "./Pages/PublisherBooks/PublihserBooks";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";
import OrderList from "./Pages/OrderList/OrderList";
import PublisherAuthors from "./Pages/PublisherAuthors/PublisherAuthors";
import PublisherAuthorDetails from "./Pages/PublisherAuthorDetails/PublisherAuthorDeatils";
import Footer from "./Components/Footer/Footer";
import PublicRoute from "./Network/PublickRoute";

const App = () => {
  // JWT Authen
  const [contextAuth, setContextAuth] = useState(null);

  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <div className="container mt-4 mb-4 " style={{minHeight: '100%',}}>
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/profile/:user_id" exact component={Profile} />
            <Route path="/books" component={Books} />
            <PrivateRoute path="/orders" component={OrderList} />
            <PrivateRoute path="/checkout" component={CheckoutPage} />
            <Route path="/viewbook/:id" component={ViewBook} />
            <Route exact path={"/filter"} component={FilterBooks} />
            <Route exact path={"/filterPublisher"} component={FilterPublisher} />
            <Route exact path={"/filterPrice"} component={FilterPrice} />
            <PrivateRoute path="/cart" component={Cart} />
            <PrivateRoute path="/checkout" component={Checkout} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute
              exact
              path={"/register"}
              component={ClientSelectComponent}
            />
            <PublicRoute
              exact
              path={"/register/:userType"}
              component={RegitserComponent}
            />
            <Route exact path="/search" component={Search} />
            <PublisherPrivateRoute
              exact
              path={"/publisherorder"}
              component={PublisherOrderList}
            />
            <PublisherPrivateRoute
              exact
              path={"/publisher/addbook"}
              component={PublishABook}
            ></PublisherPrivateRoute>
            <PublisherPrivateRoute
              exact
              path="/dashboard"
              component={Dashboard}
            />
            <PublisherPrivateRoute
              exact
              path={"/publisher/updatebook/:id"}
              component={UpdateABook}
            />
            <PublisherPrivateRoute
              exact
              path={"/publisher/books"}
              component={PublisherBooks}
            />
            <PublisherPrivateRoute
              exact
              path={"/publisher/authors"}
              component={PublisherAuthors}
            />
            <PublisherPrivateRoute
              exact
              path={"/publisher/updateauthor/:id"}
              component={PublisherAuthorDetails}
            />
          </Switch>
        </div>
        {window.location.pathname !== '/login'&&window.location.pathname !== '/register'? <Footer />:<></> }
      </Router>
    </AuthProvider>
  );
};

export default App;
