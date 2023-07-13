import { AppService } from './app.service';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
export declare class AppController {
    private readonly appService;
    private jwtService;
    constructor(appService: AppService, jwtService: JwtService);
    signup(email: string, password: string): Promise<import("./entity").User>;
    signin(email: string, password: string, response: Response): Promise<{
        message: string;
    }>;
    user(request: Request): Promise<{
        id: number;
        email: string;
        name: string;
        phone_number: string;
        address: string;
        additional_about: string;
    }>;
    updateProfile(request: Request, name: string, phoneNumber: string, address: string, additionalAbout: string): Promise<{
        message: string;
    }>;
    logout(response: Response): Promise<{
        message: string;
    }>;
}
