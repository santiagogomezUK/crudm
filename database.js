const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const { CRUD_MONGODB_HOST, CRUD_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${CRUD_MONGODB_HOST}/${CRUD_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI, {
})
	.then(db => console.log('database is connected'))
	.catch(err => console.log(err));

module.exports = mongoose.connection;