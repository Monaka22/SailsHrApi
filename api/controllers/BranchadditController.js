/**
 * BranchadditController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    GetbranchadditDatatable : async function (req,res) {
        let data = await Branchaddit.find()
            return res.json({
                draw: 0,
                recordsTotal: data.length,
                recordsFiltered: data.length,
                data: data,
              })
        }
         

};

