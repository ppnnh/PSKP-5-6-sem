var util=require('util');
var ee=require('events');

var db_data=[
    {id: 1, name: 'Dasha', bday:'2002-20-04'},
    {id: 2, name: 'Nastya', bday:'2003-02-05'},
    {id: 3, name: 'Karina', bday:'2003-05-18'},
    {id: 4, name: 'Andrey', bday:'2003-02-01'},
    {id: 5, name: 'Vika', bday:'2002-02-01'},
    {id: 6, name: 'Egor', bday:'2003-01-20'}
];

function DB(){
    this.select=()=>
    {
        return db_data;
    };
    this.insert=(x)=>
    {
        let index=db_data.findIndex(item=> item.id==x.id);
        if(index==-1){
        db_data.push(x)
        }
        else console.log('error');
    };
    this.update=(x)=>
    {
        let index=db_data.findIndex(item=> item.id==x.id);
        if(index !== -1){
        return db_data.splice(index,1,x);
        }
        else console.log('error');
    };
    this.delete=(id)=>
    {
        let index=db_data.findIndex((elem)=> elem.id==id);
        if (index !== -1){
            return db_data.splice(index, 1);
        }
        else {
            return JSON.parse('{"error": "no index"}');
        }
    }
}

util.inherits(DB, ee.EventEmitter);

exports.DB=DB;