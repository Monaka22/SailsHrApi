/**
 * EmployeesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    GetemployeeDatatable: async function (req, res) {
        let data = await Employees.find().populate('emp_branch_id');
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
    var filename = Date.now()+".jpg";
    req.file('filetoupload').upload({
      dirname: require('path').resolve(sails.config.appPath, 'assets/images'),
      saveAs: newname + '.jpg',
      maxBytes: 1000000
    }, function (err, uploadedFiles) {
    });
    var data = await Employees.create({
      emp_name: req.body.emp_name,
      emp_salary: req.body.emp_salary,
      emp_address: req.body.emp_address,
      emp_tel: req.body.emp_tel,
      emp_emer_con_name: req.body.emp_emer_con_name,
      emp_emer_con_relation: req.body.emp_emer_con_relation,
      emp_emer_con_address: req.body.emp_emer_con_address,
      emp_emer_con_tel: req.body.emp_emer_con_tel,
      emp_branch_id: req.body.emp_branch_id,
      emp_id_card: filename
    }).fetch()
    return res.json({
      message: 'Create Complele',
      data :data
    })
  },

};

