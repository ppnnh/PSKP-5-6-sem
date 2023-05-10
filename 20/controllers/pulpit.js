const res = require("express/lib/response")

const prisma=require("../index")()
const Pulpit=prisma.PULPIT

module.exports={
    getAll: async (req,resp)=>{
        let pulpits=await Pulpit.findMany()
        if (pulpits){
            resp.render("getAll.hbs", {layout: false, data: pulpits, title: "All pulpits"})
        } else {
            resp.status(500).send("error")
        }
    },
    getUnique: async (req, resp)=>{
        const id=req.params.id
        let pulpit=await Pulpit.findUnique({
            where: {
                PULPIT_ID: id
            }
        })
        if (pulpit) {
            resp.render("getOne.hbs", {layout: false, title: "One pulpit",data: pulpit})
        } else {
            resp.status(500).send("not found")
        }
    },
    addPulpit: async (req, resp)=>{
        const newPulpit={
            PULPIT_ID: req.body.PULPIT_ID,
            PULPIT_NAME: req.body.PULPIT_NAME,
            FACULTY: req.body.FACULTY
        }
        let pulpit=await Pulpit.findUnique({where:{PULPIT_ID: newPulpit.PULPIT_ID}})
        if (pulpit){
            resp.status(500).send("already exists")
        }
        else {
            await Pulpit.create({
                data: {
                    PULPIT_ID: newPulpit.PULPIT_ID,
                    PULPIT_NAME: newPulpit.PULPIT_NAME,
                    FACULTY: newPulpit.FACULTY
                }
            })
            resp.redirect(303,"/pulpit")
        }
    },
    updatePulpit: async (req,resp)=>{
        const newPulpit={
            PULPIT_ID: req.body.PULPIT_ID,
            PULPIT_NAME: req.body.PULPIT_NAME,
            FACULTY: req.body.FACULTY
        }
        Pulpit.update({
                data:{
                    PULPIT_NAME: newPulpit.PULPIT_NAME,
                    FACULTY: newPulpit.FACULTY
            },
                where: {
                    PULPIT_ID: newPulpit.PULPIT_ID
        }})
        .then(()=>{
            resp.redirect(303, "/pulpit")
        })
        .catch(()=>{
            resp.status(500).send("id not found")
        })
    },
    deletePulpit: async (req,resp)=>{
        Pulpit.delete({
            where: {PULPIT_ID: req.params.id}
        })
        .then(()=>{
            resp.redirect(303, "/pulpit")
        })
        .catch(()=>{
            resp.status(500).send("id not found")
        })
    }
}