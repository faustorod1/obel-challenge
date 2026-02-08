import { v4 as uuidv4 } from 'uuid';

export const roles = [
  {
    id: uuidv4(),
    name: "Administrador",
    description: "Acceso total al sistema",
    type: "admin",
    scope: "global"
  },
  {
    id: uuidv4(),
    name: "Visualizador",
    description: "Solo lectura de datos",
    type: "staff",
    scope: "global"
  },
  {
    id: uuidv4(),
    name: "Contribuyente",
    description: "Acceso parcial al sistema",
    type: "user",
    scope: "local"
  }
];

export const users = [
  { id: "1", name: "Zoe", assignedRoles: [] },
  { id: "2", name: "Antonio", assignedRoles: [] },
  { id: "3", name: "Andrea", assignedRoles: [] },
  { id: "4", name: "Brian", assignedRoles: [] }
];