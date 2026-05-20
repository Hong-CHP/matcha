import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UserRepository){}
  async register(createUserDto: CreateUserDto) {
    const password_hash = await bcrypt.hash(createUserDto.password, 10)
    try {
      return await this.usersRepository.createUser({
        ...createUserDto,
        password_hash,
      })
    } catch (err: any) {
      if (err.code === '23505')
        throw new Error("Username or email already exists")
    }
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
