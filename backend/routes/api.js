var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ToDoItem = mongoose.model('ToDoItem');

router.route('/todos')
   .get(function(req, res) {
       ToDoItem.find(function(err, toDo) {
           if (err) {
               return res.status(500).json(err);
           }

           return res.send(toDo);
       })
   })

    .post(function(req, res) {
        console.log('body', req.body);
        var toDo = new ToDoItem();
        toDo.title = req.body.title;
        toDo.description = req.body.description;

        toDo.save(function(err, post) {
            if (err) {
                return res.send(500, err);
            }

            return res.status(200).json(post);
        });
    });

router.route('/todos/:id')
    .get(function(req, res) {
        ToDoItem.findById(req.params.id, function(err, toDo) {
            if (err) {
                return res.status(500).json(err);
            }

            if (!toDo) {
                return res.status(404).json("Item not found");
            }

            return res.status(200).json(toDo);
        })
    })

    .put(function(req, res) {
        console.log("id", req.params.id);
        ToDoItem.findById(req.params.id, function(err, toDo) {
            if (err) {
                res.status(500).json(err);
            }

            if (!toDo) {
                res.status(404).json('Item not found');
            } else {
                toDo.title = req.body.title;
                toDo.description = req.body.description;

                toDo.save(function(err, savedToDo) {
                    if (err) {
                        res.status(500).json(err);
                    }

                    res.status(200).json(savedToDo);
                })
            }
        });
    })

    .delete(function(req, res) {
        console.log('delete...');
        ToDoItem.remove({
            _id: req.params.id
        }, function(err) {
            if (err) {
                res.json(err);
            }
            console.log('delete finished');
            res.status(200).json('Item deleted!');
        })
    });

module.exports = router;