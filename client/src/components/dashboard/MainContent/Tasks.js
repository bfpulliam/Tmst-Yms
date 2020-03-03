import React, { Component } from "react";
import { connect } from "react-redux";

import Modal from "./Modal/Modal";

class Tasks extends Component {
    state = {
        modal: false
    };

    toggleModal = e => {
        this.setState({ modal: !this.state.modal });
    };

    render() {
        const { products } = this.props.products;

        return (
            <div className="main-content">
                <h1 className="header">Your Tasks</h1>
                <div className="products">
                    <div className="no-products">
                        <h1 className="header">You have no tasks</h1>
                        {products.length > 0 ? (
                            <p>Visit a product to create your first task</p>
                        ) : (
                                <button className="main-btn" onClick={this.toggleModal}>
                                    Create your first product
              </button>
                            )}
                        <Modal onClose={this.toggleModal} modal={this.state.modal} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    products: state.products
});

export default connect(
    mapStateToProps,
    {}
)(Tasks);