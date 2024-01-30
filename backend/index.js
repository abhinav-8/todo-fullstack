    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');
    const { createTodo, updateTodo } = require('./types');
const { todo } = require('./db');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));


    app.post("/todos" , async function(req,res) {
        
        const payload = req.body;
        
        const parsedPayload = createTodo.safeParse(payload);
        
        if(!parsedPayload.success) {
        
            res.status(411).json({
                success:false,
                msg:"Invalid inputs"
            });
            return;

        }
        
        try {
            
            await todo.create({
                title: parsedPayload.title,
                description: parsedPayload.description,
                completed: false,
            })

            res.status(200).json({
                success:true,
                msg:"Todo created"
            })

        } catch (error) {
            
            res.status(500).json({
                success:false,
                msg:"Some error occurred"
            })

        }
        
    })

    app.put("/completed", async function(req,res){
        
        const payload = req.body;
        const parsedPayload = updateTodo.safeParse(payload);

        if(!parsedPayload.success) {
            res.status(411).json({
                success:false,
                msg:"Invalid inputs"
            });
            return;
        }

        try {
            
            await todo.update({
                _id: req.body
            },{
                completed:true
            })

            res.status(200).json({
                success:true,
                msg:"Todo updated"
            })

        } catch (error) {
            res.status(500).json({
                success:false,
                msg:"Can't update todo"
            })
        }   

    })

    app.get("/todos", async function(req,res){

        try {

            const todos = todo.find();

            res.status(200).json({
                success:true,
                todos,
            });

        } catch (error) {
            
            res.status(500).json({
                success:false,
                msg:"Some error occurred"
            });

        }

    })

    app.listen(3001,()=>{
        console.log("Server started at 3001");
    });