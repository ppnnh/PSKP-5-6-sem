const express=require("express")
const mainController=require("../controllers/main")

module.exports=()=>{
    var router=express.Router()

    router.get("/", mainController.main)
   
    return router
}