// import my sql module
let mysql = require("mysql2");

//create connection

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "emp"
});

//create connection to start connection

function StartConnection() {
  con.connect((err) => {
    if (err) throw err;
    console.log("connected!");
  })
}

//use connection

async function GetEmployee() {
  //start connection
  StartConnection();
  //use connection

  let data = await con.promise().query("select * from employee");
  return data[0];

}
async function saveproductdata(productName, OldPrice, Newprice, OfferPercent, Stockavailable, productImage) {
  StartConnection();
  let data = await con.promise().query(`INSERT INTO product_details (productName, OldPrice, Newprice, OfferPercent, Stockavailable, productImage)
          VALUES (?, ?, ?, ?, ?, ?)`, [productName, OldPrice, Newprice, OfferPercent, Stockavailable, productImage]);

}


// function for productdetalis

async function GetProductDetails() {
  StartConnection();
  let data = await con.promise().query("select * from product_details");
  return data[0];
}

async function savedata(user_name, phoneNumber, email, country, password) {
  StartConnection();
  let data = await con.promise().query(
    `INSERT INTO user_data (user_name, phoneNumber, email, country, password) VALUES ('${user_name}', ${phoneNumber}, '${email}', '${country}', '${password}')`
  );
  return data[0];
}

//creating get userdata

async function getUser() {

  StartConnection();
  let data = await con.promise().query("select * from user_data");
  return data[0];
}
//create  save api for wishlist

async function addToWishlist(productid) {
  StartConnection();
  let data = await con.promise().query(`insert into wishlist(productid) values(${productid})`);
  return data[0];
}

//create get wishlist
async function getwishlist() {
  StartConnection();
  let data = await con.promise().query(`SELECT p.id, p.productName,p.productImage,p.OldPrice, p.NewPrice, p.OfferPercent,w.id, w.quantity, p.StockAvailable 
    FROM product_details AS p
    JOIN wishlist AS w ON p.id = w.productid;
    `);
  return data[0];

}
// create function for addto cart
async function addToCart(productsid) {
  StartConnection();
  let data = await con.promise().query(`insert into addtocart(productsid) values(${productsid})`);
  return data[0];
}

//create function for display cart page
async function getcart() {
  let data = await con.promise().query(`select c.id, productName, OldPrice, Newprice,p.productImage, OfferPercent, Stockavailable  from product_details as p
    join addtocart as c on p.id=c.productsid;
    `);
  return data[0];
}

//function for update user profile
async function updateuserprofile(user_name, phoneNumber, email, country, id) {
  let data = await con.promise().query(` UPDATE user_data SET user_name='${user_name}', phoneNumber='${phoneNumber}', email='${email}', country='${country}'  WHERE id='${id}';`);

}
//function for delete wishlistiteam

async function deletewishlistiteam(id) {
  StartConnection();
  let sql = `DELETE FROM wishlist WHERE id = ?`;
  let data = await con.promise().query(sql, [id]);
  return data[0];
}

//function for cart iteam
async function deletecartiteam(id) {
  StartConnection();
  let sql = `DELETE FROM addtocart WHERE id = ?`;
  let data = await con.promise().query(sql, [id]);
  return data[0];
}
async function searchproduct(productName) {
  StartConnection();
  let data = await con.promise().query(`select * from product_details where productName like'%${productName}%' `);
  return data[0];
}

// neeed to export function

module.exports = {
  getemployeedata: async () => GetEmployee(),
  saveproduct: async (productName, OldPrice, Newprice, OfferPercent, Stockavailable, productImage) => saveproductdata(productName, OldPrice, Newprice, OfferPercent, Stockavailable, productImage),
  getproductdetails: async () => GetProductDetails(),
  saveuserdata: async (user_name, phoneNumber, email, country, password) => savedata(user_name, phoneNumber, email, country, password),
  usersData: async () => getUser(),
  addwishlist: async (productid) => addToWishlist(productid),
  getwishlistdata: async () => getwishlist(),
  addcart: async (productsid) => addToCart(productsid),
  getcartdata: async () => getcart(),
  updateuserdata: async (user_name, phoneNumber, email, country, id) => updateuserprofile(user_name, phoneNumber, email, country, id),
  deletewishlistdata: async (id) => deletewishlistiteam(id),
  deletecartdata: async (id) => deletecartiteam(id),
  searchproductdata: async (productName) => searchproduct(productName),
}