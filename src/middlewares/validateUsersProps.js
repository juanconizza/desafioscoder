function validateUsersProps(req, res, next) {
    const data = req.body;
    const errors = [];

    // Verificar si las propiedades obligatorias están presentes
    const requiredProps = ["name", "lastName", "dni", "manzanaYLote", "phone", "email", "password"];
    requiredProps.forEach(prop => {
        if (!data[prop]) {
            errors.push(`"${prop}" is a required field.`);
        }
    });

    // Validar dni como número entero sin puntos
    if (data.dni) {
        if (typeof data.dni !== 'number') {
            errors.push(`"dni" must be a number.`);
        } else if (!/^\d+$/.test(data.dni.toString())) {
            errors.push(`"dni" must be an integer number without dots.`);
        }
    }

    // Validar phone como número de teléfono
    if (data.phone && !/^\d{10}$/.test(data.phone)) {
        errors.push(`"phone" must be a 10-digit phone number.`);
    }

    // Validar email como un email válido
    if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
        errors.push(`"email" must be a valid email address.`);
    }

    // Validar password con al menos 8 caracteres, una letra mayúscula y un número
    if (data.password && !/(?=.*[A-Z])(?=.*[0-9]).{8,}/.test(data.password)) {
        errors.push(`"password" must be at least 8 characters long and contain at least one uppercase letter and one number.`);
    }

    // Validar manzanaYLote con el formato MMLL donde MM y LL son dos números enteros
    if (data.manzanaYLote && !/^\d{2}\d{2}$/.test(data.manzanaYLote)) {
        errors.push(`"manzanaYLote" must have the format MMLL where MM and LL are two integer numbers.`);
    }

    // Si hay errores, devolver un mensaje de error
    if (errors.length > 0) {
        return res.status(400).json({
            statusCode: 400,
            response: null,
            message: `Validation error: ${errors.join(", ")}`,
        });
    }

    // Pasar al siguiente middleware si no hay errores
    next();
}

export default validateUsersProps;
