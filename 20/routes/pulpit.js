const express=require("express")
const pulpitController = require("../controllers/pulpit")

module.exports=()=>{
    var router=express.Router()

    router.get("/", pulpitController.getAll)
    router.get("/:id", pulpitController.getUnique)
    router.post("/", pulpitController.addPulpit)
    router.put("/", pulpitController.updatePulpit)
    router.delete("/:id",pulpitController.deletePulpit)

    return router
}