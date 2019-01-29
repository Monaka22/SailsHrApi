/**
 * Employee.js
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
      columnName: 'emp_id',
    },
    emp_name:{
      type : 'string'
    },
    emp_salary:{
      type : 'number'
    },
    emp_address: {
      type: 'string'
    },
    emp_id_card:{
      type: 'string'
    },
    emp_tel:{
      type: 'string'
    },
    emp_emer_con_name:{
      type : 'string'
    },
    emp_emer_con_relation:{
      type : 'string'
    },
    emp_emer_con_address:{
      type : 'string'
    },
    emp_emer_con_tel:{
      type : 'string'
    },
    emp_branch_id:{
      model : 'branch',
      unique: true
    },
   


    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

};


