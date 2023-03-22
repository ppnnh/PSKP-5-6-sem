const {Sequelize,Model}=require("sequelize");
const Op=Sequelize.Op;
const sequelize=new Sequelize(
        "BVD","student","fitfit",{host:"localhost",
        dialect:"mssql",
        define:{
            hooks:{
                beforeBulkDestroy(){
                    console.log("---global beforeDestroy----");
                }
            }
        }},
        {pool:
            {max:5,min:0}
        }
    );

const http=require("http");
const url=require("url");
const fs=require("fs");

class Faculty extends Model{};
class Pulpit extends Model{};
class Teacher extends Model{};
class Subject extends Model{};
class Auditorium_type extends Model{};
class Auditorium extends Model{};

    Faculty.init(
        {
            FACULTY: {type: Sequelize.STRING, allowNull:false, primaryKey:true},
            FACULTY_NAME:{type: Sequelize.STRING, allowNull:false}
        },{
            sequelize, modelName:"Faculty", tableName:"FACULTY", timestamps:false
        }
    );
    Pulpit.init(
        {
            PULPIT: {type: Sequelize.STRING, allowNull:false, primaryKey:true},
            PULPIT_NAME:{type: Sequelize.STRING, allowNull:false},
            FACULTY: {type: Sequelize.STRING,allowNull:false,
                    references: {model: Faculty, key: "FACULTY"}}
        },{
            sequelize, modelName:"Pulpit", tableName:"PULPIT", timestamps:false
        }
    );
    Teacher.init(
        {
            TEACHER: {type: Sequelize.STRING, allowNull:false, primaryKey:true},
            TEACHER_NAME:{type: Sequelize.STRING, allowNull:false},
            PULPIT: {type: Sequelize.STRING,allowNull:false,
                    references: {model: Pulpit, key: "PULPIT"}}
        },{
            sequelize, modelName:"Teacher", tableName:"TEACHER", timestamps:false
        }
    );
    Subject.init(
        {
            SUBJECT: {type: Sequelize.STRING, allowNull:false, primaryKey:true},
            SUBJECT_NAME:{type: Sequelize.STRING, allowNull:false},
            PULPIT: {type: Sequelize.STRING,allowNull:false,
                    references: {model: Pulpit, key: "PULPIT"}}
        },{
            sequelize, modelName:"Subject", tableName:"SUBJECT", timestamps:false
        }
    );
    Auditorium_type.init(
        {
            AUDITORIUM_TYPE: {type: Sequelize.STRING, allowNull:false, primaryKey:true},
            AUDITORIUM_TYPENAME:{type: Sequelize.STRING, allowNull:false},
        },{
            sequelize, modelName:"Auditorium_type", tableName:"AUDITORIUM_TYPE", timestamps:false
        }
    );
    Auditorium.init(
        {
            AUDITORIUM: {type: Sequelize.STRING, allowNull:false, primaryKey:true},
            AUDITORIUM_NAME:{type: Sequelize.STRING, allowNull:false},
            AUDITORIUM_CAPACITY: {type: Sequelize.INTEGER, allowNull:false},
            AUDITORIUM_TYPE:{type: Sequelize.STRING, allowNull:false,
                            references: {model: Auditorium_type, key: "AUDITORIUM_TYPE"}},
        },
        {
            sequelize: sequelize, modelName:"Auditorium", tableName:"AUDITORIUM", timestamps:false
        }
    );
    Faculty.hasMany(Pulpit, {
        foreignKey: 'FACULTY',
        onDelete: 'CASCADE'
    });
    Pulpit.hasMany(Subject, {
        foreignKey: 'PULPIT',
        onDelete: 'CASCADE'
    });
    Pulpit.hasMany(Teacher,{
        foreignKey:'PULPIT',
        onDelete: 'CASCADE'
    })
    Auditorium_type.hasMany(Auditorium,{
        foreignKey:'AUDITORIUM_TYPE',
        onDelete: 'CASCADE'
    })

    Auditorium.addScope("auditoriumsCapacity", (a,b)=> ({
        where: {AUDITORIUM_CAPACITY: {[Op.between]: [a,b]}}
    }))

    Faculty.addHook("beforeCreate", (instance,options)=>{
        console.log("-----local faculty beforeCreate------");
    })

    Faculty.addHook("afterCreate", (instance,options)=>{
        console.log("-----local faculty afterCreate------");
    })


sequelize.authenticate() 
.then(()=>{
    console.log("connected");
    http.createServer((req,resp)=>{
        let subjectsByFaculty=new RegExp("/api/faculties/[A-Za-zА-Яа-я]{0,6}/subjects",'g');
        let auditoriumsByTypes=new RegExp("/api/auditoriumstypes/[A-Za-zА-Яа-я-]{0,6}/auditoriums",'g');
        let codeDelete=new RegExp("[A-Za-zА-Яа-я-]{0,6}",'g');
        let auditoriumCapacity=new RegExp("/api/auditoriumscapacity/[0-9]{0,3}/[0-9]{0,3}")
        //-------------------GET---------------------------------------------------------------------------
        if (req.method=="GET"){
            if (url.parse(req.url).pathname=="/"){
                resp.writeHead(200,{"Content-Type":"text/html"});
                let html=fs.readFileSync("index.html");
                console.log(url.parse(req.url).pathname)
                resp.end(html);
            } 
            else 
            if (url.parse(req.url).pathname=="/api/faculties"){
                resp.writeHead(200,{"Content-Type":"application/json"});
                Faculty.findAll()
                .then(table=>{resp.end(JSON.stringify(table));})
                .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
            }
            else
            if (url.parse(req.url).pathname=="/api/pulpits"){
                resp.writeHead(200,{"Content-Type":"application/json"});
                Pulpit.findAll()
                .then(table=>{resp.end(JSON.stringify(table));})
                .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
            }
            else
            if (url.parse(req.url).pathname=="/api/pulpits"){
                resp.writeHead(200,{"Content-Type":"application/json"});
                Pulpit.findAll()
                .then(table=>{resp.end(JSON.stringify(table));})
                .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
            }
            else
            if (url.parse(req.url).pathname=="/api/subjects"){
                resp.writeHead(200,{"Content-Type":"application/json"});
                Subject.findAll()
                .then(table=>{resp.end(JSON.stringify(table));})
                .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
            }
            else
            if (url.parse(req.url).pathname=="/api/teachers"){
                resp.writeHead(200,{"Content-Type":"application/json"});
                Teacher.findAll()
                .then(table=>{resp.end(JSON.stringify(table));})
                .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
            }
            else
            if (url.parse(req.url).pathname=="/api/auditoriumstypes"){
                resp.writeHead(200,{"Content-Type":"application/json"});
                Auditorium_type.findAll()
                .then(table=>{resp.end(JSON.stringify(table));})
                .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
            }
            else
            if (url.parse(req.url).pathname=="/api/auditoriums"){
                resp.writeHead(200,{"Content-Type":"application/json"});
                Auditorium.findAll()
                .then(table=>{resp.end(JSON.stringify(table));})
                .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
            }
            else
            if (subjectsByFaculty.test(decodeURI(url.parse(req.url).pathname))){
                resp.writeHead(200,{"Content-Type":"application/json"});
                let code=decodeURI(url.parse(req.url).pathname.split("/")[3]);
                Faculty.findAll({
                    where:{
                        FACULTY: code
                    },
                    include: [
                        {model: Pulpit, required:true,
                            include:[
                                {model: Subject, required:true}
                            ]
                        }
                    ]
                })
                .then(table=>{resp.end(JSON.stringify(table));})
                .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
            }
            else
            if (auditoriumsByTypes.test(decodeURI(url.parse(req.url).pathname))){
                resp.writeHead(200,{"Content-Type":"application/json"});
                let code=decodeURI(url.parse(req.url).pathname.split("/")[3]);
                Auditorium_type.findAll({
                    where:{
                        AUDITORIUM_TYPE: code
                    },
                    include: [
                        {model: Auditorium, required:true}
                    ]
                })
                .then(table=>{resp.end(JSON.stringify(table));})
                .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
            }else
            if (auditoriumCapacity.test(url.parse(req.url).pathname)){
                resp.writeHead(200,{"Content-Type":"application/json"});
                let a=url.parse(req.url).pathname.split("/")[3];
                let b=url.parse(req.url).pathname.split("/")[4];
                Auditorium.scope({method: ['auditoriumsCapacity', a, b]}).findAll()
                .then(table=>{resp.end(JSON.stringify(table));})
                .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
            }
        }
        else 
        //-----------------POST-----------------------------------------------------------
        if (req.method=="POST"){
            if (url.parse(req.url).pathname=="/api/faculties"){
                resp.writeHead(200,{"Content-Type":"application/json"});
                let body = ' ';
                req.on('data', chunk => {
                    body = chunk.toString();
                    body = JSON.parse(body);
                });
                req.on('end',  () => { 
                    Faculty.create({
                        FACULTY: body.FACULTY,
                        FACULTY_NAME: body.FACULTY_NAME
                    })
                    .then(table=>{resp.end(JSON.stringify(table));})
                    .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
                })
            }
            else
            if (url.parse(req.url).pathname=="/api/pulpits"){
                resp.writeHead(200,{"Content-Type":"application/json"});
                let body = ' ';
                req.on('data', chunk => {
                    body = chunk.toString();
                    body = JSON.parse(body);
                });
                req.on('end',  () => { 
                    Pulpit.create({
                        PULPIT: body.PULPIT,
                        PULPIT_NAME: body.PULPIT_NAME,
                        FACULTY: body.FACULTY
                    })
                    .then(table=>{resp.end(JSON.stringify(table));})
                    .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
                })
            }
            else
            if (url.parse(req.url).pathname=="/api/subjects"){
                resp.writeHead(200,{"Content-Type":"application/json"});
                let body = ' ';
                req.on('data', chunk => {
                    body = chunk.toString();
                    body = JSON.parse(body);
                });
                req.on('end',  () => { 
                    Subject.create({
                        SUBJECT: body.SUBJECT,
                        SUBJECT_NAME: body.SUBJECT_NAME,
                        PULPIT: body.PULPIT
                    })
                    .then(table=>{resp.end(JSON.stringify(table));})
                    .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
                })
            }
            else
            if (url.parse(req.url).pathname=="/api/teachers"){
                resp.writeHead(200,{"Content-Type":"application/json"});
                let body = ' ';
                req.on('data', chunk => {
                    body = chunk.toString();
                    body = JSON.parse(body);
                });
                req.on('end',  () => { 
                    Teacher.create({
                        TEACHER: body.TEACHER,
                        TEACHER_NAME: body.TEACHER_NAME,
                        PULPIT: body.PULPIT
                    })
                    .then(table=>{resp.end(JSON.stringify(table));})
                    .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
                })
            }
            else 
            if (url.parse(req.url).pathname=="/api/auditoriumstypes"){
                resp.writeHead(200,{"Content-Type":"application/json"});
                let body = ' ';
                req.on('data', chunk => {
                    body = chunk.toString();
                    body = JSON.parse(body);
                });
                req.on('end',  () => { 
                    Auditorium_type.create({
                        AUDITORIUM_TYPE: body.AUDITORIUM_TYPE,
                        AUDITORIUM_TYPENAME: body.AUDITORIUM_TYPENAME
                    })
                    .then(table=>{resp.end(JSON.stringify(table));})
                    .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
                })
            }
            else
            if (url.parse(req.url).pathname=="/api/auditoriums"){
                resp.writeHead(200,{"Content-Type":"application/json"});
                let body = ' ';
                req.on('data', chunk => {
                    body = chunk.toString();
                    body = JSON.parse(body);
                });
                req.on('end',  () => { 
                    Auditorium.create({
                        AUDITORIUM: body.AUDITORIUM,
                        AUDITORIUM_CAPACITY: body.AUDITORIUM_CAPACITY,
                        AUDITORIUM_NAME: body.AUDITORIUM_NAME,
                        AUDITORIUM_TYPE: body.AUDITORIUM_TYPE
                    })
                    .then(table=>{resp.end(JSON.stringify(table));})
                    .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
                })
            }
        }
        else
        //--------------PUT----------------------------------------------
        if (req.method=="PUT"){
            if (url.parse(req.url).pathname=="/api/faculties"){
                resp.writeHead(200,{"Content-Type":"application/json"});
                let body = ' ';
                req.on('data', chunk => {
                    body = chunk.toString();
                    body = JSON.parse(body);
                });
                req.on('end',  () => { 
                    Faculty.findAll({
                        where: {FACULTY: body.FACULTY}
                    })
                    .then(table=>{
                        console.log(table.length)
                        if (table.length==0){
                            resp.end(JSON.stringify({"error":"not found"}))
                        }
                        else {
                            resp.end(JSON.stringify(table));
                            Faculty.update({
                                FACULTY_NAME: body.FACULTY_NAME
                            },
                            {
                                where: {FACULTY: body.FACULTY}
                            }
                            );
                        }
                    })
                    .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
                })
            }
            else
            if (url.parse(req.url).pathname=="/api/pulpits"){
                resp.writeHead(200,{"Content-Type":"application/json"});
                let body = ' ';
                req.on('data', chunk => {
                    body = chunk.toString();
                    body = JSON.parse(body);
                });
                req.on('end',  () => { 
                    
                    Pulpit.findAll({
                        where: {PULPIT: body.PULPIT}
                    })
                    .then(table=>{
                        console.log(table.length)
                        if (table.length==0){
                            resp.end(JSON.stringify({"error":"not found"}))
                        }
                        else {
                            resp.end(JSON.stringify(table));
                            Pulpit.update({
                                PULPIT_NAME: body.PULPIT_NAME,
                                FACULTY: body.FACULTY
                            },
                            {
                                where: {PULPIT: body.PULPIT}
                            })
                        }
                    })
                    .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
                })
            }
            else
            if (url.parse(req.url).pathname=="/api/subjects"){
                resp.writeHead(200,{"Content-Type":"application/json"});
                let body = ' ';
                req.on('data', chunk => {
                    body = chunk.toString();
                    body = JSON.parse(body);
                });
                req.on('end',  () => { 
                   
                    Subject.findAll({
                        where: {SUBJECT: body.SUBJECT}
                    })
                    .then(table=>{
                        console.log(table.length)
                        if (table.length==0){
                            resp.end(JSON.stringify({"error":"not found"}))
                        }
                        else {
                            resp.end(JSON.stringify(table));
                            Subject.update({
                                SUBJECT_NAME: body.SUBJECT_NAME,
                                PULPIT: body.PULPIT
                            },
                            {
                                where: {SUBJECT: body.SUBJECT}
                            })
                        }
                    })
                    .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
                })
            }
            else
            if (url.parse(req.url).pathname=="/api/teachers"){
                resp.writeHead(200,{"Content-Type":"application/json"});
                let body = ' ';
                req.on('data', chunk => {
                    body = chunk.toString();
                    body = JSON.parse(body);
                });
                req.on('end',  () => { 
                   
                    Teacher.findAll({
                        where: {TEACHER: body.TEACHER}
                    })
                    .then(table=>{
                        console.log(table.length)
                        if (table.length==0){
                            resp.end(JSON.stringify({"error":"not found"}))
                        }
                        else {
                            resp.end(JSON.stringify(table));
                            Teacher.update({
                                TEACHER_NAME: body.TEACHER_NAME,
                                PULPIT: body.PULPIT
                            },
                            {
                                where: {TEACHER: body.TEACHER}
                            })
                        }
                    })
                    .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
                })
            }
            else 
            if (url.parse(req.url).pathname=="/api/auditoriumstypes"){
                resp.writeHead(200,{"Content-Type":"application/json"});
                let body = ' ';
                req.on('data', chunk => {
                    body = chunk.toString();
                    body = JSON.parse(body);
                });
                req.on('end',  () => { 
                   
                    Auditorium_type.findAll({
                        where: {AUDITORIUM_TYPE: body.AUDITORIUM_TYPE}
                    })
                    .then(table=>{
                        console.log(table.length)
                        if (table.length==0){
                            resp.end(JSON.stringify({"error":"not found"}))
                        }
                        else {
                            resp.end(JSON.stringify(table));
                            Auditorium_type.update({
                                AUDITORIUM_TYPENAME: body.AUDITORIUM_TYPENAME
                            },
                            {
                                where: {AUDITORIUM_TYPE: body.AUDITORIUM_TYPE}
                            })
                        }
                    })
                    .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
                })
            }
            else
            if (url.parse(req.url).pathname=="/api/auditoriums"){
                resp.writeHead(200,{"Content-Type":"application/json"});
                let body = ' ';
                req.on('data', chunk => {
                    body = chunk.toString();
                    body = JSON.parse(body);
                });
                req.on('end',  () => { 
                   
                    Auditorium.findAll({
                        where: {AUDITORIUM: body.AUDITORIUM}
                    })
                    .then(table=>{
                        console.log(table.length)
                        if (table.length==0){
                            resp.end(JSON.stringify({"error":"not found"}))
                        }
                        else {
                            resp.end(JSON.stringify(table));
                            Auditorium.update({
                                AUDITORIUM_CAPACITY: body.AUDITORIUM_CAPACITY,
                                AUDITORIUM_NAME: body.AUDITORIUM_NAME,
                                AUDITORIUM_TYPE: body.AUDITORIUM_TYPE
                            },
                            {
                                where: {AUDITORIUM: body.AUDITORIUM}
                            })
                        }
                    })
                    .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
                })
            }
        }
        else
        //-------------DELETE------------------------------------
        if (req.method=="DELETE"){ 
            if (url.parse(req.url).pathname.split("/")[2]=="faculties" && codeDelete.test(decodeURI(url.parse(req.url).pathname.split("/")[3]))){
                resp.writeHead(200,{"Content-Type":"application/json"});
                let code=decodeURI(url.parse(req.url).pathname.split("/")[3]);
                Faculty.findAll({
                    where: {FACULTY: code}
                })
                .then(table=>{
                    console.log(table.length)
                    if (table.length==0){
                        resp.end(JSON.stringify({"error":"not found"}))
                    }
                    else {
                        resp.end(JSON.stringify(table));
                        Faculty.destroy({
                            where: {FACULTY: code}
                        })
                    }
                })
                .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
            }
            else
            if (url.parse(req.url).pathname.split("/")[2]=="pulpits" && codeDelete.test(decodeURI(url.parse(req.url).pathname.split("/")[3]))){
                resp.writeHead(200,{"Content-Type":"application/json"});
                let code=decodeURI(url.parse(req.url).pathname.split("/")[3]);
               
                Pulpit.findAll({
                    where: {PULPIT: code}
                })
                .then(table=>{
                    console.log(table.length)
                    if (table.length==0){
                        resp.end(JSON.stringify({"error":"not found"}))
                    }
                    else {
                        resp.end(JSON.stringify(table));
                        Pulpit.destroy({
                            where: {PULPIT: code}
                        })
                    }
                })
                .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
                
            }
            else 
            if (url.parse(req.url).pathname.split("/")[2]=="teachers" && codeDelete.test(decodeURI(url.parse(req.url).pathname.split("/")[3]))){
                resp.writeHead(200,{"Content-Type":"application/json"});
                let code=decodeURI(url.parse(req.url).pathname.split("/")[3]);
                Teacher.findAll({
                    where: {TEACHER: code}
                })
                .then(table=>{
                    console.log(table.length)
                    if (table.length==0){
                        resp.end(JSON.stringify({"error":"not found"}))
                    }
                    else {
                        resp.end(JSON.stringify(table));
                        Teacher.destroy({
                            where: {TEACHER: code}
                        })
                    }
                })
                .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
            }
            else
            if (url.parse(req.url).pathname.split("/")[2]=="subjects" && codeDelete.test(decodeURI(url.parse(req.url).pathname.split("/")[3]))){
                resp.writeHead(200,{"Content-Type":"application/json"});
                let code=decodeURI(url.parse(req.url).pathname.split("/")[3]);
                Subject.findAll({
                    where: {SUBJECT: code}
                })
                .then(table=>{
                    console.log(table.length)
                    if (table.length==0){
                        resp.end(JSON.stringify({"error":"not found"}))
                    }
                    else {
                        resp.end(JSON.stringify(table));
                        Subject.destroy({
                            where: {SUBJECT: code}
                        })
                    }
                })
                .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
            }
            else 
            if (url.parse(req.url).pathname.split("/")[2]=="auditoriumstypes" && codeDelete.test(decodeURI(url.parse(req.url).pathname.split("/")[3]))){
                resp.writeHead(200,{"Content-Type":"application/json"});
                let code=decodeURI(url.parse(req.url).pathname.split("/")[3]);
                Auditorium_type.findAll({
                    where: {AUDITORIUM_TYPE: code}
                })
                .then(table=>{
                    console.log(table.length)
                    if (table.length==0){
                        resp.end(JSON.stringify({"error":"not found"}))
                    }
                    else {
                        resp.end(JSON.stringify(table));
                        Auditorium_type.destroy({
                            where: {AUDITORIUM_TYPE: code}
                        })
                    }
                })
                .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
            }
            else
            if (url.parse(req.url).pathname.split("/")[2]=="auditoriums" && codeDelete.test(decodeURI(url.parse(req.url).pathname.split("/")[3]))){
                resp.writeHead(200,{"Content-Type":"application/json"});
                let code=decodeURI(url.parse(req.url).pathname.split("/")[3]);
                Auditorium.findAll({
                    where: {AUDITORIUM: code}
                })
                .then(table=>{
                    console.log(table.length)
                    if (table.length==0){
                        resp.end(JSON.stringify({"error":"not found"}))
                    }
                    else {
                        resp.end(JSON.stringify(table));
                        Auditorium.destroy({
                            where: {AUDITORIUM: code}
                        })
                    }
                })
                .catch(err=>{console.log(err); resp.end(JSON.stringify(err));})
            }
        }
    }).listen(3000);
})

.then(() => {
    return sequelize.transaction({isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED})
        .then(t => {
            return Auditorium.update(
                {AUDITORIUM_CAPACITY: 0}, 
                {where: {AUDITORIUM_CAPACITY: {[Op.gte]: 0}},
                transaction: t
            })
                .then((r) => {
                    setTimeout(() => {
                        return t.rollback()
                    }, 10000);
                })
                .catch((e) => {
                    console.log(e.message);
                    return t.rollback();
                });
        })
})
.catch(err=>{console.log("error",err);});
