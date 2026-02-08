import * as userService from '../services/userService.js';
import { roles } from '../data/db.js';

export const getUsers = (req, res) => {
  try {
    const users = userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la lista de usuarios" });
  }
};

export const assignRole = (req, res) => {
  try {
    const { userId, roleId } = req.body;
    
    if (!userId || !roleId) {
      return res.status(400).json({ message: "userId y roleId son obligatorios" });
    }
    
    const user = userService.getUserById(userId);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (user.assignedRoles.includes(roleId)) {
      return res.status(400).json({ message: "El usuario ya tiene este rol asignado" });
    }

    const result = userService.assignRoleToUser(userId, roleId, roles);

    if (result.error) {
      return res.status(404).json({ message: result.error });
    }

    res.status(200).json({ message: "Rol asignado con éxito", user: result.user });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const unassignRole = (req, res) => {
  const { userId, roleId } = req.body;

  const result = userService.removeRoleFromUser(userId, roleId, roles);
  
  if (result.error) {
    return res.status(404).json({ message: result.error });
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