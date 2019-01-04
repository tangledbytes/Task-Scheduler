var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');

var app = express()
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Setting up mongoose

mongoose.connect('mongodb://localhost/task_scheduler',{useNewUrlParser: true});
mongoose.connection.on('error',function(err){
    console.log(err);
});
mongoose.connection.once('open',function(){
    console.log("Connected to mongoDB")
})

var Task = require('./models/tasks');

// Routes

app.get("/:id", function(req,res){
    Task.find({},function(err,tasks){
        if(err)
        {
            console.log(err);
        }
        else
        {   
            res.render("home",{tasks : tasks});
        }
    })
});

app.post("/", function(req,res){
    Task.create(req.body,function(err,task){
        if(err){
            console.log(err);
        }
        else
        {
            console.log(task);
        }
    });

    res.redirect("/jnk");
});

app.get("*", function(req,res){
    res.send("Error 404. Entered URL is either moved to another location or is removed by the admin");
});

// Listener

app.listen(3000,function(){
    console.log("Server started on port 3000...");
});