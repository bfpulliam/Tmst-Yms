const Data = require('../models/Data');

// Defining all methods and business logic for routes

module.exports = {
    findAll: function (req, res) {
        Data.find(req.query)
            .then(books => res.json(data))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        Data.findById(req.params.id)
            .then(book => res.json(data))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        Data.create(req.body)
            .then(newBook => res.json(newData))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        Data.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(book => res.json(data))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        Data.findById({ _id: req.params.id })
            .then(data => book.remove())
            .then(alldata => res.json(alldata))
            .catch(err => res.status(422).json(err));
    }
};