const express = require("express")
const app = express()
const path = require("path")

const serverPort=3050


app.listen(serverPort, () => {
    console.log("Server corriendo en port 3050")
})

//Routes

app.get("/", (req,res) => {
    res.sendFile(path.resolve (__dirname,"views","index.html"))
})
app.get("/productDetail", (req,res) => {
    res.sendFile(path.resolve (__dirname,'views','productDetail.html'))
})
app.get("/productCart", (req,res) => {
    res.sendFile(path.resolve (__dirname, 'views','productCart.html'))
})
app.get("/productCart-empty", (req,res) => {
    res.sendFile(path.resolve (__dirname, 'views','productCart-empty.html'))
})
app.get("/login", (req,res) => {
    res.sendFile(path.resolve (__dirname , 'views','login.html'))
})
app.get("/register", (req,res) => {
    res.sendFile(path.resolve (__dirname , 'views','register.html'))
})
app.get("/css/style.css", (req,res) => {
    res.sendFile(path.resolve (__dirname,'css','style.css'))
})

app.get("*", (req,res) => {
    res.sendFile(path.resolve (__dirname,"..","public"+ req.url))
})