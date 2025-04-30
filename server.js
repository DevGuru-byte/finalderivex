const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig"); // Este es un archivo aparte

// Importamos rutas
const negociación_electronica = require("./src/routes/negociacionElectronicaRoutes");
const negociación_mixta = require("./src/routes/negociacionMixtaRoutes");
const informe_mensual_derivex = require("./src/routes/informeMensualDerivexRoutes");
const informe_mensual_miembros = require("./src/routes/informeMensualMiembrosRoutes");
const ultimas_transacciones = require("./src/routes/ultimasTransaccionesRoutes");
const categoria_precio_cierre = require("./src/routes/categoriaPrecioCierreRoutes");
const precio_cierre = require("./src/routes/precioCierreRoutes");
const precio_bolsa = require("./src/routes/precioBolsaRoutes");
const precios_convocatorias_subasta_cierre = require("./src/routes/preciosSubastaCierreRoutes");
const resultados_convocatorias = require("./src/routes/resultadosConvocatoriasRoutes");
const regulacion_mercado_anonimo = require("./src/routes/regulacionMercadoAnonimoRoutes");
const historico_resultado_indicadores = require("./src/routes/historicoResultadoIndicadoresRoutes");
const boletines_normativos = require("./src/routes/boletinesNormativosRoutes");
const boletines_informativos = require("./src/routes/boletinesInformativosRoutes");
const normatividad_mercado = require("./src/routes/normatividadMercadoRoutes");
const regulacion_aplicable = require("./src/routes/regulacionAplicableRoutes");
const informes_riesgos_operacional = require("./src/routes/informesRiesgosOperacionalRoutes");
const negociacion_electronica_diaria = require("./src/routes/negociacionElectronicaDiariaRoutes");
const negociacion_electronica_promedio = require("./src/routes/negociacionElectronicaPromedioRoutes");
const negociacion_mixta_diaria = require("./src/routes/negociacionMixtaDiariaRoutes");
const usuario = require("./src/routes/usuarioRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Rutas
app.use('/api/negociacion_electronica', negociación_electronica);
app.use('/api/negociacion_mixta', negociación_mixta);
app.use('/api/informe_mensual_derivex', informe_mensual_derivex);
app.use('/api/informe_mensual_miembros', informe_mensual_miembros);
app.use('/api/ultimas_transacciones', ultimas_transacciones);
app.use('/api/categoria_precio_cierre', categoria_precio_cierre);
app.use('/api/precio_cierre', precio_cierre);
app.use('/api/precio_bolsa', precio_bolsa);
app.use('/api/precios_convocatorias_subasta_cierre', precios_convocatorias_subasta_cierre);
app.use('/api/resultados_convocatorias', resultados_convocatorias);
app.use('/api/regulacion_mercado_anonimo', regulacion_mercado_anonimo);
app.use('/api/historico_resultado_indicadores', historico_resultado_indicadores);
app.use('/api/boletines_normativos', boletines_normativos);
app.use('/api/boletines_informativos', boletines_informativos);
app.use('/api/normatividad_mercado', normatividad_mercado);
app.use('/api/regulacion_aplicable', regulacion_aplicable);
app.use('/api/informes_riesgos_operacional', informes_riesgos_operacional);
app.use('/api/negociacion_electronica_diario', negociacion_electronica_diaria);
app.use('/api/negociacion_electronica_promedio', negociacion_electronica_promedio);
app.use('/api/negociacion_mixta_diario', negociacion_mixta_diaria);
app.use('/api/usuario', usuario);
app.use('/uploads', express.static('uploads'));

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación disponible en http://localhost:${PORT}/api-docs`);
});
