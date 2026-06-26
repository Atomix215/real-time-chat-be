import { BaseEntity } from '../../../common/entities/base.entity';
import { Message } from '../../messages/entities/message.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { Room } from '../../rooms/entities/room.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @Column({
    unique: true,
  })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];

  @ManyToMany(() => Room, (room) => room.members)
  rooms: Room[];

  @OneToMany(() => Notification, (notification) => notification.user)
  notifications: Notification[];
}
