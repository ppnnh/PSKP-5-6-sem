const express=require("express")
const postController=require("../controllers/post")

module.exports=()=>{
    var router=express.Router()

    router.get("/faculty",postController.postFaculty)
    router.get("/pulpit",postController.postPulpit)
    router.get("/teacher",postController.postTeacher)
    router.get("/subject",postController.postSubject)
    router.get("/group",postController.postGroup)
    
    return router
}