/**
 * Branch.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: 'id',
  attributes: {

    id:{
      type: 'number',
      autoIncrement: true,
      columnName: 'branch_id'
    },
    branch_name:{
      type : 'string'
    },
    branch_address:{
      type : 'string'
    },
    status: {
      type: 'number',
      required: true,
      isIn: [0,1]
    },
    // createdAt: { type: 'number', autoCreatedAt: true },
    // updatedAt: { type: 'number', autoUpdatedAt: true },

  },

};

