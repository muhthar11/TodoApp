let express = require('express');
let router = express.Router();
let todoService = require("../service/todo-services")

/* GET home page. */
router.get('/', function(req, res, next) {
  todoService.getProducts().then((result)=>{
    todoService.getRemoveProducts().then((removeResult)=>{
      res.render('index',{TodoList:result,TodoRemoveList:removeResult});
    })
  }).catch((err)=>{
    console.log("error found",err);
  })
});

router.post('/add', function(req, res, next) {
   todoService.saveProduct(req.body,req.query.id).then((result)=>{
    todoService.getProducts().then((result)=>{
      todoService.getRemoveProducts().then((removeResult)=>{
        res.render('index',{TodoList:result,TodoRemoveList:removeResult});
      })
    })
  }).catch((err)=>{
    console.log("error found",err);
})
})
router.get('/edit', function(req, res, next) {
    todoService.getProduct(req.query.id).then((data)=>{
      todoService.getProducts().then((result)=>{
      console.log("editresult=",data)
        res.render('index',{TodoList:result,Tododetails:data});
      })
  }).catch((err)=>{
    console.log("error found",err);
})

});

router.get('/delete', function(req, res, next) {
    todoService.deleteProduct(req.query.id).then((data)=>{
      todoService.getProducts().then((result)=>{
      console.log("editresult=",data)
        res.redirect('/');
      })
  }).catch((err)=>{
    console.log("error found",err);
})
});
module.exports = router;
