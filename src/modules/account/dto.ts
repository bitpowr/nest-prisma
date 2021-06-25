import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

class CreateUserDto {
  @IsString({ message: 'Please provide a valid name' })
  @IsNotEmpty({ message: 'Name field cannot be empty' })
  name: string;

  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @IsAlphanumeric()
  @MinLength(8)
  @MaxLength(15)
  password: string;
}

export { CreateUserDto };
