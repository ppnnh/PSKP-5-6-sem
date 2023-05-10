const res = require("express/lib/response")

const prisma=require("../index")()
const Teacher=prisma.TEACHER

module.exports={
    getAll: async (req,resp)=>{
        let teacher=await Teacher.findMany()
        if (teacher){
            resp.render("getAll.hbs", {layout: false, data: teacher, title: "All teachers"})
        } else {
            resp.status(500).send("error")
        }
    },
    getUnique: async (req, resp)=>{
        const id=req.params.id
        let teacher=await Teacher.findUnique({
            where: {
                TEACHER_ID: id
            }
        })
        if (teacher) {
            resp.render("getOne.hbs", {layout: false, title: "One teacher",data: teacher})
        } else {
            resp.status(500).send("not found")
        }
    },
    addTeacher: async (req, resp)=>{
        const newTeacher={
            TEACHER_ID: req.body.TEACHER_ID,
            TEACHER_NAME: req.body.TEACHER_NAME,
            PULPIT: req.body.PULPIT
        }
        let teacher=await Teacher.findUnique({where:{TEACHER_ID: newTeacher.TEACHER_ID}})
        if (teacher){
            resp.status(500).send("already exists")
        }
        else {
            await Teacher.create({
                data: {
                    TEACHER_ID: newTeacher.TEACHER_ID,
                    TEACHER_NAME: newTeacher.TEACHER_NAME,
                    PULPIT: newTeacher.PULPIT
                }
            })
            resp.redirect(303,"/teacher")
        }
    },
    updateTeacher: async (req,resp)=>{
        const newTeacher={
            TEACHER_ID: req.body.TEACHER_ID,
            TEACHER_NAME: req.body.TEACHER_NAME,
            PULPIT: req.body.PULPIT
        }
        Teacher.update({
                data:{
                    TEACHER_NAME: newTeacher.TEACHER_NAME,
                    PULPIT: newTeacher.PULPIT
            },
                where: {
                    TEACHER_ID: newTeacher.TEACHER_ID
        }})
        .then(()=>{
            resp.redirect(303, "/teacher")
        })
        .catch(()=>{
            resp.status(500).send("id not found")
        })
    },
    deleteTeacher: async (req,resp)=>{
        Teacher.delete({
            where: {TEACHER_ID: req.params.id}
        })
        .then(()=>{
            resp.redirect(303, "/teacher")
        })
        .catch(()=>{
            resp.status(500).send("id not found")
        })
    }
}