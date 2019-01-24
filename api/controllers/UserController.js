/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  GetUserDatatable: async function (req, res) {
    let data = await User.find()

    return res.json({
      draw: 0,
      recordsTotal: data.length,
      recordsFiltered: data.length,
      data: data
    })
  },
  PostuserCreate: async function (req, res) {
    await User.create({
      user_username: req.body.user_username,
      user_password: req.body.user_password,
      user_role: req.body.user_role
    }).fetch()
    return res.json({
      message: 'Create Complele'
    })
  },
  GetuserById: async function (req, res) {
    const id = req.param('id')
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await User.findOne({
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
  PostuserUpdate: async function (req,res) {
    try {

        await User.update({
          id: req.body.id
        }).set({
            user_username: req.body.user_username,
            user_password: req.body.user_password,
            user_role: req.body.user_role
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
  PostUserDelete: async function (req, res) {
    const id = req.body.id
    await User.destroy({id:id}).exec(function (err) {
        if(err){
            return res.sendStaus(500,{error : "database error"})
        }
        return res.json({
            message : 'Delete sucsess'
        })
    })

    },

};
