const mysql = require('mysql2/promise');


const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3307',
    database: 'usuariosDB'
});


async function traerEstudiantes() {
    const result = await connection.query('SELECT * FROM estudiantes');
    return result[0];
}
async function traerEstudiante(usuario) {
    const result = await connection.query('SELECT * FROM estudiantes WHERE usuario = ?', usuario);
    return result[0];
}

async function actualizarEstudiantes(usuario, contrasena, nombre, correo, genero, estadoCivil) {
    const result = await connection.query('UPDATE estudiantes SET contrasena = ?, nombre = ?, correo = ?, genero = ?, estadoCivil = ? WHERE usuario = ?', [contrasena, nombre, correo, genero, estadoCivil, usuario]);
    return result;
}

async function validarEstudiante(usuario, contrasena) {
    const result = await connection.query('SELECT * FROM estudiantes WHERE usuario = ? AND contrasena = ?', [usuario, contrasena]);
    return result;
}

async function crearEstudiante(usuario, contrasena, nombre, correo, paisOrigen, necesidadesEspecialesEducacion, genero, estadoCivil, prestamo, beca, desplazado) {
    const result = await connection.query('INSERT INTO estudiantes VALUES(?,?,?,?,?,?,?,?,?,?,?)', [usuario, contrasena, nombre, correo, paisOrigen, necesidadesEspecialesEducacion, genero, estadoCivil, prestamo, beca, desplazado]);
    return result;
}

async function borrarEstudiante(usuario) {
    const result = await connection.query('DELETE FROM estudiantes WHERE usuario = ?', usuario);
    return result[0];
}

module.exports = {
    traerEstudiantes, traerEstudiante, actualizarEstudiantes, validarEstudiante, crearEstudiante, borrarEstudiante
}
