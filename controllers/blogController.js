const Blog = require('../models/blog');

// blog index
const blog_index = (req, res) => {
     Blog.find()
    .sort({createdAt: -1})
    .then((result) => {
        res.render('blogs/index', {title: "All Blogs", blogs: result})
    })
    .catch((err) => console.log(err))
}

// blog details
const blog_details = (req, res) => {
    Blog.findById(req.params.id)
    .then((result) => {
        res.render('blogs/details', {title: 'Details', blog: result})
    })
    .catch((err) => {
        console.log(err)
        res.redirect('/404')
    })
}


// blog create get
const blog_create_get = (req, res) => {
    res.render('blogs/create', {title: "Crate new"})
}

// blog create post
const blog_create_post = (req, res) => {
    const blog = new Blog(req.body)
        blog.save()
        .then((result) => {
            res.redirect('/blogs')
        })
        .catch((err) => console.log(err))
}

// blog delete

const blog_delete = (req, res) => {
     Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.json({redirect:'/blogs'})
    })
    .catch((err) => console.log(err))
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}