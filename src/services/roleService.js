import { v4 as uuidv4 } from 'uuid';
import { roles, users } from '../data/db.js';

export const getAllRoles = () => roles;

export const createRole = (roleData) => {
  const { name, description, type, scope } = roleData;
  
  const roleExists = roles.find(r => r.name.toLowerCase() === name.toLowerCase());
  if (roleExists) {
    return { error: "Ya existe un rol con el nombre: " + name };
  }

  const newRole = {
    id: uuidv4(),
    name,
    description: description || "",
    type: type || "user",
    scope: scope || "global"
  };

  roles.push(newRole);

  return newRole;
};

export const updateRole = (id, data) => {
  const index = roles.findIndex(r => r.id === id);

  if (index === -1) {
    return { error: "Rol no encontrado", status: 404 };
  }

if (data.name) {
    const duplicate = roles.find(r => 
      r.name.toLowerCase() === data.name.toLowerCase() && r.id !== id
    );
    if (duplicate) {
      return { error: "Ya existe otro rol con el nombre: " + data.name, status: 409 };
    }
  }

  roles[index] = { ...roles[index], ...data };

  return { success: true, data: roles[index] };
};

export const getRoleById = (id) => {
  return roles.find(r => r.id === id);
};

export const deleteRole = (roleId) => {
  const index = roles.findIndex(r => r.id === roleId);
  
  if (index === -1) {
    return { error: "El rol que intentas eliminar no existe", status: 404 };
  }

  users.forEach(user => {
    user.assignedRoles = user.assignedRoles.filter(id => id !== roleId);
  });

  roles.splice(index, 1);

  return { success: true };
};