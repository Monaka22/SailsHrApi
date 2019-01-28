/**
 * EmployeeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    GetemployeeDatatable : async function (req,res) {
        let data = await Employee.find().populate('emp_branch_id');
        // const branch = JSON.parse(JSON.stringify(branch_addit_branch_id[0]));
        //             const branch_name = branch.branch_addit_branch_id.branch_name;
        //             const branch_id = branch.branch_addit_branch_id.id;

        return res.json({
            draw: 0,
            recordsTotal: data.length,
            recordsFiltered: data.length,
            data:data,
           
          })
    }

};

