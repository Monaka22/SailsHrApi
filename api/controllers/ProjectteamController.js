/**
 * ProjectteamController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    GetprojectteamDatatable: async function (req, res) {

        let data = await Projectteam.find().populate('project_id').populate('team_id');
        //console.log(data.data.branch_name);
        return res.json({
          draw: 0,
          recordsTotal: data.length,
          recordsFiltered: data.length,
          data: data
        })
      },
      PostprojectteamCreate: async function (req, res) {
        await Projectteam.create({
          project_id: req.body.project_id,
          team_id: req.body.team_id
        }).fetch()
        return res.json({
          message: 'Create Complele'
        })
      },
      GetprojectteamById: async function (req, res) {
        const id = req.param('id')
        if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
          let data = await Projectteam.find({
            where:{project_id:id}
          }).populate('team_id');
          if (data) {
            return res.json({
              data: data,
              message: 'Load By id sucess'
            })
          }
          return res.sendStatus(404);
        }
      },
      PostprojectteamUpdate: async function (req, res) {
        try {
    
          await Projectteam.update({
            id: req.body.id
          }).set({
            project_id: req.body.project_id,
            team_id: req.body.team_id
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
      PostprojectteamDelete: async function (req, res) {
        const id = req.body.id
        await Projectteam.destroy({
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

