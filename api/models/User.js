/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
module.exports = {
	primaryKey: 'id',

	attributes: {

		username: {
			type: 'string',
			required: true,
			unique: true
		},

		password: {
			type: 'string',
			required: true
		}
	},

	customToJSON() {
		// obviously never return password downstream to anyone, ever
		return _.omit(this, [
			'password',
		])
	},
}

