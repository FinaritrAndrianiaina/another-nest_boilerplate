import { UnauthorizedException } from '@nestjs/common';
import User from 'src/users/entities/user.entity';
import { ADMIN, OWNER } from 'src/users/entities/user.role';

export function matchRoles(roles: string[], user: User, request: any): boolean {
	for (const role of roles) {
		switch (role) {
			case ADMIN: {
				if (!user.isAdmin) throw new UnauthorizedException('You need to be an admin to access to this account');
				break;
			}
			default:
				return false;
		}
	}
	return true;
}
