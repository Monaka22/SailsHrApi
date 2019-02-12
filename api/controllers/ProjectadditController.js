/**
 * ProjectadditController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    GetprojectadditDatatable: async function (req, res) {
        let data = await Projectaddit.find().populate('project_id');
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
      PostprojectadditCreate: async function (req, res) {
        if(!_.isUndefined(req.body.project_addit_title)&&!_.isUndefined(req.body.project_addit_date)&&!_.isUndefined(req.body.project_addit_price)&&!_.isUndefined(req.body.project_id)){
          await Projectaddit.create({
            project_addit_title: req.body.project_addit_title,
            project_addit_date: req.body.project_addit_date,
            project_addit_price: req.body.project_addit_price,
            project_id: req.body.project_id
          }).fetch()
          return res.json({
            message: 'Create Complele'
          })
        }
        return res.status(400).json({
            Error: 'Some Data is Undefined'
          })
        
      },
      GetprojectadditById: async function (req, res) {
        const id = req.param('id')
        if(isNaN(id)){
          return res.status(400).json('id is not integer')
        }
        if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
          let data = await Projectaddit.findOne({
            id: id
          }).populate('project_id');
          if (data) {
            return res.json({
              data: data,
              message: 'Load By id sucess'
            })
          }
          return res.status(404).json('id is notfond');
        }
      },
      PostprojectadditUpdate: async function (req, res) {
        if (_.isUndefined(req.body.id)||req.body.id == ""){
          return res.badRequest('ID is Undefind.')
        }
        try {
          if(!_.isUndefined(req.body.project_addit_title)&&!_.isUndefined(req.body.project_addit_date)&&!_.isUndefined(req.body.project_addit_price)&&!_.isUndefined(req.body.project_id)){
          await Projectaddit.update({
            id: req.body.id
          }).set({
            project_addit_title: req.body.project_addit_title,
            project_addit_date: req.body.project_addit_date,
            project_addit_price: req.body.project_addit_price,
            project_id: req.body.project_id
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
      PostprojectadditDelete: async function (req, res) {
        const id = req.body.id
        if (_.isUndefined(id)||id == ""){
          return res.badRequest('ID is Undefind.')
        }
        await Projectaddit.destroy({
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
      GetAdditProjectGetByid : async function(req,res){
        const id = req.param('id')
        if (!_.isUndefined(id) || !_.isNull(id) || id.trim().length != 0) {
          let data = await Projectaddit.find({where:{project_id:id}});
          const jdata = JSON.parse(JSON.stringify(data));
          let costprojectaddit = 0
          for (let i = 0; i < data.length; i++) {
            costprojectaddit += jdata[i].project_addit_price
    
          }
          if (data) {
            return res.json({
              data: data,
              totaladdit : costprojectaddit,
              message: 'Load By id sucess'
            })
          }
          return res.sendStatus(404);
        }
      },

};

