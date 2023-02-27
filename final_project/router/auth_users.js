const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{"username":"User","password":"Password"}]

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
}

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
    let validusers = users.filter((user)=>{ return (
        user.username === username && user.password === password)
    });
      
    if(validusers.length > 0){
        return true;
      }
       else {
        return false;
      }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.query.username;
    const password = req.query.password;
    
    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"});
    }
  
    if (authenticatedUser(username,password)) {
      let accessToken = jwt.sign({
        data: password
      }, 'access', { expiresIn: 60 });
  
      req.session.authorization = {
        accessToken,username
    }
    return res.status(200).send("User successfully logged in");
    } else {
      return res.status(208).json({message: "Invalid Login. Check username and password"});
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.authenticated = authenticatedUser;
module.exports.isValid = isValid;
module.exports.doesExist = doesExist;
module.exports.users = users;
