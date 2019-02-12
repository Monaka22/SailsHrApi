/**
 * PositionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  GetpositionDatatable: async function (req, res) {
    let data = await Position.find().where({
      status: 1
    })

    return res.json({
      draw: 0,
      recordsTotal: data.length,
      recordsFiltered: data.length,
      data: data
    })
  },
  PostPositionCreate: async function (req, res) {
    if(!_.isUndefined(req.body.position_name)){
      await Position.create({
        position_name: req.body.position_name,
        status: 1
      }).fetch()
      return res.json({
        Message: 'Create Complele'
      })
    }
    return res.status(400).json({
      Error: 'Data is Undefined'
    })
  },
  GetPositionById: async function (req, res) {
    const id = req.param('id')
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Position.findOne({
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
  PostPositionUpdate: async function (req, res) {
    try {
      if (!_.isString(req.body.id) && !_.isNotEmptyString(req.body.id)) {
        return res.notFound()
      } else {
        if(!_.isUndefined(req.body.position_name)){
          await Position.update({
            id: req.body.id
          }).set({
            position_name: req.body.position_name
          })
          return res.json({
            message: 'Update sucsess'
          })
        }
        return res.status(400).json({
      Error: 'Data is Undefined'
    })
      }
    } catch (err) {
      // sails.log(err)
      // sails.log(JSON.stringify(err))
      //let message = await sails.helpers.error(err.code, '')
      sails.log(err)
      return res.badRequest({
        err: err,
       // message: message
      })
    }
  },
  PostPositionDelete: async function (req, res) {
    const id = req.body.id
    if (_.isUndefined(id)){
      return res.badRequest('ID is Undefind.')
    }
    await Position.destroy({
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

};
