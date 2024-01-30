    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const { createTodo, updateTodo } = require('./types');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));


    app.post("/todos" , function(req,res) {
        const payload = req.body;
        const parsedPayload = createTodo.safeParse(payload);
        if(!parsedPayload.success) {
            res.status(411).json({
                success:false,
                msg:"Invalid inputs"
            });
        }
        //put it in mongo
    })

    app.put("/completed", function(req,res){
        const payload = req.body;
        const parsedPayload = updateTodo.safeParse(payload);

        if(!parsedPayload.success) {
            res.status(411).json({
                success:false,
                msg:"Invalid inputs"
            })
        }
    })

    app.get("/todos", function(req,res){

    })

    app.listen(3001,()=>{
        console.log("Server started at 3001");
    });