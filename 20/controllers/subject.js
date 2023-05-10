const res = require("express/lib/response")

const prisma=require("../index")()
const Subject=prisma.SUBJECT

module.exports={
    getAll: async (req,resp)=>{
        let subject=await Subject.findMany()
        if (subject){
            resp.render("getAll.hbs", {layout: false, data: subject, title: "All subjects"})
        } else {
            resp.status(500).send("error")
        }
    },
    getUnique: async (req, resp)=>{
        const id=req.params.id
        let subject=await Subject.findUnique({
            where: {
                SUBJECT_ID: id
            }
        })
        if (subject) {
            resp.render("getOne.hbs", {layout: false, title: "One subject",data: subject})
        } else {
            resp.status(500).send("not found")
        }
    },
    addSubject: async (req, resp)=>{
        const newSubject={
            SUBJECT_ID: req.body.SUBJECT_ID,
            SUBJECT_NAME: req.body.SUBJECT_NAME,
            PULPIT: req.body.PULPIT
        }
        let subject=await Subject.findUnique({where:{SUBJECT_ID: newSubject.SUBJECT_ID}})
        if (subject){
            resp.status(500).send("already exists")
        }
        else {
            await Subject.create({
                data: {
                    SUBJECT_ID: newSubject.SUBJECT_ID,
                    SUBJECT_NAME: newSubject.SUBJECT_NAME,
                    PULPIT: newSubject.PULPIT
                }
            })
            resp.redirect(303,"/subject")
        }
    },
    updateSubject: async (req,resp)=>{
        const newSubject={
            SUBJECT_ID: req.body.SUBJECT_ID,
            SUBJECT_NAME: req.body.SUBJECT_NAME,
            PULPIT: req.body.PULPIT
        }
        Subject.update({
                data:{
                    SUBJECT_NAME: newSubject.SUBJECT_NAME,
                    PULPIT: newSubject.PULPIT
            },
                where: {
                    SUBJECT_ID: newSubject.SUBJECT_ID
        }})
        .then(()=>{
            resp.redirect(303, "/subject")
        })
        .catch(()=>{
            resp.status(500).send("id not found")
        })
    },
    deleteSubject: async (req,resp)=>{
        Subject.delete({
            where: {SUBJECT_ID: req.params.id}
        })
        .then(()=>{
            resp.redirect(303, "/subject")
        })
        .catch(()=>{
            resp.status(500).send("id not found")
        })
    }
}