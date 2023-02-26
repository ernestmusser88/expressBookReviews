const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
//Write your code here
  let username = req.query.username;
  let password = req.query.password;

  if(isValid(username) == false || username.length == 0){
    return res.status(406).json({message: "Invalid Username"});
  }
  for(let i = 1; i <= Object.keys(users).length; i++){
    if(users[i].username == username){
      return res.status(406).json({message: "Username already exists"});   
    }
  }
  if(password.length == 0){
    return res.status(406).json({message: "Please provide a password"});
  }
  else{
      
    let newKey = Object.keys(users).length+1;
    users[newKey] = {"username":username,"password":password};
    console.log(users);
    return res.status(200).json({message: `Welcome ${username}!`});
  }
});

// Get the book list available in the shop 1-getallbooks.png
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN 2-gedetailsISBN.png
public_users.get('/isbn/:isbn',function (req, res) {
    //Write your code here
    const isbn = books[req.params.isbn];
    return res.send(JSON.stringify({isbn}));
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    //Write your code here
    const author = req.params.author;
    let booklist = [];
    for(let i = 1; i <= Object.keys(books).length; i++){
        if(books[i].author === author){
            booklist.push([books[i]]);
        }
    }

    return res.send(JSON.stringify({booklist}));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
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

module.exports.general = public_users;
