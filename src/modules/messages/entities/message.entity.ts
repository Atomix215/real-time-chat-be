import { BaseEntityMinimal } from '../../../common/entities/base.entity';
import { Notification } from '../../notifications/entities/notification.entity';
import { Room } from '../../rooms/entities/room.entity';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('messages')
export class Message extends BaseEntityMinimal {
  @Column('text')
  content: string;

  @ManyToOne(() => User, (user) => user.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @Column()
  senderId: string;

  @ManyToOne(() => Room, (room) => room.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'room_id' })
  room: Room;

  @Column()
  roomId: string;

  @OneToMany(() => Notification, (notification) => notification.message)
  notifications: Notification[];
}
