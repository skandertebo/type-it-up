import { ArgsType, Field } from '@nestjs/graphql';
import { IsDate, IsEnum, IsOptional } from 'class-validator';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

@ArgsType()
export class GetGameHistoryArgs {
  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  since?: Date;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  until?: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  difficulty?: string;

  @Field(() => SortOrder, { nullable: true, defaultValue: SortOrder.DESC })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
} 