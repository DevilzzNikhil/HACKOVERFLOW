const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost')
const authUser = require('../middleware/auth');

router.post('/', authUser, async (req, res) => {
    const { title, content, image, category } = req.body;
    try {
        const article = await BlogPost.create({ title, content, image, category, creator: req.user._id });
        req.user.articles.push(article._id);
        await req.user.save();
        res.json(article)
    } catch (e) {
        res.status(400).json(e.message);
    }
})

router.get('/', async (req, res) => {
    try {
        const articles = await BlogPost.find();
        res.json(articles);
    } catch (e) {
        res.status(400).json(e.message);
    }
})

router.get('/me',authUser,  async (req, res) => {
    try {
        const user = req.user;
        user.populate('articles').then(({ articles }) => {
            res.json(articles)
        })
    } catch (error) {

        res.status(400).json(error.message);
    }
})




router.get('/articles/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const article = await BlogPost.findById(id);
        article.populate('creator').then((result) => {
            res.json(result)
        })
    } catch (e) {
        res.status(400).json(e.message);
    }
})

router.delete('/:id', authUser, async (req, res) =>{

    const {id} = req.params;
    try {
        const article = await BlogPost.findById(id);
        if( article.creator.toString() === req.user._id.toString()){
            await article.remove();
            res.status(200).send();
        }
        else{
            res.status(401).json("You don not have authorization")
        }
    } catch (e) {
        res.status(400).json(e.message);
    }

})


router.patch('/:id', authUser, async(req,res)=>{
    const {id} = req.params;
    const {title, content, image, category} = req.body;

    try {
        const article = await BlogPost.findByIdAndUpdate(id, { title, content, image, category});
        res.status(200).send()
    } catch (e) {
        res.status(400).json(e.message);
    }
})
module.exports = router;
