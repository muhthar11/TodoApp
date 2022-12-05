var db = require('../config/connection');
var collections = require('../config/collections');
var objectId =require('mongodb').ObjectId;

module.exports = {

    saveProduct:(list,id)=>{
       if(id==''){
        return new Promise(async(resolve,reject)=>{
        
            list.createdDate =new Date();
            list.recordStatusId =1;

                db.get().collection(collections.TODO_COLLECTION).insertOne(list).then((data)=>{
                  resolve(data);
                })
          
          })
       }
       else{
        return new Promise(async(resolve,reject)=>{
        
            list.createdDate =new Date();
            list.recordStatusId = 1;

              db.get().collection(collections.TODO_COLLECTION).update({_id:objectId(id)},{
                $set:{
                    itemName:list.itemName,
                
    
                    modifiedDate:new Date(),
                    recordStatusId : 1,
                }
                }).then((response)=>{
                    resolve(response)
                })
          
          })
       }
     
    },

    deleteProduct:(id)=>{
        return new Promise(async(resolve,reject)=>{

              db.get().collection(collections.TODO_COLLECTION).update({_id:objectId(id)},{
                $set:{
                    modifiedDate:new Date(),
                    recordStatusId : 3,
                }
                }).then((response)=>{
                    resolve(response)
                })
          
          })
    },


    getProduct:(id)=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collections.TODO_COLLECTION).findOne({_id:objectId(id)}).then((data)=>{
                resolve(data)
            })
        })
    },

    getProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collections.TODO_COLLECTION).find({recordStatusId:1}).toArray().then((data)=>{
                resolve(data)
            })
        })
    },

    getRemoveProducts:()=>{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(collections.TODO_COLLECTION).find({recordStatusId:3}).toArray().then((data)=>{
                resolve(data)
            })
        })
    }

}