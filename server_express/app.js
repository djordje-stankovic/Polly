const expres = require('express');
const morgan = require('morgan');
// const Answer = require('./models/answer');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userControler = require('./controllers/userControler');
const poolControler = require('./controllers/poolControler');
const app = expres();

app.use(morgan('dev'));
app.use(expres.json());

//Cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*",);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     next();
});

//Mongo Db conection 
const DB = ` mongodb+srv://Djordje:kcP6FtaoVC5J2b0b@cluster0-i1knv.mongodb.net/pollev?retryWrites=true&w=majority`

  dotenv.config({ path : './config.env'})
 
  mongoose.connect(DB, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false
  }).then(() => {
    console.log("Db conection successfull");
  })
  
//user rotes
// app.post("/signup", userControler.signup);
app.post("/signin", userControler.login);
app.post("/markVoteOnPool", userControler.markVoteOnPool);

//Pool routes
app.post("/pool", poolControler.createNewPool);
app.get("/pool", poolControler.getPools);
app.get("/activePool", poolControler.getActivePool);
app.post("/increment", poolControler.IncermentAnswer);
app.post("/new", poolControler.createNewPool);
app.post("/deactivate/:id", poolControler.Deactivate);



app.listen(5000, () => {
    console.log(`App runing on port 5000 from app`);
});