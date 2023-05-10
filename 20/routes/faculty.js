const express=require("express")
const facultyController = require("../controllers/faculty")

module.exports=()=>{
    var router=express.Router()

    router.get("/", facultyController.getAll)
    router.get("/:id", facultyController.getUnique)
    router.post("/", facultyController.addFaculty)
    router.put("/", facultyController.updateFaculty)
    router.delete("/:id",facultyController.deleteFaculty)

    return router
}