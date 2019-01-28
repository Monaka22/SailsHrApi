/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  '/': {
    view: 'pages/homepage'
  },
  'OPTIONS /*': {
    skipAssets: true,
    fn: function (req, res) {
      return res.json({
        message: 'Options ok.'
      })
    }
  },
  //Branch API
  'GET /branch/datatable': 'BranchController.GetBranchDatatable',
  'POST /branch/create': 'BranchController.PostBranchCreate',
  'GET /branch/:id/view': 'BranchController.GetBranchById',
  'POST /branch/update': 'BranchController.PostBranchUpdate',
  'POST /branch/delete': 'BranchController.PostBranchDelete',
  //Position API
  'GET /position/datatable': 'PositionController.GetpositionDatatable',
  'POST /position/create': 'PositionController.PostPositionCreate',
  'GET /position/:id/view': 'PositionController.GetPositionById',
  'POST /position/update': 'PositionController.PostPositionUpdate',
  'POST /position/delete': 'PositionController.PostPositionDelete',
  //Branch_Addit API
  'GET /branchaddit/datatable': 'BranchadditController.GetbranchadditDatatable',
  'POST /branchaddit/create': 'BranchadditController.PostbranchadditCreate',
  'GET /branchaddit/:id/view': 'BranchadditController.GetbranchadditById',
  'POST /branchaddit/update': 'BranchadditController.PostbranchadditUpdate',
  'POST /branchaddit/delete': 'BranchadditController.PostbranchadditDelete',
  //user API
  'GET /user/datatable': 'UserController.GetuserDatatable',
  'POST /user/create': 'UserController.PostuserCreate',
  'GET /user/:id/view': 'UserController.GetuserById',
  'POST /user/update': 'UserController.PostuserUpdate',
  'POST /user/delete': 'UserController.PostuserDelete',
  //employee API
  'GET /emp/datatable': 'EmployeeController.GetemployeeDatatable',
  // 'GET /emp/datatable': 'EmployeeController.GetemployeeDatatable',
  // 'POST /emp/create': 'EmployeeController.PostemployeeCreate', 
  // 'GET /emp/:id/view': 'EmployeeController.GetemployeeById',
  // 'POST /emp/update': 'EmployeeController.PostemployeeUpdate',
  // 'POST /emp/delete':'EmployeeController.PostemployeeDelete',
  //benefit API
  'GET /benefit/datatable': 'BenefitController.GetbenefitDatatable',
  'POST /benefit/create': 'BenefitController.PostbenefitCreate',
  'GET /benefit/:id/view': 'BenefitController.GetbenefitById',
  'POST /benefit/update': 'BenefitController.PostbenefitUpdate',
  'POST /benefit/delete': 'BenefitController.PostbenefitDelete',
  //fixcost API
  'GET /fixcost/datatable': 'FixcostController.GetfixcostDatatable',
  'POST /fixcost/create': 'FixcostController.PostfixcostCreate',
  'GET /fixcost/:id/view': 'FixcostController.GetfixcostById',
  'POST /fixcost/update': 'FixcostController.PostfixcostUpdate',
  'POST /fixcost/delete': 'FixcostController.PostfixcostDelete',
  //Positionemployee API
  'GET /positionemp/datatable': 'PositionemployeeController.GetpositionempDatatable',
  'POST /positionemp/create': 'PositionemployeeController.PostpositionempCreate',
  'GET /positionemp/:id/view': 'PositionemployeeController.GetpositionempById',
  'POST /positionemp/update': 'PositionemployeeController.PostpositionempUpdate',
  'POST /positionemp/delete': 'PositionemployeeController.PostpositionempDelete',
 //Costdata API
 'GET /costdata/datatable': 'CostdataController.GetcostdataDatatable',
 'POST /costdata/create': 'CostdataController.PostcostdataCreate',
 'GET /costdata/:id/view': 'CostdataController.GetcostdataById',
 'POST /costdata/update': 'CostdataController.PostcostdataUpdate',
 'POST /costdata/delete': 'CostdataController.PostcostdataDelete',
 //Projectmanage API
 'GET /projectmanage/datatable': 'ProjectmanageController.GetprojectmanageDatatable',
 'POST /projectmanage/create': 'ProjectmanageController.PostprojectmanageCreate',
 'GET /projectmanage/:id/view': 'ProjectmanageController.GetprojectmanageById',
 'POST /projectmanage/update': 'ProjectmanageController.PostprojectmanageUpdate',
 'POST /projectmanage/delete': 'ProjectmanageController.PostprojectmanageDelete',
//Team API
'GET /team/datatable': 'TeamController.GetteamDatatable',
'POST /team/create': 'TeamController.PostteamCreate',
'GET /team/:id/view': 'TeamController.GetteamById',
'POST /team/update': 'TeamController.PostteamUpdate',
'POST /team/delete': 'TeamController.PostteamDelete',
//Projectaddit API
'GET /projectaddit/datatable': 'ProjectadditController.GetprojectadditDatatable',
'POST /projectaddit/create': 'ProjectadditController.PostprojectadditCreate',
'GET /projectaddit/:id/view': 'ProjectadditController.GetprojectadditById',
'POST /projectaddit/update': 'ProjectadditController.PostprojectadditUpdate',
'POST /projectaddit/delete': 'ProjectadditController.PostprojectadditDelete',








  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/


};
