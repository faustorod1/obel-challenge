import { users } from '../data/db.js';

export const assignRoleToUser = (userId, roleId, allRoles) => {
  const user = users.find(u => u.id === userId);
  if (!user) return { error: "Usuario no encontrado" };

  const roleExists = allRoles.some(r => r.id === roleId);
  if (!roleExists) {
    return { error: "El Rol especificado no existe en el sistema" };
  }

  if (!user.assignedRoles.includes(roleId)) {
    user.assignedRoles.push(roleId);
  }
  
  return { user };
};

export const removeRoleFromUser = (userId, roleId) => {
  const user = users.find(u => u.id === userId);
  if (!user) return false;

  user.assignedRoles = user.assignedRoles.filter(id => id !== roleId);
  return true;
};

export const getUserRoles = (userId, allRoles) => {
  const user = users.find(u => u.id === userId);
  if (!user) return null;
  return user.assignedRoles.map(roleId => allRoles.find(r => r.id === roleId));
};