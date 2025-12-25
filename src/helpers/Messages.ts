export const MESSAGES = {
  // ERRORES DEL CLIENTE
  UNAUTHORIZED: "No autorizado",
  INVALID_TOKEN: "Token inválido",
  INVALID_CREDENTIALS: "Credenciales inválidas",
  INVALID_DATA: "Datos inválidos",
  USER_ALREADY_EXISTS: "El usuario ya existe",
  NOT_FOUND: (campo: string) => `${campo} no encontrad@`,
  ERROR_PERFIL: "Error al obtener el perfil",
  TOKEN_INVALID: "Token inválido",
  TOKEN_MISSING: "Token no proporcionado",
  FORBIDDEN: "Acceso denegado",

  // ERROR DE SERVIDOR
  INTERNAL_SERVER_ERROR: "Error interno del servidor",

  // ERROR DE RUTAS
  ROUTE_NOT_FOUND: "Ruta no encontrada",

  // MENSAGES GENRALES
  // Exito
  OK: "Datos correctos",
  //Error
  NO_PROCESS: "Datos no procesados",

  // VALIDACIONES
  PASSWORD_TOO_WEAK: "La contraseña es demasiado débil",
  INVALID_DATE: (campo: string) => `La fecha de ${campo} es inválida`,
  INPUT_INVALID: (campo: string) => `El ${campo} no es válido`,
  REQUIRED: (campo: string) => `Este ${campo} es obligatorio`,
  MIN_LENGTH: (campo: string, length: number) =>
    `El ${campo} debe tener al menos ${length} caracteres`,

  SUCCESS_LOGOUT: "Sesión cerrada exitosamente",

  //Seeder
  SEEDER_SUCCESS: (created: string, cre?: number, omit?: number) => `Seeder ${created}: Create: ${cre} Omitted: ${omit}`,
  SEEDER_ERROR: "Error, seeder no ejecutado",
  SEEDER_START: (campo: string) => `Ejecutando seeder ${campo}`,
  SEEDER_EXISTS: (campo: string) => `${campo} ya existe. Seeder omitido.`

};
