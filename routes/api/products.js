const express = require("express");
const router = express.Router();
const passport = require("passport");

const Product = require("../../models/Product");

// @route GET api/projects
// @desc Get all projects for a specific user
// @access Private
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        let productsArr = [];

        // Member projects
        await Product.find({})
            .then(products => {
                products.map(project => {
                    product.teamMembers &&
                        project.teamMembers.map(member => {
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

        // Combine with owner projects
        await Product.find({ owner: OWNER })
            .then(products => {
                let finalArr = [...products, ...productsArr];
                res.json(finalArr);
            })
            .catch(err => console.log(err));
    }
);

// @route GET api/projects/:id
// @desc Get specific project by id
// @access Private
router.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        let id = req.params.id;

        Product.findById(id).then(product => res.json(product));
    }
);

// @route POST api/projects/create
// @desc Create a new project
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

// @route PATCH api/projects/update
// @desc Update an existing project
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

// @route DELETE api/projects/delete/:id
// @desc Delete an existing project
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