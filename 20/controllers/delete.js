
module.exports={
    deleteFaculty: async (req,resp)=>{
        resp.render("delete.hbs",{
            title: "Delete faculty",
            model: "faculty"
        })
    },
    deletePulpit: async (req,resp)=>{
        resp.render("delete.hbs",{
            title: "Delete pulpit",
            model: "pulpit"
        })
    },
    deleteTeacher: async (req,resp)=>{
        resp.render("delete.hbs",{
            title: "Delete teacher",
            model: "teacher"
        })
    },
    deleteSubject: async (req,resp)=>{
        resp.render("delete.hbs",{
            title: "Delete subject",
            model: "subject"
        })
    },
    deleteGroup: async (req,resp)=>{
        resp.render("delete.hbs",{
            title: "Delete group",
            model: "group"
        })
    }
}