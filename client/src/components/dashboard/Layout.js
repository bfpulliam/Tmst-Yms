import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productsActions";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    withRouter
} from "react-router-dom";

import Spinner from "../common/Spinner";
import SideNav from "./SideNav/SideNav";
import TopNav from "./TopNav/TopNav";
import Dashboard from "./MainContent/Dashboard";
import Tasks from "./MainContent/Tasks";
import Product from "./MainContent/Product/Product";
import NotFound from "../404/404";


class Layout extends Component {
    componentDidMount() {
        this.props.getProducts();
    }

    render() {
        const { products, productsLoading } = this.props.products;

        let dashboardContent;

        if (products === null || productsLoading) {
            dashboardContent = <Spinner />;
        } else if (products.length > 0) {
            dashboardContent = (
                <>
                    <SideNav products={products} />
                    <div className="right">
                        <TopNav />
                        <Switch>
                            <Route
                                exact
                                path="/dashboard"
                                products={products}
                                component={Dashboard}
                            />
                            <Route
                                exact
                                path="/tasks"
                                products={products}
                                component={Tasks}
                            />
                            <Route exact path="/products/:product" component={Product} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </>
            );
        } else {
            dashboardContent = (
                <>
                    <SideNav />
                    <div className="right">
                        <TopNav />
                        <Switch>
                            <Route
                                exact
                                path="/dashboard"
                                products={[]}
                                component={Dashboard}
                            />
                            <Route exact path="/tasks" component={Tasks} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </>
            );
        }

        return (
            <Router>
                <div className="wrapper">{dashboardContent}</div>
            </Router>
        );
    }
}

Layout.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    products: state.products
});

export default withRouter(
    connect(
        mapStateToProps,
        { getProducts }
    )(Layout)
);
