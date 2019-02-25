/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')
//var Emailaddresses = require('machinepack-emailaddresses')

module.exports = {
  // patch /api/users/login
  login: async function (req, res) {
    if (_.isUndefined(req.body.username)) {
      return res.badRequest('An username address is required.')
    }

    if (_.isUndefined(req.body.password)) {
      return res.badRequest('A password is required.')
    }
    var user = await User.findOne({
      username: req.body.username
    })
    if (!user) return res.notFound()

    let checkPass = await bcrypt.compare(req.body.password, user.password)
    if (checkPass) {
      // if no errors were thrown, then grant them a new token
      // set these config vars in config/local.js, or preferably in config/env/production.js as an environment variable
      var token = jwt.sign({
        user: user.id
      }, sails.config.custom.jwtSecret, {
        expiresIn: '1d'
      }) // sails.config.jwtExpires})
      // set a cookie on the client side that they can't modify unless they sign out (just for web apps)
      res.cookie('sailsjwt', token, {
        signed: true,
        // domain: '.yourdomain.com', // always use this in production to whitelist your domain
        maxAge: 86400 //sails.config.jwtExpires
      })
      //sails.log(token)
      // provide the token to the client in case they want to store it locally to use in the header (eg mobile/desktop apps)
      let userjson = JSON.parse(JSON.stringify(user));
      var jsonObj = {
        username: req.body.username,
        status: userjson.status,
        token: token
      }
      return res.ok(jsonObj)
    }else{
		return res.status(400).json({message : "Password fails."});
	}

  },

  // patch /api/users/logout
  logout: function (req, res) {
    res.clearCookie('sailsjwt')
    req.user = null
    return res.ok()
  },

  // post /api/users/register
  register: async function (req, res) {
    if (_.isUndefined(req.body.username)) {
      return res.badRequest('An username address is required.')
    }

    if (_.isUndefined(req.body.password)) {
      return res.badRequest('A password is required.')
    }

    if (req.body.password.length < 8) {
      return res.badRequest('Password must be at least 8 characters.')
    }
    sails.log(req.body)
    var user = await sails.helpers.createUser({
      username: req.body.username,
      password: req.body.password,
      status : req.body.status
    })
    sails.log(user)
    // after creating a user record, log them in at the same time by issuing their first jwt token and setting a cookie
    var token = jwt.sign({
      user: user.id
    }, sails.config.custom.jwtSecret, {
      expiresIn: '1d'
    }) //sails.config.jwtExpires})
    res.cookie('sailsjwt', token, {
      signed: true,
      // domain: '.yourdomain.com', // always use this in production to whitelist your domain
      maxAge: 86400 // sails.config.jwtExpires
    })
    sails.log(token)
    // if this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
    // send a 200 response letting the user agent know the signup was successful.
    if (req.wantsJSON) {
      return res.ok(token)

    }

    // otherwise if this is an HTML-wanting browser, redirect to /welcome.
    //return res.redirect('/welcome')

  },
}
