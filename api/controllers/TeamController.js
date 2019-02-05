/**
 * TeamController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  GetteamDatatable: async function (req, res) {
    let data = await Team.find().populate('emp_id');
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
    let empdate = req.body.emp_start_date;
    let empdate2 = req.body.emp_end_date;
    empdate = empdate.split("-");
    empdate2 = empdate2.split("-");
    let newDate = empdate[2] + "/" + empdate[1] + "/" + empdate[0];
    let newDate2 = empdate2[2] + "/" + empdate2[1] + "/" + empdate2[0];
    timestamp = parseDMY(newDate).getTime();
    timestamp2 = parseDMY(newDate2).getTime();
    let day = timestamp2 - timestamp;
    day = Math.floor((day / (3600 * 24)) / 1000);
    let emp_sprint = (day / 7 | 0) + 1;
    await Team.create({
      emp_start_date: req.body.emp_start_date,
      emp_end_date: req.body.emp_end_date,
      emp_workday: day,
      emp_sprint: emp_sprint,
      emp_id: req.body.emp_id
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
      let empdate = req.body.emp_start_date;
      let empdate2 = req.body.emp_end_date;
      empdate = empdate.split("-");
      empdate2 = empdate2.split("-");
      let newDate = empdate[2] + "/" + empdate[1] + "/" + empdate[0];
      let newDate2 = empdate2[2] + "/" + empdate2[1] + "/" + empdate2[0];
      timestamp = parseDMY(newDate).getTime();
      timestamp2 = parseDMY(newDate2).getTime();
      let day = timestamp2 - timestamp;
      day = Math.floor((day / (3600 * 24)) / 1000);
      let emp_sprint = (day / 7 | 0) + 1;
      await Team.update({
        id: req.body.id
      }).set({
        emp_start_date: req.body.emp_start_date,
        emp_end_date: req.body.emp_end_date,
        emp_workday: day,
        emp_sprint: emp_sprint,
        emp_id: req.body.emp_id
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
  },
  TestDatetotime: async function (req, res) {

    var empdate = "2019-06-22";
    var empdate2 = "2019-07-26";
    empdate = empdate.split("-");
    empdate2 = empdate2.split("-");
    var newDate = empdate[2] + "/" + empdate[1] + "/" + empdate[0];
    var newDate2 = empdate2[2] + "/" + empdate2[1] + "/" + (+empdate2[0]+1);
    // var days = Math.floor(31622400 / (3600*24));
    // return res.json({day : days,
    // date : newDate
    // })
    timestamp = parseDMY(newDate).getTime();
    timestamp2 = parseDMY(newDate2).getTime();
    var day = timestamp2 - timestamp;
    day = Math.floor((day / (3600 * 24)) / 1000);
    let emp_sprint = (day / 7 | 0) + 1;

    return res.send({
      date: newDate+" - "+newDate2,
      timestamp: timestamp,
      day: day,
      sprint: emp_sprint
    })


  }

};

function parseDMY(s) {
  var b = s.split(/\D/);
  var d = new Date(b[2], --b[1], b[0]);
  return d && d.getMonth() == b[1] ? d : new Date(NaN);
}
