const mongoClient = require('mongodb').MongoClient //connection 

const state={
    db:null
}

//conect Cheyan Vendi

module.exports.connect= function(done){
  // const url ='mongodb://localhost:27017'
    const url ="mongodb+srv://muhthar:muhthar@cluster0.c0pyjlk.mongodb.net/todoApp?retryWrites=true&w=majority"
    const dbname='todoApp'

 //   const dbname='Todo'

    mongoClient.connect(url,(err,data)=>{
        if(err) return done(err)

        state.db=data.db(dbname)
        done()
    })
}

//connect Chytha database edukkan vendi

module.exports.get=function(){
    return state.db
}