/**
 * ProjectmanageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  GetprojectmanageDatatable: async function (req, res) {

    let data = await Projectmanage.find();
    //console.log(data.data.branch_name);
    return res.json({
      draw: 0,
      recordsTotal: data.length,
      recordsFiltered: data.length,
      data: data
    })

  },
  PostprojectmanageCreate: async function (req, res) {
    await Projectmanage.create({
        project_name: req.body.project_name,
        project_costomer_name: req.body.project_costomer_name,
        project_start_date: req.body.project_start_date,
        project_end_date: req.body.project_end_date,
        project_team_name: req.body.project_team_name,
        project_total_cost: req.body.project_total_cost,
        project_note: req.body.project_note
    }).fetch()
    return res.json({
      message: 'Create Complele'
    })
  },
  GetprojectmanageById: async function (req, res) {
    const id = req.param('id')
    if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
      let data = await Projectmanage.findOne({
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
  PostprojectmanageUpdate: async function (req, res) {
    try {

      await Projectmanage.update({
        id: req.body.id
      }).set({
        project_name: req.body.project_name,
        project_costomer_name: req.body.project_costomer_name,
        project_start_date: req.body.project_start_date,
        project_end_date: req.body.project_end_date,
        project_team_name: req.body.project_team_name,
        project_total_cost: req.body.project_total_cost,
        project_note: req.body.project_note
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
  PostprojectmanageDelete: async function (req, res) {
    const id = req.body.id
    await Projectmanage.destroy({
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
