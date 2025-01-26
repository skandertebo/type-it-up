import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { IsDate, IsEnum, IsInt, IsOptional, Min } from 'class-validator';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum GameSortField {
  SCORE = 'score',
  DATE = 'createdAt',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
  description: 'Sort order for query results',
});

registerEnumType(GameSortField, {
  name: 'GameSortField',
  description: 'Field to sort games by',
});

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

  @Field(() => GameSortField, {
    nullable: true,
    defaultValue: GameSortField.DATE,
  })
  @IsOptional()
  @IsEnum(GameSortField)
  sortBy?: GameSortField;

  @Field(() => SortOrder, { nullable: true, defaultValue: SortOrder.DESC })
  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;

  @Field(() => Int, { nullable: true, defaultValue: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  skip?: number;

  @Field(() => Int, { nullable: true, defaultValue: 10 })
  @IsOptional()
  @IsInt()
  @Min(1)
  take?: number;
}
