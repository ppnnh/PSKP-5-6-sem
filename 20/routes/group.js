const express=require("express")
const groupController = require("../controllers/group")

module.exports=()=>{
    var router=express.Router()

    router.get("/", groupController.getAll)
    router.get("/:id", groupController.getUnique)
    router.post("/", groupController.addGroup)
    router.put("/", groupController.updateGroup)
    router.delete("/:id",groupController.deleteGroup)

    return router
}