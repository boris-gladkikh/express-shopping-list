const express = require("express");
const itemRoutes = require("./items.js");


const app = express();

// for processing JSON:
app.use(express.json());

// for processing forms:
app.use(express.urlencoded({ extended: true }));
console.log("here we are\n\n\n\n\n");

app.use("/items",itemRoutes);

app.get("/", function(req,res){
  return res.json({hello:"world"})
});


app.listen(3000, function(){
  console.log("will this nightmare ever end?")
})