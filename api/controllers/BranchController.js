/**
 * BranchController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  GetBranchDatatable: async function (req, res) {
    
    let data = await Branch.find().where({
      status: 1
    })
    //console.log(data.data.branch_name);
    return res.json({
      draw: 0,
      recordsTotal: data.length,
      recordsFiltered: data.length,
      data:data
    })
    
  },
  PostBranchCreate: async function (req, res) {
    await Branch.create({
      branch_name: req.body.branch_name,
      branch_address: req.body.branch_address,
      status: 1
    }).fetch()
    return res.json({
      message: 'Create Complele'
    })
  },
  GetBranchById: async function (req, res) {
    const id = req.param('id')
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Branch.findOne({
        id: id
      })
      if (data) {
        return res.json({
          data: data,
          message: 'Load By id sucess'
        })
      }
      return res.sendStatus(404);
    }
  },
  PostBranchUpdate: async function (req, res) {
    try {

      await Branch.update({
        id: req.body.id
      }).set({
        branch_name: req.body.branch_name,
        branch_address: req.body.branch_address
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
  PostBranchDelete: async function (req, res) {
    const id = req.body.id
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Branch.findOne({
        id: id
      })
      if (data) {
        await Branch.update({
          id: req.body.id
        }).set({
          status: 0
        })
        return res.json({
          message: 'Delete sucsess'
        })
      }
    }

    return res.sendStatus(404);
  }

};
