/**
 * EmployeeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
// const express = require('express');
// const app = express();
// app.use(require('skipper')());

module.exports = {
  
    GetemployeeDatatable: async function (req, res) {
      let data = await Employee.find().populate('emp_branch_id');
      // const branch = JSON.parse(JSON.stringify(branch_addit_branch_id[0]));
      //             const branch_name = branch.branch_addit_branch_id.branch_name;
      //             const branch_id = branch.branch_addit_branch_id.id;
  
      return res.json({
        draw: 0,
        recordsTotal: data.length,
        recordsFiltered: data.length,
        data: data,
  
      })
    },
    PostemployeeCreate: async function (req, res) {
      var newname = Date.now();
      sails.log(req.body.name)
      req.file('filetoupload').upload({
        dirname: require('path').resolve(sails.config.appPath, 'assets/images'),
        saveAs: newname+'.jpg',
        maxBytes: 1000000
        },function (err, uploadedFiles) {
          if (err) return res.serverError(err);
          return res.json({
            files: uploadedFiles
          });
        });
        await Employee.create({
            emp_name: req.body.emp_name,
            emp_salary: req.body.emp_salary,
            emp_address: req.body.emp_address,
            emp_id_card: newname+'jpg',
          }).fetch()
          return res.json({
            message: 'Create Complele'
          })
    },
  
  };