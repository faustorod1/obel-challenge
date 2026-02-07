import { v4 as uuidv4 } from 'uuid';
import { roles } from '../data/db.js';

export const getAllRoles = () => roles;

export const createRole = (roleData) => {
  const { name, description, type, scope } = roleData;
  if (!name) throw new Error("El nombre es obligatorio");

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
  if (index === -1) return null;
  roles[index] = { ...roles[index], ...data };
  return roles[index];
};

export const getRoleById = (id) => {
  return roles.find(r => r.id === id);
};