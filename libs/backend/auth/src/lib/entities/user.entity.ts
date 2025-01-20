import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id!: string;

  @Column({ unique: true })
  @Field(() => String)
  workosId!: string;

  @Column({ type: 'string', unique: true })
  @Field(() => String)
  email!: string;

  @Column({type: 'string', nullable: true})
  @Field(() => String, { nullable: true })
  firstName?: string;

  @Column({type: 'string', nullable: true})
  @Field(() => String, { nullable: true })
  lastName?: string;

  @Column({ type: 'string', nullable: true })
  @Field(() => String, { nullable: true })
  profilePicture?: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt!: Date;

  @Column({ type: 'string', unique: true })
  @Field(() => String)
  username!: string;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt!: Date;
}
