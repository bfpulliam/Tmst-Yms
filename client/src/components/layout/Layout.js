import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    withRouter
} from "react-router-dom";

import Dashboard from "./Dashboard";
import Schedule from "./Schedule";
import NotFound from "../404/404";

class Layout extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/dashboard/schedule" component={Schedule} />
                    <Route component={NotFound} />
                </Switch>
            </Router>
        );
    }
}


Layout.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    projects: state.projects
});

export default withRouter(
    connect(
        mapStateToProps, {}
    )(Layout)
);
