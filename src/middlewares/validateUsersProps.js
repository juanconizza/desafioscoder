export default function validateUsersProps(data) {
  
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
    if (isNaN(data.dni) || !/^\d+$/.test(data.dni.toString())) {
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
  if (
    data.password &&
    !/(?=.*[A-Z])(?=.*[0-9]).{8,}/.test(data.password)
  ) {
    errors.password = `"Contraseña" debe tener al menos 8 caracteres y 1 letra mayusculas y al menos 1 número.`;
  }

  // Validar blockAndLot con el formato MMLL donde MM y LL son dos números enteros
  if (data.blockAndLot && !/^\d{4}$/.test(data.blockAndLot)) {
    errors.blockAndLot = `"Manzana y Lote" debe estar en formato MMLL donde MM es número de Manzana y LL número de Lote`;
  }

  return errors;
}
