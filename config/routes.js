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
  'POST /branch/delete':'BranchController.PostBranchDelete',
  //Position API
  'GET /position/datatable' : 'PositionController.GetpositionDatatable',
  'POST /position/create': 'PositionController.PostPositionCreate',
  'GET /position/:id/view': 'PositionController.GetPositionById',
  'POST /position/update': 'PositionController.PostPositionUpdate',
  'POST /position/delete':'PositionController.PostPositionDelete',
  //Branch_Addit API
  'GET /branchaddit/datatable' : 'BranchadditController.GetbranchadditDatatable',
  'POST /branchaddit/create': 'BranchadditController.PostbranchadditCreate',
  'GET /branchaddit/:id/view': 'BranchadditController.GetbranchadditById',
  'POST /branchaddit/update': 'BranchadditController.PostbranchadditUpdate',
  'POST /branchaddit/delete':'BranchadditController.PostbranchadditDelete',


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
