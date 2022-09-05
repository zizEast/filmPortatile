const express=require('express');
const router=express.Router();

const Author=require('../models/AuthorSchema')


router.get('/',async(req,res)=>{
    const authors=await Author.find({})

    res.render('authors/authors.ejs',{authors:authors})
})

router.get('/new',(req,res)=>{
    res.render('authors/new')
})


router.post('/',async(req,res)=>{
    const author=new Author({
        name:req.body.name
    })

    try {
        await author.save()
        res.redirect('/authors')
    } catch (e) {
        res.render('authors/new',{errorMessage:'errore di creazione autore'})
    }

})


router.delete('/:id',async(req,res)=>{
    await Author.findByIdAndDelete(req.params.id)
    res.redirect('/authors')
})
module.exports=router;