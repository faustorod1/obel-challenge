# Obel Challenge API
API robusta desarrollada en **Node.js** y **Express** para la gestión de roles e integridad de usuarios. El sistema garantiza que no existan datos huérfanos mediante lógica de integridad referencial y borrado en cascada.

## 🚀 Despliegue en Vivo
La API se encuentra hosteada en Render y puedes acceder a la interfaz de usuario aquí:
🔗 **[https://obel-challenge.onrender.com/]**

## 🛠️ Tecnologías Utilizadas
* **Runtime:** Node.js (v22+)
* **Framework:** Express.js
* **Documentación:** Swagger UI / OpenAPI 3.0
* **Arquitectura:** Patrón por capas (Controllers, Services, Middlewares, Routes)
* **Seguridad:** Autenticación por Token (Bearer)
* **Persistencia:** Almacenamiento In-Memory (volátil)

## 🛠️ Funcionalidades de la API

### 🎭 Gestión de Roles 
* **GET /api/roles:** Lista todos los roles creados.
* **POST /api/roles:** Crea un nuevo rol (Validación de nombre obligatoria).
* **GET /api/roles/{id}:** Obtiene el detalle completo de un rol específico mediante su ID.
* **PUT /api/roles/{id}:** Modifica los datos de un rol existente.
* **DELETE /api/roles/{id}:** Elimina un rol y limpia sus referencias en los usuarios (Integridad Referencial). ✨

### 👥 Usuarios y Asignaciones
* **GET /api/users:** Lista todos los usuarios registrados en el sistema. ✨
* **POST /api/users/assign:** Asigna un rol existente a un usuario.
* **POST /api/users/unassign:** Remueve la asignación de un rol de un usuario.
* **GET /api/users/{id}/roles:** Obtiene la lista detallada de roles asignados a un usuario específico

## 🏗️ Arquitectura y Buenas Prácticas
- **Integridad Referencial:** Al eliminar un rol, el sistema limpia automáticamente las referencias en todos los usuarios (Borrado en Cascada).
- **Validación Estricta:** Implementación de RegEx para nombres de roles (evita caracteres especiales y solo números).
- **Manejo de Errores Global:** Blindaje contra errores 500 y validación de sintaxis JSON malformada.
- **Inyección de Dependencias:** El Service se encarga de la lógica, permitiendo que el Controller sea agnóstico a la implementación de los datos.

## ✨ Mejoras y Endpoints Adicionales
Para mejorar la experiencia de testing y ofrecer una solución más completa y funcional, se incluyeron endpoints que no estaban en los requerimientos originales:
* **GET /api/users:** Permite visualizar la lista completa de usuarios y verificar en tiempo real la asignación de roles e integridad de los datos.
* **DELETE /api/roles/{id}:** Implementado para demostrar la lógica de **Borrado en Cascada**. Al eliminar un rol, el sistema busca y limpia automáticamente dicha referencia en todos los usuarios vinculados.

## 🔑 Seguridad y Acceso
La API está protegida por un middleware de autenticación.
- **Header:** `Authorization`
- **Formato:** `Bearer 12345` (o el token configurado)

### Cómo probar en Swagger:
1. Haz clic en el botón **"Authorize"** (el candado verde).
2. Ingresa el token: `12345`.
3. Haz clic en **"Authorize"** y luego **"Close"**.
4. Ahora puedes ejecutar los endpoints protegidos.

## 📦 Instalación Local
Si deseas correr el proyecto en tu máquina:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/faustorod1/obel-challenge.git
   ```
  
2. Instala las dependencias:
    ```bash
    npm install
    ```
    
3. Crea un archivo .env en la raíz con:
    ```env
    PORT=3000
    AUTH_TOKEN=12345
    ```
4. Inicia el servidor:
    ```bash
    npm start
    ```

## 🧪 Tests
El proyecto incluye tests unitarios y de integración para asegurar la estabilidad de los endpoints principales. Para ejecutarlos, utiliza el comando: 
```bash
npm test
```

## 👨‍💻 Autor
Fausto Rodríguez
