const fs = require("fs");
const swaggerSpec = require("./swaggerConfig"); 

fs.writeFileSync("swagger.json", JSON.stringify(swaggerSpec, null, 2));
console.log("✅ Archivo swagger.json generado correctamente.");
