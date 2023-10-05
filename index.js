import express from "express";
import bodyParser from "body-parser"

const app = express();
const port = 3000;


let checklistItems=[]

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))




const itemCollector=(req,res,next)=>{
    checklistItems=[...checklistItems, req.body["item"]]
    next();
}

app.use(itemCollector)

app.get("/", (req, res) => {
  res.render("index.ejs",{items:checklistItems});
});

app.post("/submit",(req,res)=>{
    
    res.render("index.ejs",{items:checklistItems})
})
app.post("/reset",(req,res)=>{
    checklistItems=[]
    res.render("index.ejs",{items:[]})
})

app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});
