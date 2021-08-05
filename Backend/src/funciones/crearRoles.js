Roles = require ('../models/roles')

const crearRoles = async () => {
    try {
        const count = await Roles.estimatedDocumentCount();
        if (count > 0) return;

        const values = Promise.all([
            new Roles({nombre: "admin",descripcion: "Perfil de administracion y monitoreo"}).save(),
            new Roles({nombre: "operador",descripcion: "Perfil de operador de juegos"}).save(),
            new Roles({nombre: "contador",descripcion: "Perfil para el contador"}).save(),
            new Roles({nombre: "monitor",descripcion: "Perfil monitoreo"}).save()
        ]);
        console.log('funciones.js values: ',values)
    }catch (error){
        console.error(error);
    }
};

module.exports = crearRoles;