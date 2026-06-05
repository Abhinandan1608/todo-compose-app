const express = require("express");

const { MongoClient, ObjectId } = require("mongodb");
const app = express();

app.use(express.json());

const url = process.env.MONGO_URL;

let db;

MongoClient.connect(url)
    .then(client => {
        db = client.db("todoDB");
        console.log("MongoDB Connected");
    })
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Todo API Running");
});

/*
CREATE TODO
*/
app.post("/todos", async (req, res) => {
  try {
    const todo = {
      title: req.body.title
    };

    const result = await db.collection("todos").insertOne(todo);

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
GET ALL TODOS
*/
app.get("/todos", async (req, res) => {
  try {
    const todos = await db
      .collection("todos")
      .find({})
      .toArray();

    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/*
DELETE TODO
*/
app.delete("/todos/:id", async (req, res) => {
  try {
    const result = await db
      .collection("todos")
      .deleteOne({
        _id: new ObjectId(req.params.id)
      });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




app.listen(8000, () => {
    console.log("Server running on port 8000");
});