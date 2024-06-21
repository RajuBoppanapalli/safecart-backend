// let http= require("http");

// http.createServer((req,res)=>{

//     res.write("my first api")
//     res.end();
// }).listen(4000);

//import express 
let express = require("express");

//import data base 
let db_con = require("./db_con");

//import cros
let cors = require("cors");

let formidable=require("express-formidable");

//import bodyparser
// let bodyParser = require('body-parser');


//create objet for express
let app = express();

//use cros
app.use(cors());

app.use(formidable());

//user body parser

// app.use(bodyParser.urlencoded({ extended:false }));

//add port
app.listen(4001);

// create get api
// syntax:app.get(api,callbackfun)

app.get("/employee", async(req,res)=>{
    let data=await db_con.getemployeedata();
    res.write(JSON.stringify(data));
    res.end();
})
//create addproduct api
app.post("/savedata", async (req, res) => {
 const { productName, OldPrice, Newprice, OfferPercent, Stockavailable, productImage} = req.fields;  
await db_con.saveproduct(productName, OldPrice, Newprice, OfferPercent, Stockavailable, productImage);
res.end();
});

// create get api for product details
app.get("/product_details",async(req,res)=>{
let data=await db_con.getproductdetails();
res.write(JSON.stringify(data));
res.end();
})



//creating  post api for userdata
app.post("/saveuser",async(req,res)=>{
    let data=await db_con.saveuserdata(req.fields.user_name,req.fields.phoneNumber,req.fields.email,req.fields.country,req.fields.password);
res.redirect("http://localhost:3000/signup");
    // res.write(JSON.stringify(data));
    res.end();
});
//get user data api

app.get("/userslist",async(req,res)=>{
    let data= await db_con.usersData();
    res.write(JSON.stringify(data));
    res.end();
});

//create post api for wishlist

app.post("/addtowishlist", async (req, res) => {      
     let data = req.fields.productid; 
        await db_con.addwishlist(data); 
        res.redirect("http://localhost:3000/wishlist");
        res.end();
});

app.get("/wishlistdata",async(req,res)=>{
    let data =await db_con.getwishlistdata();
    res.write(JSON.stringify(data));
    res.end();
})

//create post for cart
app.post("/addtocart", async (req, res) => {      
    let data = req.fields.productsid; 
       await db_con.addcart(data); 
       res.redirect("http://localhost:3000/cartpage");
       res.end();
  
});
//create get api for addto cart

app.get("/getcartdata",async(req,res)=>{
    let data=await db_con.getcartdata();
    res.write(JSON.stringify(data));
    res.end();

})
//create update api for update user data
app.post("/update-profile",async(req,res)=>{
    const { user_name, phoneNumber, email, country, id } = req.fields;
    await db_con.updateuserdata(user_name, phoneNumber, email, country, id);
    res.redirect("http://localhost:3000/signin");
    res.end();
})
//create delete wishlist iteam api
app.delete("/wishlist/del/:id", async (req, res) => {
    const id = req.params.id; 
    console.log(id); 
     await db_con.deletewishlistdata(id);
    console.log("delete wishlist");
    res.end();
})
app.delete("/cart/del/:id", async (req, res) => {
    const id = req.params.id; 
    console.log(id); 
     await db_con.deletecartdata(id);
    console.log("delete cart");
    res.end();
})
app.post("/searchproduct",async(req,res)=>{
    let data = req.fields.productName;
     let data1=await db_con.searchproductdata(data);  
    res.write (JSON.stringify(data1));
    res.end();

})




