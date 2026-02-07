import * as roleService from '../services/roleService.js';

export const getRoles = (req, res) => {
  const roles = roleService.getAllRoles();
  res.json(roles);
};

export const postRole = (req, res) => {
  try {
    const newRole = roleService.createRole(req.body);
    res.status(201).json(newRole);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const putRole = (req, res) => {
  const updated = roleService.updateRole(req.params.id, req.body);
  if (!updated) return res.status(404).json({ message: "Rol no encontrado" });
  res.json(updated);
};

export const getRoleById = (req, res) => {
  const { id } = req.params;
  const role = roleService.getRoleById(id);

  if (!role) {
    return res.status(404).json({ message: "Rol no encontrado" });
  }

  res.status(200).json(role);
};