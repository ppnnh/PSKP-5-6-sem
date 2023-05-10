const express=require("express")
const teacherController = require("../controllers/teacher")

module.exports=()=>{
    var router=express.Router()

    router.get("/", teacherController.getAll)
    router.get("/:id", teacherController.getUnique)
    router.post("/", teacherController.addTeacher)
    router.put("/", teacherController.updateTeacher)
    router.delete("/:id",teacherController.deleteTeacher)

    return router
}