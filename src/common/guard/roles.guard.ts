import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

const matchRoles = (roles: string[], userRoles: string) => {
  // console.log('matchRoles:', roles, userRoles);
  // return roles.includes(userRoles);
  return true;
};

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('roles:', roles);
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user; // 假装有user
    // console.log('user:', user);
    return matchRoles(roles, user?.roles);
  }
}
//
