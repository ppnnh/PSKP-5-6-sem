module.exports={
    putFaculty: async (req,resp)=>{
        resp.render("put.hbs",{
            title: "Put faculty",
            data: {
                FACULTY_ID: "",
                FACULTY_NAME: ""
            },
            model: "faculty"
        })
    },
    putPulpit: async (req,resp)=>{
        resp.render("put.hbs",{
            title: "Put pulpit",
            data: {
                PULPIT_ID: "",
                PULPIT_NAME: "",
                FACULTY: ""
            },
            model: "pulpit"
        })
    },
    putTeacher: async (req,resp)=>{
        resp.render("put.hbs",{
            title: "Put teacher",
            data: {
                TEACHER_ID: "",
                TEACHER_NAME: "",
                PULPIT: ""
            },
            model: "teacher"
        })
    },
    putSubject: async (req,resp)=>{
        resp.render("put.hbs",{
            title: "Put subject",
            data: {
                SUBJECT_ID: "",
                SUBJECT_NAME: "",
                PULPIT: ""
            },
            model: "subject"
        })
    },
    putGroup: async (req,resp)=>{
        resp.render("put.hbs",{
            title: "Put group",
            data: {
                GROUP_ID: "",
                GROUP_CODE: "",
                GROUP_SPECIALITY: "",
                PULPIT: ""
            },
            model: "group"
        })
    }
}