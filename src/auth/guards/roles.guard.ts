import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles =
      this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]) ?? this.reflector.get<string[]>(ROLES_KEY, context.getHandler());

    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(roles, user?.userRoles);
  }

  matchRoles(roles: string[], userRoles: string[]): boolean {
    let access = false;
    userRoles?.forEach((userRole) => {
      if (roles.includes(userRole)) {
        access = true;
      }
    });
    return access;
  }
}
