import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  beforeInsert(event: InsertEvent<User>): void | Promise<any> {
    console.log('BEFORE USER INSERTED', event.entity);
  }

  async afterInsert(event: InsertEvent<User>): Promise<any> {
    const users = await event.manager.find(User);
    console.log('AFTER USER INSERTED', users);
  }
}
