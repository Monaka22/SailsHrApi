/**
 * FreetimeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    Getfreetime : async function (req,res) {
        position_id = req.param('position_id');
        project_id = req.param('id');
        let positiondata = await Positionemployee.find({
            where: {
                //project_id : project_id,
                position_id: position_id
            }
          }).populate('emp_id').populate('position_id');
          let teamdata = await Team.find({
            where: {
                position_id: position_id
            }
          }).populate('emp_id').populate('position_id');
          let projectdata = await Projectmanage.findOne({
            id : project_id
          })
          let teampjdata = JSON.parse(JSON.stringify(teamdata));
          let positionpjdata = JSON.parse(JSON.stringify(positiondata));
          let projectpjdata = JSON.parse(JSON.stringify(projectdata));
          let emp_id_t = [];
          let emp_name_t = [];
          let emp_nickname_t = [];
          let emp_end_date = [];
          let emp_id = [];
          let emp_name = [];
          let emp_nickname = [];
          let project_start_date = projectpjdata.project_start_date;
          let project_end_date  = projectpjdata.project_end_date;
          for (let i = 0; i < teampjdata.length; i++) {
            emp_id_t.push(teampjdata[i].emp_id.id);
            emp_name_t.push(teampjdata[i].emp_id.emp_name);
            emp_nickname_t.push(teampjdata[i].emp_id.emp_nickname);
            emp_end_date.push(teampjdata[i].emp_end_date);
          }
          for (let i = 0; i < positionpjdata.length; i++) {
            emp_id.push(positionpjdata[i].emp_id.id);
            emp_name.push(positionpjdata[i].emp_id.emp_name);
            emp_nickname.push(positionpjdata[i].emp_id.emp_nickname);
          }
        //   sails.log(emp_name)
        //   sails.log(emp_id_t)
        //   sails.log(emp_name_t)
        //   sails.log(emp_nickname_t)
        //   sails.log(emp_end_date)
        //   sails.log(emp_nickname_t)
          let free = "ว่าง";
          let freetime = [];
            for(let j=0 ; j < teampjdata.length;j++){
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
            //sails.log(freetime)
            let push = [];
            for (let q = 0; q < emp_name_t.length; q++) {
                push[q] =  emp_id_t[q]+"-"+emp_name_t[q]+"-"+emp_nickname_t[q]+"-"+freetime[q]
            }
            push = Array.from(new Set(push)) 
            emp_id2 = [];
            emp_name2 =[];
            emp_nickname2 =[];
            freetime2 = [];
            for (let w = 0; w < push.length; w++) {
                push[w] = push[w].split("-");
                emp_id2[w] = Number(push[w][0]);
                emp_name2[w] = push[w][1];
                emp_nickname2[w] = push[w][2];
                freetime2[w] = push[w][3];
            }
            emp_id2 = emp_id2.concat(emp_id);
            empcount = emp_name2;
            emp_name2 = emp_name2.concat(emp_name);
            emp_nickname2 = emp_nickname2.concat(emp_nickname);
            emp_id2 = Array.from(new Set(emp_id2))
            emp_name2= Array.from(new Set(emp_name2))
            emp_nickname2 = Array.from(new Set(emp_nickname2))
            //emp_id2 = emp_id2.concat(emp_id_t);
            // sails.log(emp_id2)
            // sails.log(emp_name2)
            // sails.log(emp_nickname2)
            // sails.log(freetime2)
            //let freetome = positionpjdata.length-teampjdata.length
            for (let r = empcount.length; r < emp_name.length; r++) {
                freetime2.push("ว่าง")
            }
            //sails.log(freetime2)
            var jsonObj = {}
            var array = []
            
            for(i=0; i < freetime2.length; i++){
                array.push({emp_id:emp_id2[i],emp_name:emp_name2[i],emp_nickname:emp_nickname2[i],freetime:freetime2[i]})
                jsonObj =  array ;
            } 
            return res.json({data:jsonObj})
    }
   

};
function parseDMY(s) {
    var b = s.split(/\D/);
    var d = new Date(b[2], --b[1], b[0]);
    return d && d.getMonth() == b[1] ? d : new Date(NaN);
  }
