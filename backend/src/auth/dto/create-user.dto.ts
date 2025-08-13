import { IsEmail, IsString, MinLength, IsOptional, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'Некорректный email адрес' })
  email: string;

  @IsString({ message: 'Имя пользователя должно быть строкой' })
  @MinLength(3, { message: 'Имя пользователя должно содержать минимум 3 символа' })
  @MaxLength(50, { message: 'Имя пользователя не должно превышать 50 символов' })
  username: string;

  @IsString({ message: 'Пароль должен быть строкой' })
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  password: string;

  @IsOptional()
  @IsString({ message: 'Имя должно быть строкой' })
  @MaxLength(100, { message: 'Имя не должно превышать 100 символов' })
  firstName?: string;

  @IsOptional()
  @IsString({ message: 'Фамилия должна быть строкой' })
  @MaxLength(100, { message: 'Фамилия не должна превышать 100 символов' })
  lastName?: string;
} 