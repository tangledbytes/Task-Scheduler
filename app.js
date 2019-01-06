var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require("./models/user");
var Task = require('./models/tasks');
var methodOverride = require('method-override');
var flash = require('connect-flash');
var app = express()
app.use(bodyparser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(flash());

// Setting up mongoose

 mongoose.connect('mongodb://utkarshsrivastava23:#utkarsh#password#23@ds249824.mlab.com:49824/taskscheduler', {
     useNewUrlParser: true
 });
// mongoose.connect('mongodb://localhost/task_scheduler', {
//     useNewUrlParser: true
// });
mongoose.connection.on('error',function(err){
    console.log(err);
});
mongoose.connection.once('open',function(){
    console.log("Connected to mongoDB")
})

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: "I am the best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// FUNCTION=======================

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "You need to login first!");
    res.redirect("/");
}
//================================
// ===============================
// Routes
//================================
app.get("/",function(req,res){

    res.render("home",{message: req.flash("error")});
});

app.post("/",passport.authenticate("local",
{
    successRedirect: "/tasks",
    failureRedirect: "/",
    failureFlash: true
}),function(req,res){
});

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});

app.get("/tasks",isLoggedIn, function(req,res){
    Task.find({'user.username':req.user.username},function(err,tasks){
        if(err)
        {
            console.log(err);
        }
        else
        {   
            console.log(tasks);
            res.render("tasks",{tasks : tasks, currentUser: req.user});
        }
    })
});

app.post("/tasks",isLoggedIn, function (req, res) {
    console.log(req.user);
    var submition = {task: req.body.task, 
        user:{
            id: req.user._id,
            username: req.user.username,
            name: req.user.firstname + " " + req.user.lastname
        }
    };
    console.log(submition);
    Task.create(submition,function(err,task){
        if(err){
            console.log(err);
        }
        else
        {
            console.log(task);
        }
    });

    res.redirect("/tasks");
});

// DELETE A TASK

app.delete('/tasks/:id', function (req, res) {
    Task.findByIdAndDelete(req.params.id, function(err, obj){
        if(err){
            console.log(err);
        }
        else{
            console.log(obj);
        }
    });
    res.redirect("/tasks");
})

// AUTH ROUTE

app.get("/register",function(req,res){
    res.render("register",{message: ""});
});

app.post("/register",function(req,res){
    var newUser = new User({firstname: req.body.firstname,lastname: req.body.lastname, username: req.body.username});
    User.register(newUser, req.body.password,function(err, user){
        if(err){
            req.flash("error2", "This is username is already taken, try another one");
            console.log(err);
            return res.render("register",{message: req.flash("error2")});
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/tasks");
        })
    });
});

app.get("*", function(req,res){
    res.send("Error 404. Entered URL is either moved to another location or is removed by the admin");
});


// Listener

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Server started....");
});