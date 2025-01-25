import { Field, Float, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './user.entity';

@ObjectType()
export class GameOptions {
  @Field(() => String)
  difficulty!: string;

  @Field(() => Boolean)
  punctuation!: boolean;

  @Field(() => Boolean)
  numbers!: boolean;
}

@Entity()
@ObjectType()
export class Game {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id!: string;

  @Column('json')
  @Field(() => GameOptions)
  options!: GameOptions;

  @Column('text')
  @Field(() => String)
  gameContent!: string;

  @Column('text')
  @Field(() => String)
  userContent!: string;

  @Column('int')
  @Field(() => Number)
  duration!: number;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt!: Date;

  @Column('float')
  @Field(() => Float)
  wpm!: number;

  @Column('float')
  @Field(() => Float)
  accuracy!: number;

  @Column('float')
  @Field(() => Float)
  score!: number;

  @ManyToMany(() => User, user => user.games)
  @Field(() => [User])
  users!: User[];
} 