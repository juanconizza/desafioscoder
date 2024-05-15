function validateUsersProps(req, res, next) {
  const data = req.body;
  const errors = {};

  // Verificar si las propiedades obligatorias están presentes
  const requiredProps = [
    "name",
    "lastName",
    "dni",
    "blockAndLot",
    "phone",
    "email",
    "password",
  ];
  requiredProps.forEach((prop) => {
    if (!data[prop]) {
      errors[prop] = `"${prop}" es un campo requerido.`;
    }
  });

  // Validar dni como número entero sin puntos
  if (data.dni) {
    if (isNaN(data.dni)) {
      errors.dni = `"DNI" debe ser un número sin puntos.`;
    } else if (!/^\d+$/.test(data.dni.toString())) {
      errors.dni = `"DNI" debe ser un número sin puntos.`;
    }
  }

  // Validar phone como número de teléfono
  if (data.phone && !/^\d{10}$/.test(data.phone)) {
    errors.phone = `"Teléfono" debe ser un número de 10 dígitos.`;
  }

  // Validar email como un email válido
  if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = `"email" debe ser válido.`;
  }

  // Validar password con al menos 8 caracteres, una letra mayúscula y un número
  if (data.password && !/(?=.*[A-Z])(?=.*[0-9]).{8,}/.test(data.password)) {
    errors.password = `"Contraseña" debe tener al menos 8 caracteres y 1 letra mayusculas y al menos 1 número.`;
  }

  // Validar blockAndLot con el formato MMLL donde MM y LL son dos números enteros
  if (data.blockAndLot && !/^\d{2}\d{2}$/.test(data.blockAndLot)) {
    errors.blockAndLot = `"Manzana y Lote" debe estar en formato MMLL donde MM es número de Manzana y LL número de Lote`;
  }

  // Validamos por defecto que role sea 0 (0 = user / 1= admin)
  if (!data.role) {
    req.body.role = 0;
  }

  // Si hay errores, devolver un mensaje de error
  if (Object.keys(errors).length > 0) {
    const error = new Error(
      `Validation error: ${Object.values(errors).join(", ")}`,
    );
    error.statusCode = 400;
    error.errors = errors;
    throw error; // Lanzar el error para que sea capturado por el errorHandler
  }

  // Pasar al siguiente middleware si no hay errores
  next();
}

export default validateUsersProps;
