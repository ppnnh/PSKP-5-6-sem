module.exports={
    main: async (req,resp)=>{
        resp.render("main.hbs",{
            title: "Click",
            data: {
                FACULTY: "",
                PULPIT: "",
                TEACHER: "",
                SUBJECT: "",
                GROUP: ""
            }
        })
    }
}