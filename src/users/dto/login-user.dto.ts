import { UnauthorizedException } from "@nestjs/common";
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

  unauhtorized() {
    throw new UnauthorizedException({
      message: 'Les informations fournies sont erronées',
    });
  }

  checkDto() {
    Boolean(this.email) || Boolean(this.username) || Boolean(this.id) && Boolean(this.password)
      ? null
      : this.unauhtorized();
  }
}