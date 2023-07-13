"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AppController = exports.AppController = class AppController {
    constructor(appService, jwtService) {
        this.appService = appService;
        this.jwtService = jwtService;
    }
    async signup(email, password) {
        const saltOrRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltOrRounds);
        return this.appService.saveuser({
            email,
            password: passwordHash
        });
    }
    async signin(email, password, response) {
        const user = await this.appService.findOneBy({ email });
        if (!user) {
            throw new common_1.BadRequestException("User with this email not found!");
        }
        if (!await bcrypt.compare(password, user.password)) {
            throw new common_1.BadRequestException("Invalid password!");
        }
        const token = await this.jwtService.signAsync({ id: user.id });
        response.cookie('token', token, { httpOnly: true });
        return {
            message: 'Successfully logged in!'
        };
    }
    async user(request) {
        try {
            const cookie = request.cookies['token'];
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new common_1.UnauthorizedException();
            }
            const user = await this.appService.findOneBy({ id: data['id'] });
            const { password, ...result } = user;
            return result;
        }
        catch (err) {
            throw new common_1.UnauthorizedException();
        }
    }
    async updateProfile(request, name, phoneNumber, address, additionalAbout) {
        try {
            const cookie = request.cookies['token'];
            const data = await this.jwtService.verifyAsync(cookie);
            if (!data) {
                throw new common_1.UnauthorizedException();
            }
            const user = await this.appService.findOneBy({ id: data['id'] });
            if (!user) {
                throw new common_1.BadRequestException("User not found!");
            }
            user.name = name;
            user.phone_number = phoneNumber;
            user.address = address;
            user.additional_about = additionalAbout;
            await this.appService.updateUser(user);
            return {
                message: 'Updated successfully!'
            };
        }
        catch (err) {
            throw new common_1.UnauthorizedException();
        }
    }
    async logout(response) {
        response.clearCookie('token');
        return {
            message: 'Logged-out!'
        };
    }
};
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('password')),
    __param(2, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "signin", null);
__decorate([
    (0, common_1.Get)('user'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "user", null);
__decorate([
    (0, common_1.Post)('update-profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('name')),
    __param(2, (0, common_1.Body)('phone_number')),
    __param(3, (0, common_1.Body)('address')),
    __param(4, (0, common_1.Body)('additional_about')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "logout", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [app_service_1.AppService,
        jwt_1.JwtService])
], AppController);
//# sourceMappingURL=app.controller.js.map