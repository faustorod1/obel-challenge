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

export const removeRoleFromUser = (userId, roleId, allRoles) => {
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return { error: "Usuario no encontrado" };
  }

  const roleExists = allRoles.some(r => r.id === roleId);
  if (!roleExists) {
    return { error: "El Rol especificado no existe en el sistema" };
  }
  /**
 * IMPORTANCIA DE ESTA VALIDACIÓN:
 * Si bien no es posible que un usuario tenga asignado un rol inexistente...
 * 1. Evita estados inconsistentes donde el cliente cree 
 * haber modificado una relación que nunca existió.
 * Ejemplo: quizo desasignarle a un usuario el rol de id "123" pero tipeó "122".
 * 2. Permite Diferenciar entre "el rol no existe" y 
 * "el usuario no posee ese rol" permite al administrador detectar errores 
 * de escritura vs. errores de lógica de permisos.
 */

  const hasRole = user.assignedRoles.includes(roleId);
  if (!hasRole) {
    return { error: "El usuario no tiene asignado ese rol" };
  }

  user.assignedRoles = user.assignedRoles.filter(id => id !== roleId);
  
  return { success: true };
};

export const getUserRoles = (userId, allRoles) => {
  const user = users.find(u => u.id === userId);
  if (!user) return null;
  return user.assignedRoles.map(roleId => allRoles.find(r => r.id === roleId));
};