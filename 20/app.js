const express=require("express")
const bodyParser=require("body-parser")
const prisma=require("./index")()

const hbs=require("express-handlebars").create({extname: ".hbs"})

const facultyRoutes=require("./routes/faculty")()
const pulpitRoutes=require("./routes/pulpit")()
const teacherRoutes=require("./routes/teacher")()
const subjectRoutes=require("./routes/subject")()
const groupRoutes=require("./routes/group")()
const mainRoutes=require("./routes/main")()


const postRoutes=require("./routes/post")()
const putRoutes=require("./routes/put")()
const deleteRoutes=require("./routes/delete")()

let app=express()


async function main(){
    app.set('view engine', 'hbs')
    app.use(bodyParser.urlencoded({extended: false}))
    
    app.use("/faculty",facultyRoutes)
    app.use("/pulpit",pulpitRoutes)
    app.use("/teacher",teacherRoutes)
    app.use("/subject",subjectRoutes)
    app.use("/group",groupRoutes)
    app.use("/", mainRoutes)
    

    app.use("/post",postRoutes)
    app.use("/put",putRoutes)
    app.use("/delete",deleteRoutes)

    app.use((err,req,resp,next)=>{
        resp.status(404).send(err)
    })

    app.listen(3000,'localhost',()=>{console.log("http://localhost:3000/")})
}
main()
.then(async ()=>{await prisma.$disconnect()})
.catch(async e=>{
    console.log(e)
    await prisma.$disconnect()
})