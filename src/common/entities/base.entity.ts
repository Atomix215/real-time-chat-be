import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntityMinimal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: string;
}

export class BaseEntity extends BaseEntityMinimal {
  @UpdateDateColumn()
  updatedAt: string;
}
