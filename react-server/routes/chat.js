var express = require('express');
var router = express.Router();
var Todo = require('../models/chat')

/* GET users listing. */
router.get('/', (req, res, next) => {
  Todo.find({})
    .then(data => {
      res.json({
        error: false,
        data
      })
    }).catch(err => {
      res.json({
        error: true,
        message: err
      })
    })
});

/* POST ADD USER. */
router.post('/', (req, res, next) => {
  // { id: req.body.id, name: req.body.name, message: req.body.message }
  Todo.create(req.body)
    .then(data => {
      res.json({
        error: false,
        itemAdded: data
      })
    }).catch(err => {
      res.json({
        error: true,
        message: err
      })
    })
})

/* GET USER DELETE. */
router.delete('/:id', (req, res, next) => {
  let id = req.params.id
  Todo.findOneAndRemove({ id }).then(data => {
    res.json({
      error: false,
      data
    })
  }).catch(err => {
    res.json({
      error: true,
      message: err
    })
  })
})

module.exports = router;
