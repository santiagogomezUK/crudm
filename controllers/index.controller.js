const usuario = require('../models/usuarios')
const bcrypt = require('bcryptjs')

exports.createUser = async (req, res) => {
	try {
		const nuevoUsuario = new usuario(req.body);
		const usuarioGuardado = await nuevoUsuario.save();

		res.status(201).json(usuarioGuardado);
	} catch (err) {
		res.status(400).json({ error: err.message })
	}
};

exports.getUsers = async (req, res) => {
	try {
		const usuarios = await usuario.find();
		res.json(usuarios);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
}

exports.updateUser = async (req, res) => {
	if (!req.body) {
		return res.status(400).json({ message: 'No hay datos para actualizar' });
	}

	const id = req.params.id;

	try {
		let user = await usuario.findById(id);

		if (!user) {
			res.status(404).send({ message: 'No se encontro el usuario' })
		}

		if (req.body.name) {
			user.name = req.body.name;
		}
		if (req.body.lastname) {
			user.lastname = req.body.lastname;
		}
		if (req.body.email) {
			user.email = req.body.email;
		}

		if (req.body.password) {
			const salt = bcrypt.genSaltSync(10);
			user.password = await bcrypt.hash(req.body.password, salt);
		}

		await user.save();

		return res.send({ message: 'Usuario actualizado' })

	} catch (err) {
		res.status(500).send({ message: 'Error al actualizar el usuario' })
	}
}

exports.deleteUser = async (req, res) => {
	try {
		const { id } = req.params;
		const usuarioEliminado = await usuario.findByIdAndDelete(id);

		res.status(201).json({ message: 'Usuario eliminado' });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
}