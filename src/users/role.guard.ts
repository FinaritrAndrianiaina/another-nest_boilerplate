import { Injectable, CanActivate, ExecutionContext, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import User from './entities/user.entity';
import { OWNER } from './entities/user.role';
import { matchRoles } from './role.handler';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.get<string[]>('roles', context.getHandler());
		const onlyOwner = this.reflector.get<boolean>(OWNER,context.getHandler());
		
		const request = context.switchToHttp().getRequest();
		const user:User = request.user;
		if (onlyOwner) {
			if (!(user.id === request.params.id)&&!user.isAdmin) {
				throw new UnauthorizedException();
			}
		}
		if (!roles) {
			return true;
		}
		return matchRoles(roles, user,request);
	}
}



export const Roles = (...roles) => SetMetadata('roles', roles);

export const OwnerOrAdmin = () => SetMetadata(OWNER,true);