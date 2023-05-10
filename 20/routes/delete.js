const express=require("express")
const deleteController=require("../controllers/delete")

module.exports=()=>{
    var router=express.Router()

    router.get("/faculty",deleteController.deleteFaculty)
    router.get("/pulpit",deleteController.deletePulpit)
    router.get("/teacher",deleteController.deleteTeacher)
    router.get("/subject",deleteController.deleteSubject)
    router.get("/group",deleteController.deleteGroup)
    
    return router
}