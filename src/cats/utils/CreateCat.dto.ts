import { IsString, IsInt, Length } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @Length(3, 10, {
    message: 'Name is too short or too long',
    groups: ['create'],
  })
  @Length(1, 15, {
    message: 'Name is too short or too long',
    groups: ['update'],
  })
  name: string;
  @IsInt()
  age: number;
  @IsString()
  breed: string;
}
