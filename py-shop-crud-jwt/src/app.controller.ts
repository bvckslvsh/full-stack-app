import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express'

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService
    ) {

    }

  @Post('signup')
  async signup(
      @Body('email') email: string,
      @Body('password') password: string
  ) { 

      const saltOrRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltOrRounds);

    
      return this.appService.saveuser({
        email,
        password:passwordHash
      });
  }

  @Post('signin')
  async signin(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({passthrough: true}) response: Response
  ) {
    const user = await this.appService.findOneBy({email});

    if (!user) {
      throw new BadRequestException("User with this email not found!")
    }

    if (!await bcrypt.compare(password, user.password)) {
      throw new BadRequestException("Invalid password!")
    }

    const token = await this.jwtService.signAsync({id: user.id})

    response.cookie('token', token, {httpOnly: true})

    return {
      message: 'Successfully logged in!'
    };
  }

  @Get('user')
  async user(@Req() request: Request) {
    
    try{
    const cookie = request.cookies['token'];
    const data = await this.jwtService.verifyAsync(cookie);

    if (!data) {
      throw new UnauthorizedException();
    }

    const user = await this.appService.findOneBy( {id: data['id']});

    const {password, ...result} = user;
    
    return result;
    } catch (err) {
      throw new UnauthorizedException();
    }
    
  }

  @Post('update-profile')
  async updateProfile(
  @Req() request: Request,
  @Body('name') name: string,
  @Body('phone_number') phoneNumber: string,
  @Body('address') address: string,
  @Body('additional_about') additionalAbout: string
) {
  try {
    const cookie = request.cookies['token'];
    const data = await this.jwtService.verifyAsync(cookie);

    if (!data) {
      throw new UnauthorizedException();
    }

    const user = await this.appService.findOneBy({ id: data['id'] });

    if (!user) {
      throw new BadRequestException("User not found!");
    }

    user.name = name;
    user.phone_number = phoneNumber;
    user.address = address;
    user.additional_about = additionalAbout;

    await this.appService.updateUser(user);

    return {
      message: 'Updated successfully!'
    };
  } catch (err) {
    throw new UnauthorizedException();
  }
}


  @Post('logout')
  async logout(@Res({passthrough: true}) response: Response) {
    response.clearCookie('token');

    return {
      message: 'Logged-out!'
    }
  }

}