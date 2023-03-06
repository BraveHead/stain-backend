import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOne(id as unknown);
  }

  async remove(id: string) {
    await this.userRepository.delete(id);
  }

  async createMany(users: User[]) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(User, { ...users[0] });
      await queryRunner.manager.save(User, { ...users[1] });

      await queryRunner.commitTransaction();
    } catch (error) {
      // 遇到错误 直接回滚事务
      console.log('error 直接回滚事务', error);
      await queryRunner.rollbackTransaction();
    } finally {
      console.log('finally over!');
      await queryRunner.release();
    }
  }

  // async createMany(users: User[]) {
  //   await this.dataSource.manager.transaction(async (manager) => {
  //     try {
  //       console.log('success!', users);
  //       await this.dataSource.({ ...users[0] });
  //       // await manager.save(users[1]);
  //       console.log('success ok!');
  //     } catch (error) {
  //       console.log(' save error!', error);
  //     }
  //   });
  // }
}
