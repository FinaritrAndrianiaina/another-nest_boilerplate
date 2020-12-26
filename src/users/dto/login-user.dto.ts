import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsUUID } from "class-validator";

export class LoginDto {
  @ApiProperty()
  username?: string;

  @ApiProperty()
  id?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  password: string;
}