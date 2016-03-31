var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

// 記事一覧
router.get("/", function(req, res, next) {
    Post.find({}, function(err, posts) {
        var data = {
            title: "Sample App",
            csrf: req.csrfToken(),
            posts: posts,
        };

        res.render("index", data)
    });
});

// 記事の追加
router.get("/new", function(req, res, next) {
    var data = {
        title: "Add blog | Sample App",
        csrf: req.csrfToken(),
        errors: req.flash("errors").shift()
    };

    res.render("new", data);
});

// 記事データをDBに追加
router.post("/create", function(req, res, next) {
    var post = new Post();
    post.title = req.body.title;
    post.contents = req.body.contents;
    post.save(function(err) {
        if (err) {
            req.flash("errors", err.errors);
            res.redirect("/new");
        } else {
            res.redirect("/");
        }
    });
});

// 記事の編集
router.get("/edit/:id", function(req, res, next) {
    var id = req.params.id;
    var query = {
        _id: id
    };

    Post.find(query, function(err, posts) {
        if (err) return next();

        if (posts.length > 0) {
            var post = posts[0];
            var data = {
                title: "Edit blog | Sample App",
                csrf: req.csrfToken(),
                post: post,
                errors: req.flash("errors").shift()
            };

            res.render("edit", data)
        }
    });
});

// 記事データを更新
router.post("/update", function(req, res, next) {
    var id = req.body._id;

    if (id) {
        var title = req.body.title;
        var contents = req.body.contents;

        var whereStatement = {
            _id: id
        };

        var updateStatement = {
            $set: {
                title: title,
                contents: contents
            }
        };

        Post.update(whereStatement, updateStatement, function(err) {
            if (err) return next();

            res.redirect("/");
        });
    } else {
        res.redirect("/edit/" + id);
    }
});

// 記事を削除
router.delete("/delete", function(req, res, next) {
    var id = req.body._id;

    if (id) {
        Post.findById(id, function(err, post) {
            if (err) return next();

            post.remove();
            res.redirect("/");
        });
    } else {
        res.redirect("/");
    }
});

module.exports = router;
