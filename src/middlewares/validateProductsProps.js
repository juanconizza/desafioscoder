function validateProductsProps(req, res, next) {
    const data = req.body;
    const requiredProps = ["title", "photo", "category", "price"];
    const missingProps = [];

    // Verificar si las propiedades obligatorias están presentes y si son números enteros
    requiredProps.forEach(prop => {
        if (!data[prop]) {
            missingProps.push(prop);
        } else if (["price", "stock"].includes(prop) && !Number.isInteger(data[prop])) {
            missingProps.push(`${prop} must be an integer`);
        }
    });

    // Si faltan propiedades o si price o stock no son números enteros, devolver un mensaje de error
    if (missingProps.length > 0) {
        return res.status(400).json({
            statusCode: 400,
            response: null,
            message: `The following required fields are missing or invalid: ${missingProps.join(", ")}.`,
        });
    }

    // Definir propiedades por defecto si no están presentes
    if (!data.description) {
        req.body.description = "El usuario no incluyó una descripción";
    }
    if (!data.stock){
        req.body.stock = 1
    }

    // Pasar al siguiente middleware
    next();
}

export default validateProductsProps;
