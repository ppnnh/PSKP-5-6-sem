module.exports={
    postFaculty: async (req,resp)=>{
        resp.render("post.hbs",{
            title: "Post faculty",
            data: {
                FACULTY_ID: "",
                FACULTY_NAME: ""
            },
            model: "faculty"
        })
    },
    postPulpit: async (req,resp)=>{
        resp.render("post.hbs",{
            title: "Post pulpit",
            data: {
                PULPIT_ID: "",
                PULPIT_NAME: "",
                FACULTY: ""
            },
            model: "pulpit"
        })
    },
    postTeacher: async (req,resp)=>{
        resp.render("post.hbs",{
            title: "Post teacher",
            data: {
                TEACHER_ID: "",
                TEACHER_NAME: "",
                PULPIT: ""
            },
            model: "teacher"
        })
    },
    postSubject: async (req,resp)=>{
        resp.render("post.hbs",{
            title: "Post subject",
            data: {
                SUBJECT_ID: "",
                SUBJECT_NAME: "",
                PULPIT: ""
            },
            model: "subject"
        })
    },
    postGroup: async (req,resp)=>{
        resp.render("post.hbs",{
            title: "Post group",
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