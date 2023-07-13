import { User } from './entity';
import { Repository } from 'typeorm';
export declare class AppService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    saveuser(data: any): Promise<User>;
    updateUser(user: User): Promise<User>;
    findOneBy(condition: any): Promise<User>;
}
