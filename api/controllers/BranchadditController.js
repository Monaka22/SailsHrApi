/**
 * BranchadditController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    GetbranchadditDatatable : async function (req,res) {
        let data = await Branchaddit.find()
        .populate("branch_addit_branch_id")
        .exec(function(err,branch_addit){
            if(err){
                return res.json(err)
            }
            return res.json({
                draw: 0,
                recordsTotal: data.length,
                recordsFiltered: data.length,
                data: data
              })
        })
         
    }

};

