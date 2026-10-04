import { SetMetadata } from '@nestjs/common';
import { ROLES } from '../constants/roles.constants.js';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: (string | ROLES | (string | ROLES)[])[]) => {
  return SetMetadata(ROLES_KEY, roles.flat());
};
