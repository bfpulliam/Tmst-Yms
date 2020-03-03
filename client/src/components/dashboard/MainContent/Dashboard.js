import React, { Component } from "react";

import { connect } from "react-redux";

import Modal from "./Modal/Modal";

class Dashboard extends Component {
    state = {
        modal: false,
        edit: false,
        name: "",
        members: [],
        id: "",
        owner: {}
    };

    toggleModal = e => {
        this.setState({ modal: !this.state.modal, edit: false });
    };

    toggleEditModal = (name, members, id, owner, e) => {
        e.stopPropagation();

        this.setState({
            modal: !this.state.modal,
            edit: !this.state.edit,
            name: name,
            members: members,
            id: id,
            owner: owner
        });
    };

    render() {
        const { products } = this.props.products;

        let content;

        let productData = products.sort().map(product => (
            <div
                key={product._id}
                className="product-icon"
                onClick={() => this.props.history.push(`/products/${product._id}`)}
            >
                <div className="product-name">{product.name}</div>
                <div
                    className="product-info-button"
                    onClick={this.toggleEditModal.bind(
                        this,
                        product.name,
                        product.teamMembers,
                        product._id,
                        product.owner
                    )}
                >
                    Edit product
        </div>
                <div className="product-info-button">Go to product</div>
            </div>
        ));

        if (products.length > 0) {
            // At least one product
            content = (
                <>
                    <button className="main-btn" onClick={this.toggleModal}>
                        Create another product
          </button>
                    <div className="modal-wrapper">
                        <Modal
                            onClose={this.toggleModal}
                            modal={this.state.modal}
                            edit={this.state.edit}
                            name={this.state.name}
                            members={this.state.members}
                            id={this.state.id}
                            owner={this.state.owner}
                        />
                    </div>
                    <div className="products-wrapper">{productData}</div>
                </>
            );
        } else {
            // No products
            content = (
                <>
                    <div className="products">
                        <div className="no-products">
                            <h1 className="header">You have no products</h1>
                            <button className="main-btn" onClick={this.toggleModal}>
                                Create your first product
              </button>
                            <div className="modal-wrapper">
                                <Modal onClose={this.toggleModal} modal={this.state.modal} />
                            </div>
                        </div>
                    </div>
                </>
            );
        }

        return (
            <div className="main-content">
                <h1 className="header">Your Products</h1>
                {content}
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
)(Dashboard);