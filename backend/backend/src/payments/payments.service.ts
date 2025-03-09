import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    login(): string {
        return 'Login realizado com sucesso!';
    }
}
