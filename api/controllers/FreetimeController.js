/**
 * FreetimeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    Getfreetime : async function (req,res) {
        position = req.param('position_id');
        projectid = req.param('id');
        let data = await Team.find({
            where: {
                project_id : projectid,
                position_id: position
            }
          }).populate('emp_id').populate('position_id');
        let pjdata = await Projectmanage.findOne({
                id : projectid
          })
          let tpjdata = JSON.parse(JSON.stringify(pjdata));
          let emp_id = [];
          let emp_name = [];
          let emp_nickname = [];
          let emp_start_date = [];
          let emp_end_date = [];
          let project_start_date = tpjdata.project_start_date;
          let project_end_date  = tpjdata.project_end_date;
          const tdata = JSON.parse(JSON.stringify(data));
           for (let i = 0; i < tdata.length; i++) {
            emp_id.push(tdata[i].emp_id.id);
            emp_name.push(tdata[i].emp_id.emp_name);
            emp_nickname.push(tdata[i].emp_id.emp_nickname);
            emp_start_date.push(tdata[i].emp_start_date);
            emp_end_date.push(tdata[i].emp_end_date);
          }
          let free = "";
          let freetime = [];
            for(let j=0 ; j < emp_start_date.length;j++){
                let empenddate = emp_end_date[j];
                let projectstartdate = project_start_date;
                let projectenddate = project_end_date;
                empenddate = empenddate.split("T");
                projectstartdate = projectstartdate.split("T");
                projectenddate =  projectenddate.split("T");
                empenddate = empenddate[0];
                projectstartdate = projectstartdate[0];
                projectenddate = projectenddate[0];
                empenddate = empenddate.split("-");
                projectstartdate = projectstartdate.split("-");
                projectenddate = projectenddate.split("-");
                let newDate = empenddate[2] + "/" + empenddate[1] + "/" + empenddate[0];
                let newDate2 = projectstartdate[2] + "/" + projectstartdate[1] + "/" + projectstartdate[0];
                let newDate3 = projectenddate[2] + "/" + projectenddate[1] + "/" + projectenddate[0];
                timestamp = parseDMY(newDate).getTime();
                timestamp2 = parseDMY(newDate2).getTime();
                timestamp3 = parseDMY(newDate3).getTime();
                //sails.log(timestamp,timestamp2,timestamp3)
                if (timestamp > timestamp2 && timestamp < timestamp3) {
                   free = "ไม่ว่าง"
                }else{
                    free = "ว่าง"
                }
                freetime.push(free);
            }
            var jsonObj = {}
            var array = []
            
            for(i=0; i < tdata.length; i++){
                array.push({emp_id:emp_id[i],emp_name:emp_name[i],emp_nickname:emp_nickname[i],freetime:freetime[i]})
                jsonObj =  array ;
            } 
            return res.json({data:jsonObj})
          //res.send(tpjdata)
         //return res.json({emp_name:emp_name,emp_nickname:emp_nickname,emp_end_date:emp_end_date,emp_start_date:emp_start_date,project_start_date:project_start_date,project_end_date:project_end_date,freetime:freetime})



    },
   

};
function parseDMY(s) {
    var b = s.split(/\D/);
    var d = new Date(b[2], --b[1], b[0]);
    return d && d.getMonth() == b[1] ? d : new Date(NaN);
  }
