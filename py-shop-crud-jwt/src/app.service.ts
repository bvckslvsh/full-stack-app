import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User> 
  ) {
  }

    async saveuser(data: any): Promise<User>{
      try{
        return this.userRepository.save(data);
      } catch (err) {
        throw new BadRequestException(err)
      }
    }

    async updateUser(user: User): Promise<User> {
      try {
        return this.userRepository.save(user);
      } catch (err) {
        throw new BadRequestException(err);
      }
    }
    

    async findOneBy(condition: any):Promise<User>{
      return this.userRepository.findOneBy(condition)

      }
}
