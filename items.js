const express = require("express");
const router = new express.Router();
const items = require("./fakeDb.js");

router.use(express.json());


//gets list of all items

router.get("/", function (req, res) {
  return res.json(items)
});

//add an item to the shopping list

router.post("/", function (req, res) {
  let incomingItem = req.body;
  console.log("this is our incoming item", incomingItem);

  items.push(incomingItem);

  return res.json({ "added": incomingItem });

});

//return a specific item on shopping list

router.get("/:name", function (req, res, next) {
  let itemName = req.params.name;
  try {
    for (item of items) {
      if (item.name === itemName) {
        return res.json(item);
      }
    }
    return res.send(`${itemName} not found!`);
  } catch (err) {
    return next(err)
  }
});


//update an existing item's name and/or price

router.patch("/:name", function (req, res) {
  let itemName = req.params.name;
  let newName = req.body.name;
  let newPrice = req.body.price;

  for (item of items) {
    if (item.name === itemName) {
      if (newName) {
        item.name = newName;
      }
      if (newPrice) {
        item.price = newPrice;
      }

      return res.json(item);
    }
  } 
  return res.send(`${itemName} not found!`)
})

router.delete("/:name",function(req,res,next){
  let currentItem = req.params.name;
  try {
    for (let i = 0; i < items.length; i++){
      if (items[i].name === currentItem){
        items.splice(i,1);
        return res.send(`${currentItem} deleted!`)
      }
    }
    return res.send(`${currentItem} not a valid item!`);
  } catch(err){

    return next(err)
  }

})

//#TODO - HOW TO GET ERROR HANDLER WORKING?

router.use(function (err, req, res, next) {
  return res.send("Invalid item name")

})



module.exports = router;
