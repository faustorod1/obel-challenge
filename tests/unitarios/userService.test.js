import * as userService from '../../src/services/userService.js';

describe('User Service - assignRoleToUser', () => {
  const mockRoles = [{ id: 'role-1', name: 'Admin' }];
  
  test('Debería retornar un error si el rol no existe en el sistema', () => {
    const result = userService.assignRoleToUser('1', 'id-falso', mockRoles);
    expect(result).toHaveProperty('error');
    expect(result.error).toBe('El Rol especificado no existe en el sistema');
  });

  test('Debería asignar el rol correctamente si existe', () => {
    const result = userService.assignRoleToUser('1', 'role-1', mockRoles);
    expect(result).toHaveProperty('user');
    expect(result.user.assignedRoles).toContain('role-1');
  });
});