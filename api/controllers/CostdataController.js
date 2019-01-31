/**
 * CostdataController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    GetcostdataDatatable: async function (req, res) {
        let data = await Costdata.find().populate('cost_emp_id').populate('cost_branch_id').populate('cost_fixcost_id').populate('cost_benefit_id');
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
      PostcostdataCreate: async function (req, res) {
        await Costdata.create({
          cost_emp_id: req.body.cost_emp_id,
          cost_branch_id: req.body.cost_branch_id,
          cost_fixcost_id: req.body.cost_fixcost_id,
          cost_benefit_id: req.body.cost_benefit_id,
          cost_note :req.body.cost_note
        }).fetch()
        return res.json({
          message: 'Create Complele'
        })
      },
      GetcostdataById: async function (req, res) {
        const id = req.param('id')
        if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
          let data = await Costdata.findOne({
            id: id
          }).populate('cost_emp_id').populate('cost_branch_id').populate('cost_fixcost_id').populate('cost_benefit_id');
          if (data) {
            return res.json({
              data: data,
              message: 'Load By id sucess'
            })
          }
          return res.sendStatus(404);
        }
      },
      PostcostdataUpdate: async function (req, res) {
        try {
    
          await Costdata.update({
            id: req.body.id
          }).set({
            cost_emp_id: req.body.cost_emp_id,
            cost_branch_id: req.body.cost_branch_id,
            cost_fixcost_id: req.body.cost_fixcost_id,
            cost_benefit_id: req.body.cost_benefit_id,
            cost_note :req.body.cost_note
          })
          return res.json({
            message: 'Update sucsess'
          })
    
        } catch (err) {
          // sails.log(err)
          // sails.log(JSON.stringify(err))
          let message = await sails.helpers.error(err.code, '')
          sails.log(err)
          return res.badRequest({
            err: err,
            message: message
          })
        }
      },
      PostcostdataDelete: async function (req, res) {
        const id = req.body.id
        await Costdata.destroy({
          id: id
        }).exec(function (err) {
          if (err) {
            return res.sendStaus(500, {
              error: "database error"
            })
          }
          return res.json({
            message: 'Delete sucsess'
          })
        })
      }
    

};
