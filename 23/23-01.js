const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const session=require("express-session")
const passport=require("passport")
const localStrategy=require("passport-local").Strategy
const users=require("./users.json")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(session({secret:"LERA-SECRET-KEY"}))
app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user,done)=>done(null,user))
passport.deserializeUser((user,done)=>done(null,user))

passport.use(
    new localStrategy((username,password,done)=>{
        for (let user of users){
            if (username===user.username && password===user.password){
                return done(null,user)
            }
        }
        return done(null,false,{message:"wrong username or password"})
    })
)

app.get("/login", (req,resp,next)=>{
    resp.send("<form method='post' action='login'><input type='text' name='username'><input type='password' name='password'><button type='submit'>send</button><button type='reset'>cancel</button></form>'")
})

app.post("/login", passport.authenticate("local",{successRedirect:"/resource", failureRedirect:"/login"}))

app.get("/resource", (req,resp,next)=>{
    if (req.user) next()
    else resp.status(401).send("unauthorized")
}, (req, resp)=>{
    resp.send(`resource<br/>username: ${req.user.username}`)
})

app.get("/logout",(req,resp, next)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        resp.redirect('/login');
      });
})

app.use((err,req,resp,next)=>{
    resp.status(404).send(err)
})

app.listen(3000)