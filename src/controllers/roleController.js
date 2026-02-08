import * as roleService from '../services/roleService.js';
import { ROLE_TYPES, ROLE_SCOPES } from '../utils/roles.js';

export const getRoles = (req, res) => {
  const roles = roleService.getAllRoles();
  res.json(roles);
};

export const postRole = (req, res) => {
  let { name, description, type, scope } = req.body;

  name = name?.trim();
  description = description?.trim();

  const nameRegex = /^(?![0-9]+$)[a-zA-Z0-9\s]+$/;

  if (!name || typeof name !== 'string' || name === "") {
    return res.status(400).json({ 
      message: "El nombre del rol es obligatorio y debe ser un texto válido." 
    });
  }

  if (!nameRegex.test(name)) {
    return res.status(400).json({ 
      message: "El nombre no puede ser solo números ni contener caracteres especiales." 
    });
  }

  if (type && !ROLE_TYPES.includes(type)) {
    return res.status(400).json({ 
      message: `El tipo de rol no es válido. Opciones: ${ROLE_TYPES.join(', ')}` 
    });
  }

  if (scope && !ROLE_SCOPES.includes(scope)) {
  return res.status(400).json({ 
    message: `El scope no es válido. Opciones: ${ROLE_SCOPES.join(', ')}` 
  });
}

  try {
    const result = roleService.createRole({ name, description, type, scope });

    if (result.error) {
      return res.status(409).json({ message: result.error });
    }

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const putRole = (req, res) => {
  const { id } = req.params;

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ 
      message: "No se enviaron datos para actualizar. El cuerpo de la petición no puede estar vacío." 
    });
  }

  let { name, type, scope } = req.body;

  const nameRegex = /^(?![0-9]+$)[a-zA-Z0-9\s]+$/;

  if (req.body.hasOwnProperty('name')) {
    name = name?.trim();
    if (!name || name === "") {
      return res.status(400).json({ message: "El nombre no puede quedar vacío." });
    }
    if (!nameRegex.test(name)) {
      return res.status(400).json({ 
        message: "El nombre actualizado no puede ser solo números ni contener caracteres especiales." 
      });
    }
  }

  if (type && !ROLE_TYPES.includes(type)) {
    return res.status(400).json({ message: `Tipo inválido. Opciones: ${ROLE_TYPES.join(', ')}` });
  }

  if (scope && !ROLE_SCOPES.includes(scope)) {
    return res.status(400).json({ message: `Scope inválido. Opciones: ${ROLE_SCOPES.join(', ')}` });
  }

  const result = roleService.updateRole(id, { ...req.body, name });
  
  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.json(result.data);
};

export const getRoleById = (req, res) => {
  const { id } = req.params;
  const role = roleService.getRoleById(id);

  if (!role) {
    return res.status(404).json({ message: "Rol no encontrado" });
  }

  res.status(200).json(role);
};

export const deleteRole = (req, res) => { //Funcionalidad Extra
  const { id } = req.params;
  
  const result = roleService.deleteRole(id);

  if (result.error) {
    return res.status(result.status).json({ message: result.error });
  }

  res.status(200).json({ message: "Rol eliminado y desasignado de todos los usuarios con éxito" });
};