import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Obel Challenge API',
      version: '1.0.0',
      description: 'API robusta para la gestión de roles y asignación de usuarios con integridad referencial.',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Servidor Local' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'Ingresá el token de tu .env (ej: 12345)',
        },
      },
    },
    paths: {
      // --- ENDPOINTS DE ROLES ---
      '/api/roles': {
        get: {
          summary: 'Listar todos los roles',
          tags: ['Roles'],
          security: [{ bearerAuth: [] }],
          responses: { 200: { description: 'Lista de roles obtenida con éxito' } }
        },
        post: {
          summary: 'Crear un nuevo rol',
          tags: ['Roles'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name'],
                  properties: {
                    name: { type: 'string', example: 'Admin' },
                    description: { type: 'string', example: 'Acceso total' },
                    type: { type: 'string', example: 'admin' },
                    scope: { type: 'string', example: 'global' }
                  }
                }
              }
            }
          },
          responses: {
            201: { description: 'Rol creado' },
            400: { description: 'Datos inválidos' },
            409: { description: 'Nombre de rol duplicado' }
          }
        }
      },
      '/api/roles/{id}': {
        get: {
          summary: 'Obtener un rol por ID',
          tags: ['Roles'],
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Rol encontrado' }, 404: { description: 'No encontrado' } }
        },
        put: {
          summary: 'Actualizar un rol',
          tags: ['Roles'],
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    description: { type: 'string' },
                    type: { type: 'string' },
                    scope: { type: 'string' }
                  }
                }
              }
            }
          },
          responses: { 200: { description: 'Actualizado' }, 404: { description: 'No encontrado' } }
        },
        delete: {
          summary: 'Eliminar un rol (Borrado en Cascada)',
          tags: ['Roles'],
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Rol eliminado y desvinculado de usuarios' } }
        }
      },
      // --- ENDPOINTS DE USUARIOS ---
      '/api/users/assign': {
        post: {
          summary: 'Asignar un rol a un usuario',
          tags: ['Users'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['userId', 'roleId'],
                  properties: {
                    userId: { type: 'string', example: 'u1' },
                    roleId: { type: 'string', example: 'r1' }
                  }
                }
              }
            }
          },
          responses: { 200: { description: 'Asignado' }, 400: { description: 'Error en asignación' } }
        }
      },
      '/api/users/unassign': {
        post: {
          summary: 'Desasignar un rol de un usuario',
          tags: ['Users'],
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['userId', 'roleId'],
                  properties: {
                    userId: { type: 'string', example: 'u1' },
                    roleId: { type: 'string', example: 'r1' }
                  }
                }
              }
            }
          },
          responses: { 200: { description: 'Desasignado' } }
        }
      },
      '/api/users/{id}/roles': {
        get: {
          summary: 'Listar roles de un usuario específico',
          tags: ['Users'],
          security: [{ bearerAuth: [] }],
          parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'string' } }],
          responses: { 200: { description: 'Lista de roles del usuario' } }
        }
      }
    }
  },
  apis: [],
};

export const specs = swaggerJSDoc(options);