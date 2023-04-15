const express = require('express');
const router = express.Router();
const sql = require('mysql');
const creds = require('../config/user');

// create the sql connection pool
var pool  = sql.createPool(creds);

router.get('/', (req, res) => {
    res.json({message: 'hit the main ums route'});
})

//Try our login route - set it up and send back a message
router.post('/login', (req,res) => {
  console.log('hit the login route');
  console.log(req.body);

  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
   
    // Use the connection
    connection.query(`SELECT username, password FROM tbl_users WHERE username="${req.body.username}"`, function (error, results) {
      // When done with the connection, release it.
      connection.release();
   
      // Handle error after the release.
      if (error) throw error;
      console.log('the user data:',results, results.length);
      // Don't use the connection here, it has been returned to the pool.
      if (results.length ==0){
        res.json({message: 'no user'});
      } else if (results[0].password !== req.body.password) {
        res.json ({message : 'wrong password'})
      } else {
        res.json({ message: 'success', user: results[0]});
      }
    });
  });

})

// get all users from this route
router.get('/users', (req, res) => {
    // try to query and get all of the users
    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query('SELECT * FROM tbl_users', function (error, results) {
          // When done with the connection, release it.
          connection.release();
       
          // Handle error after the release.
          if (error) throw error;

          results.forEach(user => {
            delete user.fname;
            delete user.lname;
            delete user.password;

            if (user.avatar == "default"){
              user.avater = 'temp_avatar.jpg'
            }
          })
       
          // Don't use the connection here, it has been returned to the pool.
          res.json(results);
        });
      });
    // end pool query
    
})

// get one user from this route
router.get('/users/:user', (req, res) => {
    // try to query and get all of the users
    // this is the user ID:
    console.log(req.params.user);

    pool.getConnection(function(err, connection) {
        if (err) throw err; // not connected!
       
        // Use the connection
        connection.query(`SELECT * FROM tbl_users WHERE id=${req.params.user}`, function (error, results) {
          // When done with the connection, release it.
          connection.release();
       
          // Handle error after the release.
          if (error) throw error;
        console.log(results);
          // Don't use the connection here, it has been returned to the pool.
          res.json(results);
        });
      });
    // end pool query
    
})

// router.post('/signup', (req, res) => {
//   const user = {
//       fname: req.body.fname,
//       lname: req.body.lname,
//       permissions: req.body.permissions,
//       password: req.body.password,
//       username: req.body.username,
//       avatar: req.body.avatar
//   };

//   const avatarImages = ['count_olaf.jpg', 'temp_avatar.jpg'];
//   const randomIndex = Math.floor(Math.random() * avatarImages.length);
//   const selectedAvatar = avatarImages[randomIndex];

//   pool.getConnection(function(err, connection) {
//       if (err) throw err;
//       console.log("Connected!");

//       const sqlQuery = `INSERT INTO tbl_users (fname, lname, permissions, password, username, avatar) VALUES ('test', 'test','2', '${user.password}', '${user.username}', '${selectedAvatar}')`;

//       connection.query(sqlQuery, function (err, result) {
//           connection.release();
//           if (err) throw err;
//           console.log("IT WENT THROUGH");
//           res.send('User added');
//       });
//   });
// });
//This one works but doesnt have the random generator from an array
router.post('/signup', (req, res) => {
  const user = {
      fname: req.body.fname,
      lname: req.body.lname,
      permissions: req.body.permissions,
      password: req.body.password,
      username: req.body.username,
      avatar: req.body.avatar
  };
  
  pool.getConnection(function(err, connection) {
      if (err) throw err;
      console.log("Connected!");

      const sqlQuery = `INSERT INTO tbl_users (fname, lname, permissions, password, username, avatar) VALUES ('${user.fname}', '${user.lname}','${user.permissions}', '${user.password}', '${user.username}', '${user.avatar}')`;

      connection.query(sqlQuery, function (err, result) {
          connection.release();
          if (err) throw err;
          console.log("IT WENT THROUGH");
          res.send('User added');
      });
  });
});


router.get('/user/:user', (req, res) => {
    res.json({message: 'hit single users route'});
})

module.exports = router;