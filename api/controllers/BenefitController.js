/**
 * BenefitController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  GetbenefitDatatable: async function (req, res) {
    let data = await Benefit.find().populate('benefit_emp_id');
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
  PostbenefitCreate: async function (req, res) {
    if(!_.isUndefined(req.body.benefit_title)&&!_.isUndefined(req.body.benefit_price)&&!_.isUndefined(req.body.benefit_date)&&!_.isUndefined(req.body.benefit_emp_id)){
      await Benefit.create({
        benefit_title: req.body.benefit_title,
        benefit_price: req.body.benefit_price,
        benefit_date : req.body.benefit_date,
        benefit_note : req.body.benefit_note,
        benefit_emp_id: req.body.benefit_emp_id,
      }).fetch()
      return res.json({
        message: 'Create Complele'
      })
    }
  return res.status(400).json({
      Error: 'Some Data is Undefined'
    })
    
  },
  GetbenefitById: async function (req, res) {
    const id = req.param('id')
    if(isNaN(id)){
      return res.status(400).json('id is not integer')
    }
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Benefit.findOne({
        id: id
      }).populate('benefit_emp_id');
      if (data) {
        return res.json({
          data: data,
          message: 'Load By id sucess'
        })
      }
      return res.status(404).json('id is notfond');
    }
  },
  PostbenefitUpdate: async function (req, res) {
    if (_.isUndefined(req.body.id)||req.body.id == ""){
      return res.badRequest('ID is Undefind.')
    }
    try {
      if(!_.isUndefined(req.body.benefit_title)&&!_.isUndefined(req.body.benefit_price)&&!_.isUndefined(req.body.benefit_date)&&!_.isUndefined(req.body.benefit_emp_id)){
      await Benefit.update({
        id: req.body.id
      }).set({
        benefit_title: req.body.benefit_title,
        benefit_price: req.body.benefit_price,
        benefit_date : req.body.benefit_date,
        benefit_note : req.body.benefit_note,
        benefit_emp_id: req.body.benefit_emp_id,
      })
      return res.json({
        message: 'Update sucsess'
      })
    }
    return res.status(400).json({
        Error: 'Some Data is Undefined'
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
  PostbenefitDelete: async function (req, res) {
    const id = req.body.id
    if (_.isUndefined(id||id == "")){
      return res.badRequest('ID is Undefind.')
    }
    await Benefit.destroy({
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
  GetEmployeeBenefitGetByid : async function (req,res) {
    const id = req.param('id')
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Benefit.find({where:{benefit_emp_id:id}});
      if (data) {
        return res.json({
          data: data,
          message: 'Load By id sucess'
        })
      }
      return res.sendStatus(404);
    }
}

};
