if(process.env.NODE_ENV!='production'){
    require('dotenv').config()
}

if(process.env.NODE.ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'front_end', 'build')));
  
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'front_end', 'build', 'index.html'))
    });
    
  }

const express=require('express');
const app=express();

const router=require('./routes/authorRoutes')
const methodOverride=require('method-override')

const expressLayouts=require('express-ejs-layouts')

const mongoose=require('mongoose');

mongoose.connect(process.env.DATABASE_URL);
const db=mongoose.connection;
db.on('error',(e)=>{
    throw new e;
})
db.once('open',()=>{
    console.log('siamo connessi a mongo Atlas!');
})


app.use(express.urlencoded({extended:false}))

app.set('view engine','ejs');
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts);

app.use(methodOverride('_method'))


app.use('/authors',router)


app.listen(process.env.PORT||3000)

