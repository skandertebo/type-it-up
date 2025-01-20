import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Game } from './game.entity';
import { UserStats } from './user-stats.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id!: string;

  @Column({ unique: true })
  @Field(() => String)
  workosId!: string;

  @Column({ type: 'text', unique: true })
  @Field(() => String)
  email!: string;

  @Column({type: 'text', nullable: true})
  @Field(() => String, { nullable: true })
  firstName?: string;

  @Column({type: 'text', nullable: true})
  @Field(() => String, { nullable: true })
  lastName?: string;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  profilePicture?: string;

  @Column({ type: 'text', unique: true })
  @Field(() => String)
  username!: string;

  @OneToOne(() => UserStats, stats => stats.user)
  @Field(() => UserStats, { nullable: true })
  stats?: UserStats;

  @ManyToMany(() => Game, game => game.users)
  @Field(() => [Game])
  games!: Game[];

  @CreateDateColumn()
  @Field(() => Date)
  createdAt!: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt!: Date;
}
