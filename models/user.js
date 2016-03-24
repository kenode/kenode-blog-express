'use strict';

var mongoose = require('mongoose');
var BaseModel = require("./base_model");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String },
  password: { type: String },
  salt: { type: String },
  email: { type: String },
  user_type: { type: Number, default: 0 },
  token_key: { type: String },
  token_time: { type: Date, default: Date.now },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
});

userSchema.plugin(BaseModel);

module.exports = userSchema;