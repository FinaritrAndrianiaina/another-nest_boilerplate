import { Injectable, CanActivate, ExecutionContext, Optional, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard, AuthModuleOptions } from '@nestjs/passport';
import { ALLOW_ANONYMOUS } from './auth.meta';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
	constructor(@Optional() protected readonly options: AuthModuleOptions, private reflector: Reflector) {
        super(options)
    }

    canActivate(context:ExecutionContext){
        const isAnonymousAllowed =
			this.reflector.get<boolean>(ALLOW_ANONYMOUS, context.getHandler()) ||
			this.reflector.get<boolean>(ALLOW_ANONYMOUS, context.getClass());
        if(isAnonymousAllowed){
            return true
        }
        return super.canActivate(context);
    }
}


export const AllowAnonymous = ()=> SetMetadata(ALLOW_ANONYMOUS,true);
