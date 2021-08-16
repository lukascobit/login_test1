const express = require("express");
const app = express()
const cors = require("cors")
const pool = require("./db")


//middleware
app.use(cors());
app.use(express.json())


//ROUTES//

//create

app.post("/posts", async(req, res)=>{
    try {
        const respo = req.body
        console.log(respo);
        const newTodo = await pool.query("INSERT INTO posts (body, username, pfp_url) VALUES($1, $2, $3) RETURNING *",
         [respo[0].body, respo[1].username, respo[2].pfp_url]);
        console.log(newTodo);
        res.json(newTodo.rows[0])
    } catch (error) {
        console.log(error);
    }
})

//get all

app.get("/posts", async (req, res) => {
    try {
      const allposts = await pool.query("SELECT * FROM posts");
      res.json(allposts.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
  

//get one

app.get("/posts/:id", async(req, res)=>{
    try {
        const {id} = req.params
        const todo = await pool.query("SELECT * FROM posts WHERE id = $1", [id])
        
        res.json(todo.rows[0])
    } catch (error) {
        console.log(error);
    }
})

//update 

app.put("/posts/:id", async(req, res)=>{
    try {
        const {id} = req.params
        const respo = req.body
        console.log(respo);

        const updateTodo = await pool.query("UPDATE posts SET body = $1", [respo[0].body, id]);

        res.json("todo was updated")
    } catch (error) {
        console.log(error);
    }
})

//delete

app.delete("/posts/:id", async(req, res)=>{
    try {
        const {id} = req.params
        const deleteTodo = await pool.query("DELETE FROM posts WHERE id = $1", [id]);
        res.json("Todo was deleted!")
    } catch (error) {
        console.log(error);
    }
})

const port = process.env.port || 4001

app.listen(port, ()=>{
    console.log(`listening on port ${port}`);
})