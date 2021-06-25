import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log(context);
    return true;
  }
}

export default AuthGuard;
