/**
 * TeamController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    GetteamDatatable: async function (req, res) {
        let data = await Team.find().populate('project_id').populate('emp_id');
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
      PostteamCreate: async function (req, res) {
        await Team.create({
          branch_addit_title: req.body.branch_addit_title,
          branch_addit_price: req.body.branch_addit_price,
          branch_addit_date: req.body.branch_addit_date,
          branch_addit_branch_id: req.body.branch_addit_branch_id
        }).fetch()
        return res.json({
          message: 'Create Complele'
        })
      },
      GetteamById: async function (req, res) {
        const id = req.param('id')
        if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
          let data = await Team.findOne({
            id: id
          }).populate('project_id').populate('emp_id');
          if (data) {
            return res.json({
              data: data,
              message: 'Load By id sucess'
            })
          }
          return res.sendStatus(404);
        }
      },
      PostteamUpdate: async function (req, res) {
        try {
    
          await Team.update({
            id: req.body.id
          }).set({
            branch_addit_title: req.body.branch_addit_title,
            branch_addit_price: req.body.branch_addit_price,
            branch_addit_date: req.body.branch_addit_date,
            branch_addit_branch_id: req.body.branch_addit_branch_id
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
      PostteamDelete: async function (req, res) {
        const id = req.body.id
        await Team.destroy({
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

