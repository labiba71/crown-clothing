import React, { useEffect, lazy, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// import "./App.css";
// import HomePage from "./pages/homepage/homepage.component.jsx";
// import ShopPage from "./pages/shopPage/shop.component.jsx";
// import CheckoutPage from "./pages/checkoutPage/checkout.component";
// import SignInAndSignUpPage from "./pages/signin-and-signup-page/signin-and-signup-page.component.jsx";
import Header from "./components/header/header.component";
import { connect } from "react-redux";
import { selectCurrentUser } from "./redux/user/user.selector";
import { createStructuredSelector } from "reselect";
import { checkUserSession } from "./redux/user/user.actions";
import { GlobalStyle } from "./global.styles";
import Spinner from "./components/spinner/spinner.component.jsx";
import ErrorBoundary from "./components/error-boundary/error-boundary.component.jsx";
// import { setCurrentUser } from "./redux/user/user.actions";

const HomePage = lazy(() => import("./pages/homepage/homepage.component.jsx"));
const ShopPage = lazy(() => import("./pages/shopPage/shop.component.jsx"));
const CheckoutPage = lazy(() =>
  import("./pages/checkoutPage/checkout.component")
);
const SignInAndSignUpPage = lazy(() =>
  import("./pages/signin-and-signup-page/signin-and-signup-page.component.jsx")
);

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  // constructor() {
  //   super();

  //   this.state = {
  //     currentUser: null,
  //   };
  // }

  // unsubscribeFromAuth = null;

  // componentDidMount() {
  //   const { checkUserSession } = this.props;
  //   checkUserSession();
  //   // const { setCurrentUser } = this.props;
  //   // this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
  //   //   if (userAuth) {
  //   //     const userRef = await createUserProfileDocument(userAuth);
  //   //     userRef.onSnapshot((Snapshot) => {
  //   //       // this.setState({
  //   //       //   currentUser: {
  //   //       //     id: Snapshot.id,
  //   //       //     ...Snapshot.data(),
  //   //       //   },
  //   //       // });
  //   //       setCurrentUser({
  //   //         id: Snapshot.id,
  //   //         ...Snapshot.data(),
  //   //       });
  //   //     });
  //   //   } else {
  //   //     // this.setState({ currentUser: userAuth });
  //   //     setCurrentUser(userAuth);
  //   //     // addCollectionAndDocuments("collections", collectionsArray);
  //   //   }
  //   // });
  // }

  // componentWillUnmount() {
  //   this.unsubscribeFromAuth();
  // }

  // render() {
  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route
              exact
              path="/signin"
              render={() =>
                currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
              }
            />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
};
// }

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // collectionsArray: selectCollectionsForPreview,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
