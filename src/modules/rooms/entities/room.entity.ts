import { BaseEntity } from '../../../common/entities/base.entity';
import { ROOM_TYPE, type RoomType } from '../../../common/enum/common.enum';
import { Message } from '../../messages/entities/message.entity';
import { User } from '../../users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('rooms')
export class Room extends BaseEntity {
  @Column({
    nullable: true, // true if the DM is the type of room
  })
  name: string;

  @Column({
    type: 'enum',
    enum: ROOM_TYPE,
  })
  type: RoomType;

  @OneToMany(() => Message, (message) => message.room)
  messages: Message[];

  @ManyToMany(() => User, (user) => user.rooms)
  @JoinTable({ name: 'room_members' })
  members: User[];
}
