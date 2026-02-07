import * as userService from '../services/userService.js';
import { roles } from '../data/db.js';

export const assignRole = (req, res) => {
  const { userId, roleId } = req.body;
  
  if (!userId || !roleId) {
    return res.status(400).json({ message: "userId y roleId son obligatorios" });
  }

  const result = userService.assignRoleToUser(userId, roleId, roles);
  
  if (result.error) {
    return res.status(404).json({ message: result.error });
  }

  res.status(200).json({ message: "Rol asignado con éxito", user: result.user });
};

export const unassignRole = (req, res) => {
  const { userId, roleId } = req.body;

  const success = userService.removeRoleFromUser(userId, roleId);
  
  if (!success) {
    return res.status(404).json({ message: "Usuario no encontrado o error en la operación" });
  }

  res.status(200).json({ message: "Asignación eliminada con éxito" });
};

export const getUserRoles = (req, res) => {
  const { id } = req.params;
  
  const userRoles = userService.getUserRoles(id, roles);

  if (!userRoles) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  res.status(200).json(userRoles);
};