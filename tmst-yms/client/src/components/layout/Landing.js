import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
    render() {
        return (
        <div>
                <div className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h1>
                            <b>TMST-YMS</b>
                        </h1>
                        <br />
                        <h5>
                        <b>
                          Transportation Management System Tracking Yard Management System
                        </b>
                        </h5>
                        <br/>
                        <br/>
                        <br/>
                        <div className="col s6">
                            <Link
                                to="/register"
                                style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px"
                                }}
                                    className="btn btn-large waves-effect waves-light hoverable  indigo darken-3 pulse"
                            >
                                Register
              </Link>
                        </div>
                        <div className="col s6">
                            <Link
                                to="/login"
                                style={{
                                    width: "140px",
                                    borderRadius: "3px",
                                    letterSpacing: "1.5px"
                            }}
                                    className="btn btn-large waves-effect hoverable green lighten-4 black-text pulse"
                        >
                            Log In
              </Link>
                        </div>
                    </div>
                </div>
                </div>
        </div>
        );
    }
}
export default Landing;