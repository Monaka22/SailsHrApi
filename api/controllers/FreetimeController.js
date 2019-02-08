/**
 * FreetimeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  Getfreetime: async function (req, res) {
    position_id = req.param('position_id');
    project_id = req.param('id');
    let positiondata = await Positionemployee.find({
      where: {
        //project_id : project_id,
        position_id: position_id
      }
    }).populate('emp_id').populate('position_id');
    let teamdata = await Team.find().populate('emp_id').populate('position_id');
    let projectdata = await Projectmanage.findOne({
      id: project_id
    })
    let teampjdata = JSON.parse(JSON.stringify(teamdata));
    let positionpjdata = JSON.parse(JSON.stringify(positiondata));
    let projectpjdata = JSON.parse(JSON.stringify(projectdata));
    //sails.log(positiondata);
    let emp_id_t = [];
    let emp_name_t = [];
    let emp_nickname_t = [];
    let emp_position_id = [];
    let emp_end_date = [];
    let emp_id = [];
    let emp_name = [];
    let emp_nickname = [];
    let freetime = [];
    let project_start_date = projectpjdata.project_start_date;
    let project_end_date = projectpjdata.project_end_date;
    for (let i = 0; i < teampjdata.length; i++) {
      emp_id_t.push(teampjdata[i].emp_id.id);
      emp_name_t.push(teampjdata[i].emp_id.emp_name);
      emp_nickname_t.push(teampjdata[i].emp_id.emp_nickname);
      emp_end_date.push(teampjdata[i].emp_end_date);
      emp_position_id.push(teampjdata[i].position_id.id);
      freetime.push("ว่าง");
    }
    for (let i = 0; i < positionpjdata.length; i++) {
      emp_id.push(positionpjdata[i].emp_id.id);
      emp_name.push(positionpjdata[i].emp_id.emp_name);
      emp_nickname.push(positionpjdata[i].emp_id.emp_nickname);
    }
    // sails.log(emp_name)
    // sails.log(emp_nickname)
    // sails.log(emp_id_t)
    // sails.log(emp_name_t)
     //sails.log(emp_position_id)
    // sails.log(emp_nickname_t)
    // sails.log(emp_end_date)
    // sails.log(freetime)
    //sails.log(freetime)
          let freetime2 = [];
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
                freetime2.push(free);
            }
            //sails.log(freetime2)
            for (let y = 0; y < freetime2.length; y++) {
               for (let z = 0; z < freetime2.length; z++) {
                   if(emp_name_t[y]==emp_name_t[z]){
                       if(freetime2[y]=="ไม่ว่าง"||freetime2[z]=="ไม่ว่าง"){
                        freetime2[y] = "ไม่ว่าง";
                        freetime2[z] = "ไม่ว่าง";
                       }

                   }
               }  
            }
            //sails.log(freetime2)
    //         // sails.log(timestamp2)
    //         // sails.log(timestamp3)
            // let array2 = [];
            // let push = [];
            // for (let q = 0; q < freetime2.length; q++) {
            //     push[q] =  emp_id_t[q]+"-"+emp_name_t[q]+"-"+emp_nickname_t[q]+"-"+emp_position_id[q]+"-"+freetime2[q]
            // }

            // for (let y = 0; y < push.length; y++) {
            //     push[y] = push[y].split("-");
            //     emp_id_t[y] = push[y][0]
            //     emp_name_t[y] = push[y][1]
            //     emp_nickname_t[y] = push[y][2]
            //     emp_position_id[y] = push[y][3]
            //     freetime2[y] = push[y][4]
            // }
        //     sails.log(emp_id_t)
        //     sails.log(emp_name_t)
        //     sails.log(emp_position_id)
        //    sails.log(emp_nickname_t)
        //    sails.log(freetime2)
           var jsonObj = {}
            var array = []
           for(i=0; i < emp_position_id.length; i++){
                    if(emp_position_id[i] == position_id){
                        //sails.log(emp_position_id[i])
                             array.push({emp_id:emp_id_t[i],emp_name:emp_name_t[i],emp_nickname:emp_nickname_t[i],freetime:freetime2[i],position_id:emp_position_id[i]})
                        jsonObj =  array ;
                    }
            } 
                var data ={}
                data = {data:jsonObj}

                return res.json(data)
            //sails.log(push[0][3])
            // for (let index = 0; index < array.length; index++) {
            //     const element = array[index];
                
            // }
    //         push = Array.from(new Set(push)) 
    //         emp_id2 = [];
    //         emp_name2 =[];
    //         emp_nickname2 =[];
    //         freetime2 = [];
    //         for (let w = 0; w < push.length; w++) {
    //             push[w] = push[w].split("-");
    //             emp_id2[w] = Number(push[w][0]);
    //             emp_name2[w] = push[w][1];
    //             emp_nickname2[w] = push[w][2];
    //             freetime2[w] = push[w][3];
    //         }
    //         emp_id2 = emp_id2.concat(emp_id);
    //         empcount = emp_name2;
    //         emp_name2 = emp_name2.concat(emp_name);
    //         emp_nickname2 = emp_nickname2.concat(emp_nickname);
    //         emp_id2 = Array.from(new Set(emp_id2))
    //         emp_name2= Array.from(new Set(emp_name2))
    //         emp_nickname2 = Array.from(new Set(emp_nickname2))
    //         //emp_id2 = emp_id2.concat(emp_id_t);
    //         sails.log(emp_id2)
    //         sails.log(emp_name2)
    //         sails.log(emp_nickname2)
    //         sails.log(freetime)
    //         // let freetome = positionpjdata.length-teampjdata.length
    //         // for (let r = empcount.length; r < emp_name.length; r++) {
    //         //     freetime2.push("ว่าง")
    //         // }
    //         sails.log(empcount.length)
    //         sails.log(emp_name.length)
    //         var jsonObj = {}
    //         var array = []

    //         for(i=0; i < freetime2.length; i++){
    //             array.push({emp_id:emp_id2[i],emp_name:emp_name2[i],emp_nickname:emp_nickname2[i],freetime:freetime2[i]})
    //             jsonObj =  array ;
    //         } 
    //         return res.json({data:jsonObj})
  }


};

function parseDMY(s) {
  var b = s.split(/\D/);
  var d = new Date(b[2], --b[1], b[0]);
  return d && d.getMonth() == b[1] ? d : new Date(NaN);
}
