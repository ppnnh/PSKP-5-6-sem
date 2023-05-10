const express=require("express")
const subjectController = require("../controllers/subject")

module.exports=()=>{
    var router=express.Router()

    router.get("/", subjectController.getAll)
    router.get("/:id", subjectController.getUnique)
    router.post("/", subjectController.addSubject)
    router.put("/", subjectController.updateSubject)
    router.delete("/:id",subjectController.deleteSubject)

    return router
}