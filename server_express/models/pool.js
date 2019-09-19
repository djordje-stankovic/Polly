const mongose = require('mongoose');

const poolSchema = new mongose.Schema({
    active : {
      type: Boolean,
      default : true
    },
    questions : Array
  })
 const Pool = mongose.model('Pool', poolSchema);
  module.exports = Pool;