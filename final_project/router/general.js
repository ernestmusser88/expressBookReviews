const express = require('express');
const axios = require("axios");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let doesExist = require("./auth_users.js").doesExist;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
//Write your code here
  let username = req.query.username;
  let password = req.query.password;
  

  if(!isValid(username) || !username){
    return res.status(404).json({message: "Invalid Username"});
  }
  if (!doesExist(username) && password) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
  }
});

// Get the book list available in the shop 1-getallbooks.png
public_users.get('/',async function (req, res) {
  //Write your code here
  const booklist = await books;
  res.send(JSON.stringify(booklist, null, 4));
});

// Get book details based on ISBN 2-gedetailsISBN.png
public_users.get('/isbn/:isbn',async function (req, res) {
    //Write your code here
    const isbn = await books[req.params.isbn];
    return (res.send(JSON.stringify({isbn})));
});
  
// Get book details based on author
public_users.get('/author/:author',async function (req, res) {
    //Write your code here
    const author = await req.params.author;
    let booklist = [];
    for(let i = 1; i <= Object.keys(books).length; i++){
        if(books[i].author === author){
            booklist.push([books[i]]);
        }
    }

    return res.send(JSON.stringify({booklist}));
});

// Get all books based on title
public_users.get('/title/:title',async function (req, res) {
  //Write your code here
  const title = await req.params.title;
  let booklist = [];
  for(let i = 1; i <= Object.keys(books).length; i++){
      if(books[i].title === title){
          booklist.push([books[i]]);
      }
  }

  return res.send(JSON.stringify({booklist}));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  let reviews = books[isbn].reviews;

  return res.send(JSON.stringify(reviews));

});

//for testing
public_users.get('/users',function (req, res) {
    //Write your code here
    const user = users;
    return res.send(JSON.stringify({user}));
});

module.exports.general = public_users;
