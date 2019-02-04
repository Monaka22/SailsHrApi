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
  //User API
  'GET /user/datatable': 'UserController.GetuserDatatable',
  'POST /user/create': 'UserController.PostuserCreate',
  'GET /user/:id/view': 'UserController.GetuserById',
  'POST /user/update': 'UserController.PostuserUpdate',
  'POST /user/delete': 'UserController.PostuserDelete',
  //Employee API
  'GET /emp/datatable': 'EmployeesController.GetemployeeDatatable',
  'POST /emp/create': 'EmployeesController.PostemployeeCreate',
  'GET /emp/:id/view': 'EmployeesController.GetemployeeById',
  'POST /emp/update': 'EmployeesController.PostemployeeUpdate',
  'POST /emp/delete': 'EmployeesController.PostemployeeDelete',
  //Benefit API
  'GET /benefit/datatable': 'BenefitController.GetbenefitDatatable',
  'POST /benefit/create': 'BenefitController.PostbenefitCreate',
  'GET /benefit/:id/view': 'BenefitController.GetbenefitById',
  'POST /benefit/update': 'BenefitController.PostbenefitUpdate',
  'POST /benefit/delete': 'BenefitController.PostbenefitDelete',
  //Fixcost API
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
  //Branch cost API
  'GET /branchcost/addit/:id/view': 'BranchadditController.GetbranchcostGetAdditByid',
  'GET /branchcost/fixcost/:id/view': 'BranchadditController.GetbranchcostGetFixcostByid',
  //Employee Benefit Api
  'GET /employee/benefit/:id/view': 'BenefitController.GetEmployeeBenefitGetByid',
  //Employee find Position API
  'GET /emp/position/:id/view': 'PositionemployeeController.GetEmployeePositionGetByid',
  //Chaiwat API
  'GET /555': 'TeamController.TestDatetotime',
  //Position find Employee API
  'GET /position/emp/:id/view': 'PositionemployeeController.GetPositionEmployeeGetByid',
  //Projecc addit API
  'GET /project/projectaddit/:id/view': 'ProjectadditController.GetAdditProjectGetByid',
  //ProjectTeam API
  'GET /projectteam/datatable': 'ProjectteamController.GetprojectteamDatatable',
  'POST /projectteam/create': 'ProjectteamController.PostprojectteamCreate',
  'GET /projectteam/:id/view': 'ProjectteamController.GetprojectteamById',
  'POST /projectteam/update': 'ProjectteamController.PostprojectteamUpdate',
  'POST /projectteam/delete': 'ProjectteamController.PostprojectteamDelete',




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
