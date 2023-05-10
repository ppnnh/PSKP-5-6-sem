const PrismaClient=require("@prisma/client").PrismaClient

module.exports=()=>{
    const prisma=new PrismaClient({log: ['query']})
    return prisma
}