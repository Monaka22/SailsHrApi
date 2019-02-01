/**
 * PositionemployeeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  GetpositionempDatatable: async function (req, res) {
    let data = await Positionemployee.find().populate('emp_id').populate('position_id');
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
  PostpositionempCreate: async function (req, res) {
    await Positionemployee.create({
      emp_id: req.body.emp_id,
      position_id: req.body.position_id
    }).fetch()
    return res.json({
      message: 'Create Complele'
    })
  },
  GetpositionempById: async function (req, res) {
    const id = req.param('id')
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Positionemployee.findOne({
        id: id
      }).populate('emp_id').populate('position_id');
      if (data) {
        return res.json({
          data: data,
          message: 'Load By id sucess'
        })
      }
      return res.sendStatus(404);
    }
  },
  PostpositionempUpdate: async function (req, res) {
    try {

      await Positionemployee.update({
        id: req.body.id
      }).set({
        emp_id: req.body.emp_id,
        position_id: req.body.position_id
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
  PostpositionempDelete: async function (req, res) {
    const id = req.body.id
    await Positionemployee.destroy({
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
  },
  GetEmployeePositionGetByid : async function(req,res){
    const id = req.param('id')
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Positionemployee.find({where:{emp_id:id}}).populate('position_id');
      if (data) {
        return res.json({
          data: data,
          message: 'Load By id sucess'
        })
      }
      return res.sendStatus(404);
    }
  },
  GetPositionEmployeeGetByid: async function(req,res){
    const id = req.param('id')
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Positionemployee.find({where:{position_id:id}}).populate('emp_id');
      if (data) {
        return res.json({
          data: data,
          message: 'Load By id sucess'
        })
      }
      return res.sendStatus(404);
    }
  },

};
