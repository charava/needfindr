const express = require('express')
const router = express.Router()
const UserSchema = require('../models/User.js')



/*------------------------------
@Route: Get /posts
@Description:
  Retrieves all the posts in the database, regardless of user
  request:
    request params: none
    request body: none
  response:
    maps through every user and just prints the posts for every user
*/
router.get('/posts', (req, res) => {
    UserSchema.find()
    .then(users => {
      console.log("Printing all the posts!")
      const listOfPosts = []
      users.map((user) => {
        console.log('in here')
        console.log(user.posts)
        listOfPosts.push(user.posts)
      })
      res.json(listOfPosts)
    })
    .catch(err => {
      console.error(err)
    })
})



/*------------------------------
@Route: Get /users
@Description:
  Retrieves the entire db--so all the users and their posts in the database
  request:
    request params: none
    request body: none
  response:
    prints every user and all of the users account info and posts
*/
router.get('/users', (req, res) => {
    UserSchema.find()
    .then(user => {
      console.log("Printing all the users!")
      console.log(user)
      res.json(user)
    })
    .catch(err => {
      console.error(err)
    })
})



/*------------------------------
@Route: Get /:id
@Description:
  Finds a user based on the given id
  request:
    request params: id;
      id must be in link
    request body: none
  response:
    prints the specific user with that id
*/
router.get('/:id', (req, res) => {
    UserSchema.findById(req.params.id)
    .then(user => {
      console.log("Here is your requested user!")
      console.log(user)
      res.json(user)
    })
    .catch(err => {
      console.error(err)
    })
 })


 /*------------------------------
 @Route: Get /user-posts
 @Description:
   Gets the posts of a specific user
   request:
     request params: id
        must put user's id after /user-posts/
     request body: none
   response:
     prints the posts of the specific user with that id
 */
 router.get('/user-posts/:id', (req, res) => {
     UserSchema.findById(req.params.id)
     .then(user => {
       console.log("Here is the posts of your requested user!")
       console.log(user.posts)
       res.json(user.posts)
     })
     .catch(err => {
       console.error(err)
     })
  })

  /*------------------------------
  @Route: Post /add-user
  @Description:
    Adds a new user (with their info and posts) to the DB
    request:
      request params: none
      request body: JSON object;
        must include name, username, password
        email and username must be unique
        example request body:
          {
          "name": "Charlotte",
          "email": "rawr@gmail.com",
          "username": "thebestest",
          "password":"12345",
          "posts": [{
              "title": "Matt and David are awesome",
              "description": "This is a fact."
          }]
        }
    response:
      says it added a new user and logs the new user in console
  */
  router.post('/add-user', (req, res) => {
      UserSchema.create(req.body)
        .then(user => {
          console.log('Added a new user!')
          console.log(user)
          res.json(user)
        })
        .catch(err => {
          console.log(req.body.email)
          console.error(err)
        })
  })



  /*------------------------------
  @Route: Post /add-post
  @Description:
    Adding a post to an existing user
    request:
      request params: none
      request body: JSON object;
        must include id, title, description
        title and description do not need to be unique
        example request body:
          {
          "id": "624caf8713ea46a4b3cddd3b",
          "title": "First post!",
          "description": "Such a good description though",
        }
    response:
      Updates the user's info with the new post and logs in console that it happened
  */
  router.post('/add-post', (req, res) => {
      UserSchema.findById(req.body.id)
        .then(user => {
          user.posts.push({title: req.body.title, description: req.body.description})
          UserSchema.findByIdAndUpdate(req.body.id, {posts: user.posts})
            .catch(err => {
              console.log(req.body.email)
              console.error(err)
            })
          console.log('Added a post to the user!')
          console.log(user)
          res.json(user)
        })
        .catch(err => {
          console.log(req.body.email)
          console.error(err)
        })
  })


 /*------------------------------
 @Route: Put /email
 @Description:
   Updates the user's email
   request:
     request params: none;
     request body: JSON object;
       must include id, email
   response:
     says that the email has been updated and changes the email
 */
router.put('/email', (req, res) => {
    UserSchema.findByIdAndUpdate(req.body.id, {email: req.body.email}, {returnDocument: 'after'})
      .then(user => {
        console.log('Updated the email!')
        console.log(user)
        res.json(user)
      })
      .catch(err => {
        console.error(err)
      })
})


/*------------------------------
@Route: Put /name
@Description:
  Updates the user's name
  request:
    request params: none;
    request body: JSON object;
      must include id, name
  response:
    says that the name has been updated and changes the name
*/
router.put('/name', (req, res) => {
    UserSchema.findByIdAndUpdate(req.body.id, {name: req.body.name}, {returnDocument: 'after'})
      .then(user => {
        console.log('updated the name!')
        console.log(user)
        res.json(user)
      })
      .catch(err => {
        console.error(err)
      })
})


/*------------------------------
@Route: Put /security
@Description:
  Updates the user's account information--this includes username and password
  request:
    request params: none;
    request body: JSON object;
      must include id, username, password
      username must be unique
  response:
    says that the account's security info has been updated and changes the username and password
*/
router.put('/account-info', (req, res) => {
    UserSchema.findByIdAndUpdate(req.body.id, {username: req.body.username, password: req.body.password}, {returnDocument: 'after'})
      .then(user => {
        console.log('Updated the user\'s security info!')
        console.log(user)
        res.json(user)
      })
      .catch(err => {
        console.error(err)
      })
})

/*------------------------------
@Route: Delete /id
@Description:
  Deletes the user based on the id
  request:
    request params: id;
      id must be in link
    request body: none
  response:
    deletes the user and says that the deletion has happened
*/
router.delete('/id', (req, res) => {
    UserSchema.findByIdAndRemove(req.body.id)
      .then(user => {
        console.log('User is deleted!')
        res.json(user)
      })
      .catch(err => {
          console.error(err)
      })
})


/*------------------------------
@Route: Delete /clean
@Description:
  Cleans the entire db of indexes to prevent the duplication error
  request:
    request params: none
    request body: none
  response:
    cleans the db of indexes so there are no duplicate keys
*/
router.delete('/clean', (req, res) => {
    UserSchema.cleanIndexes()
      .then(console.log('success'))
      .catch(err => {
        console.error(err)
      })
})



module.exports = router
