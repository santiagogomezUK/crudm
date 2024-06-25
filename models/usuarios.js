const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs');

const usuariosSchema = Schema({

	nombre: {
		type: String,
		required: true
	},
	apellido: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true,
		select: false
	},
})

usuariosSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) {
		try {
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(user.password, salt);
		} catch (error) {
			next(error);
		}
	}
	next();
})

usuariosSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password)
}

module.exports = model('usuarios', usuariosSchema)