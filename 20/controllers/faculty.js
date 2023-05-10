
const prisma=require("../index")()
const Faculty=prisma.FACULTY

module.exports={
    getAll: async (req,resp)=>{
        let faculties=await Faculty.findMany()
        if (faculties){
            resp.render("getAll.hbs", {layout: false, data: faculties, title: "All faculties"})
        } else {
            resp.status(500).send("error")
        }
    },
    getUnique: async (req, resp)=>{
        const id=req.params.id
        let faculty=await Faculty.findUnique({
            where: {
                FACULTY_ID: id
            }
        })
        if (faculty) {
            resp.render("getOne.hbs", {layout: false, title: "One faculty",data: faculty})
        } else {
            resp.status(500).send("not found")
        }
    },
    addFaculty: async (req, resp)=>{
        const newFaculty={
            FACULTY_ID: req.body.FACULTY_ID,
            FACULTY_NAME: req.body.FACULTY_NAME
        }
        let faculty=await Faculty.findUnique({where:{FACULTY_ID: newFaculty.FACULTY_ID}})
        if (faculty){
            resp.status(500).send("already exists")
        }
        else {
            await Faculty.create({
                data: {
                    FACULTY_ID: newFaculty.FACULTY_ID,
                    FACULTY_NAME: newFaculty.FACULTY_NAME
                }
            })
            resp.redirect(303,"/faculty")
        }
    },
    updateFaculty: async (req,resp)=>{
        const newFaculty={
            FACULTY_ID: req.body.FACULTY_ID,
            FACULTY_NAME: req.body.FACULTY_NAME
        }
        Faculty.update({
                data:{
                    FACULTY_NAME: newFaculty.FACULTY_NAME
            },
                where: {
                    FACULTY_ID: newFaculty.FACULTY_ID
        }})
        .then(()=>{
            resp.redirect(303, "/faculty")
        })
        .catch(()=>{
            resp.status(500).send("id not found")
        })
    },
    deleteFaculty: async (req,resp)=>{
        Faculty.delete({
            where: {FACULTY_ID: req.params.id}
        })
        .then(()=>{
            resp.redirect(303, "/faculty")
        })
        .catch(()=>{
            resp.status(500).send("id not found")
        })
    }
}