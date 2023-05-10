const res = require("express/lib/response")

const prisma=require("../index")()
const Group=prisma.GROUPS

module.exports={
    getAll: async (req,resp)=>{
        let groups=await Group.findMany()
        if (groups){
            resp.render("getAll.hbs", {layout: false, data: groups, title: "All groups"})
        } else {
            resp.status(500).send("error")
        }
    },
    getUnique: async (req, resp)=>{
        const id=req.params.id
        let group=await Group.findUnique({
            where: {
                GROUP_ID: id
            }
        })
        if (group) {
            resp.render("getOne.hbs", {layout: false, title: "One group",data: group})
        } else {
            resp.status(500).send("not found")
        }
    },
    addGroup: async (req, resp)=>{
        const newGroup={
            GROUP_ID: req.body.GROUP_ID,
            GROUP_CODE: req.body.GROUP_CODE,
            GROUP_SPECIALITY: req.body.GROUP_SPECIALITY,
            PULPIT:  req.body.PULPIT
        }
        let group=await Group.findUnique({where:{GROUP_ID: +newGroup.GROUP_ID}})
        if (group){
            resp.status(500).send("already exists")
        }
        else {
            await Group.create({
                data: {
                    GROUP_ID: +newGroup.GROUP_ID,
                    GROUP_CODE: newGroup.GROUP_CODE,
                    GROUP_SPECIALITY: newGroup.GROUP_SPECIALITY,
                    PULPIT: newGroup.PULPIT
                }
            })
            resp.redirect(303,"/group")
        }
    },
    updateGroup: async (req,resp)=>{
        const newGroup={
            GROUP_ID: req.body.GROUP_ID,
            GROUP_CODE: req.body.GROUP_CODE,
            GROUP_SPECIALITY: req.body.GROUP_SPECIALITY,
            PULPIT: req.body.PULPIT
        }
        Group.update({
                data:{
                    GROUP_CODE: newGroup.GROUP_CODE,
                    GROUP_SPECIALITY: newGroup.GROUP_SPECIALITY,
                    PULPIT: newGroup.PULPIT
            },
                where: {
                    GROUP_ID: +newGroup.GROUP_ID
        }})
        .then(()=>{
            resp.redirect(303, "/group")
        })
        .catch(()=>{
            resp.status(500).send("id not found")
        })
    },
    deleteGroup: async (req,resp)=>{
        Group.delete({
            where: {GROUP_ID: +req.params.id}
        })
        .then(()=>{
            resp.redirect(303, "/group")
        })
        .catch(()=>{
            resp.status(500).send("id not found")
        })
    }
}