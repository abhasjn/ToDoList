const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items  = ["Buy Food", "Cook Food", "Eat Food"]
let workItmes = []
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))


app.get("/", function (req, res) {
  let today = new Date();

  let options = {
      weekday: "long",
      day: "numeric",
      month: "long"
  };
// to format our date string we have used toLOcaleDateString()
 let day = today.toLocaleDateString("en-US", options);  
  res.render("list", { listTitle: day,
                    newListItems : items });
});

// Reading the POST form 
app.post("/", function(req, res){
    item = req.body.newItem;
    items.push(item)
    res.redirect("/")
    // When a post request is received, this will redirect it to the home route so now app.get will run properly.
})

// Working on the work Route
app.get("/work", function(req, res){
    res.render("list", {listTitle: "Work List", newListItems: workItmes});

})

app.post("/work", function(req, res){
    let item = req.body.newItem;
    workItmes.push(item);
    res.redirect("/work")
})

app.listen(4000, function () {
  console.log("Server is running on port 3000.");
});
