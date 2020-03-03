const express = require("express");
const router = express.Router();
const passport = require("passport");

const Product = require("../../models/Product");

// @route GET api/products
// @desc Get all products for a specific user
// @access Private
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        let productsArr = [];

        // Member products
        await Product.find({})
            .then(products => {
                products.map(product => {
                    product.teamMembers &&
                        product.teamMembers.map(member => {
                            if (member.email == req.user.email) {
                                productsArr.push(product);
                            }
                        });
                });
            })
            .catch(err => console.log(err));

        const OWNER = {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        };

        // Combine with owner products
        await Product.find({ owner: OWNER })
            .then(products => {
                let finalArr = [...products, ...productsArr];
                res.json(finalArr);
            })
            .catch(err => console.log(err));
    }
);

// @route GET api/products/:id
// @desc Get specific product by id
// @access Private
router.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        let id = req.params.id;

        Product.findById(id).then(product => res.json(product));
    }
);

// @route POST api/products/create
// @desc Create a new product
// @access Private
router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const OWNER = {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        };

        const NEW_PRODUCT = await new Product({
            owner: OWNER,
            name: req.body.productName,
            teamMembers: req.body.members
        });

        NEW_PRODUCT.save().then(product => res.json(product));
    }
);

// @route PATCH api/products/update
// @desc Update an existing product
// @access Private
router.patch(
    "/update",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        let productFields = {};

        productFields.name = req.body.productName;
        productFields.teamMembers = req.body.members;

        Product.findOneAndUpdate(
            { _id: req.body.id },
            { $set: productFields },
            { new: true }
        )
            .then(product => {
                res.json(product);
            })
            .catch(err => console.log(err));
    }
);

// @route DELETE api/products/delete/:id
// @desc Delete an existing product
// @access Private
router.delete(
    "/delete/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Product.findById(req.params.id).then(product => {
            product.remove().then(() => res.json({ success: true }));
        });
    }
);

module.exports = router;