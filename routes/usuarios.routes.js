const { Router } = require('express');

const router = Router();

const { createUser, deleteUser, getUsers, updateUser } = require('../controllers/index.controller')

router.get('/obtenerUsuarios', getUsers);
router.post('/registrarUsuario', createUser);
router.delete('/eliminarUsuario/:id', deleteUser);
router.put('/actualizarUsuario/:id', updateUser);

module.exports = router;