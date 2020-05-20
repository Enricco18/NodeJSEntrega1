const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

// { id: "uuid", 
//title: 'Desafio Node.js', 
//url: 'http://github.com/...', 
//techs: ["Node.js", "..."], 
//likes: 0 }

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title,url,techs} = request.body;
  const repo= {
    id:uuid(),
    title,
    url,
    techs,
    likes:0
  }
  repositories.push(repo)
  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title,url,techs} = request.body;
  const index = repositories.findIndex((item)=>{
    return item.id == id;
  })

  if(index<0){
    return response.status(400).json({error:"Not found"})
  }

  repositories[index] = {
    id : repositories[index].id,
    title: title?title:repositories[index].title,
    url: url?url:repositories[index].url,
    techs: techs?techs:repositories[index].techs,
    likes: repositories[index].likes
  }

  return response.json(repositories[index]);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const index = repositories.findIndex((item)=>{
    return item.id == id;
  })
  if(index<0){
    return response.status(400).json({error:"Not found"})
  }

  repositories.splice(index,1)
  return response.status(204).json(repositories);
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const index = repositories.findIndex((item)=>{
    return item.id == id;
  })
  if(index<0){
    return response.status(400).json({error:"Not found"})
  }

  repositories[index].likes +=1

  return response.json(repositories[index]);
});

module.exports = app;
