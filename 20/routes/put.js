    const express=require("express")
const putController=require("../controllers/put")

module.exports=()=>{
    var router=express.Router()

    router.get("/faculty",putController.putFaculty)
    router.get("/pulpit",putController.putPulpit)
    router.get("/teacher",putController.putTeacher)
    router.get("/subject",putController.putSubject)
    router.get("/group",putController.putGroup)

    return router
}