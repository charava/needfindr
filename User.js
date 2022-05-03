const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const postSchema = require('./Posts.js')



const postSchema = new Schema({
  title: {
      type: String,
      required: true,
      unique: false
  },
  // You can add specifics to each one too that help with validation, like making something required, or unique
  description: {
      type: String,
      required: true,
      unique: false
  },
  overflow: {
    type: String,
    required: true,
    unique: false
  }
});

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: false
    },
    email: {
      type: String,
      required: false,
      unique: true
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      unique: false
    },
    //define required
    posts: [postSchema]
/*
    {
      type: [postSchema],
      required:false,
      unique:false
    }
*/
});


//temporary creation in code and not on postman
//const TrialUser = mongoose.model('TrialUser', userSchema);
//const smallParent = new TrialUser({ userInfo: [{name: 'Charlotte', email: 'charcharro@gmail.com', username: 'charosa', password: 'bestpas22'}], posts: [{ title: 'helloooo', description: 'this is desc' }, { title: 'asdfas', description: 'this is sfadsgsdesc' }] })
//console.log(smallParent)

module.exports = mongoose.model("User", userSchema);
