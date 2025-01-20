import { Field, Float, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
@ObjectType()
export class UserStats {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id!: string;

  @Column({ type: 'float', default: 0 })
  @Field(() => Float)
  averageAccuracy!: number;

  @Column({ type: 'float', default: 0 })
  @Field(() => Float)
  averageWpm!: number;

  @OneToOne(() => User, user => user.stats)
  @JoinColumn()
  @Field(() => User)
  user!: User;
} 