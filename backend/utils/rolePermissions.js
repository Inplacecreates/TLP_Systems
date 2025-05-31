// Define roles
export const ROLES = {
  ADMIN: 'ADMIN',
  EMPLOYEE: 'EMPLOYEE',
  FINANCE: 'FINANCE',
  HR: 'HR',
  SUPERVISOR: 'SUPERVISOR'
};

// Define permission levels
export const PERMISSIONS = {
  READ: 'read',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  APPROVE: 'approve',
  REJECT: 'reject',
  ESCALATE: 'escalate'
};

// Define resources
export const RESOURCES = {
  LEAVE: 'leave',
  OPERATION: 'operation',
  INCIDENT: 'incident',
  USER: 'user',
  REPORT: 'report'
};

// Role-based permission matrix
export const rolePermissions = {
  [ROLES.ADMIN]: {
    [RESOURCES.LEAVE]: [PERMISSIONS.READ, PERMISSIONS.CREATE, PERMISSIONS.UPDATE, PERMISSIONS.DELETE, PERMISSIONS.APPROVE, PERMISSIONS.REJECT],
    [RESOURCES.OPERATION]: [PERMISSIONS.READ, PERMISSIONS.CREATE, PERMISSIONS.UPDATE, PERMISSIONS.DELETE, PERMISSIONS.APPROVE, PERMISSIONS.REJECT],
    [RESOURCES.INCIDENT]: [PERMISSIONS.READ, PERMISSIONS.CREATE, PERMISSIONS.UPDATE, PERMISSIONS.DELETE, PERMISSIONS.ESCALATE],
    [RESOURCES.USER]: [PERMISSIONS.READ, PERMISSIONS.CREATE, PERMISSIONS.UPDATE, PERMISSIONS.DELETE],
    [RESOURCES.REPORT]: [PERMISSIONS.READ, PERMISSIONS.CREATE]
  },
  [ROLES.SUPERVISOR]: {
    [RESOURCES.LEAVE]: [PERMISSIONS.READ, PERMISSIONS.APPROVE, PERMISSIONS.REJECT],
    [RESOURCES.OPERATION]: [PERMISSIONS.READ, PERMISSIONS.CREATE, PERMISSIONS.APPROVE, PERMISSIONS.REJECT],
    [RESOURCES.INCIDENT]: [PERMISSIONS.READ, PERMISSIONS.CREATE, PERMISSIONS.UPDATE, PERMISSIONS.ESCALATE],
    [RESOURCES.USER]: [PERMISSIONS.READ],
    [RESOURCES.REPORT]: [PERMISSIONS.READ]
  },
  [ROLES.HR]: {
    [RESOURCES.LEAVE]: [PERMISSIONS.READ, PERMISSIONS.CREATE, PERMISSIONS.UPDATE, PERMISSIONS.APPROVE, PERMISSIONS.REJECT],
    [RESOURCES.INCIDENT]: [PERMISSIONS.READ, PERMISSIONS.CREATE, PERMISSIONS.UPDATE, PERMISSIONS.ESCALATE],
    [RESOURCES.USER]: [PERMISSIONS.READ, PERMISSIONS.CREATE, PERMISSIONS.UPDATE],
    [RESOURCES.REPORT]: [PERMISSIONS.READ, PERMISSIONS.CREATE]
  },
  [ROLES.FINANCE]: {
    [RESOURCES.OPERATION]: [PERMISSIONS.READ, PERMISSIONS.UPDATE, PERMISSIONS.APPROVE, PERMISSIONS.REJECT],
    [RESOURCES.REPORT]: [PERMISSIONS.READ, PERMISSIONS.CREATE]
  },
  [ROLES.EMPLOYEE]: {
    [RESOURCES.LEAVE]: [PERMISSIONS.READ, PERMISSIONS.CREATE],
    [RESOURCES.OPERATION]: [PERMISSIONS.READ, PERMISSIONS.CREATE],
    [RESOURCES.INCIDENT]: [PERMISSIONS.READ, PERMISSIONS.CREATE],
    [RESOURCES.USER]: [PERMISSIONS.READ],
    [RESOURCES.REPORT]: [PERMISSIONS.READ]
  }
};

/**
 * Check if a role has permission to perform an action on a resource
 * @param {string} role - User role
 * @param {string} resource - Resource being accessed
 * @param {string} permission - Permission being checked
 * @returns {boolean} - Whether the role has the permission
 */
export const hasPermission = (role, resource, permission) => {
  if (!rolePermissions[role]) return false;
  if (!rolePermissions[role][resource]) return false;
  return rolePermissions[role][resource].includes(permission);
};

/**
 * Get all permissions for a role
 * @param {string} role - User role
 * @returns {Object} - Object with resources and their permissions
 */
export const getRolePermissions = (role) => {
  return rolePermissions[role] || {};
};

/**
 * Check if user has any of the required permissions for a resource
 * @param {string} role - User role
 * @param {string} resource - Resource being accessed
 * @param {string[]} requiredPermissions - Array of permissions to check
 * @returns {boolean} - Whether the role has any of the required permissions
 */
export const hasAnyPermission = (role, resource, requiredPermissions) => {
  if (!rolePermissions[role] || !rolePermissions[role][resource]) return false;
  return requiredPermissions.some(permission =>
    rolePermissions[role][resource].includes(permission)
  );
};
