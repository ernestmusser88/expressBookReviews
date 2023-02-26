const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = {
    1: {"username": "example_user","password": "password123"},
};

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
    let spaces = new RegExp("\\s", "g") //Check for blank spaces
    let goodchars = new RegExp("[^a-zA-Z0-9_]","g") //Check for illegal characters

    if(spaces.test(username)== true || goodchars.test(username) == true){
        return(false);
    }
    else{
        return(true);
    }
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
