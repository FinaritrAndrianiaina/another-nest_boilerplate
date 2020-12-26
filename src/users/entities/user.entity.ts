import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn,ValueTransformer } from 'typeorm';
import * as crypto from "crypto";

class PasswordTransofrm implements ValueTransformer {
  from(value: string) {
    return value;
  }
  to(value: string) {
    return crypto.createHmac('sha256', value).digest('base64');
  }
}

@Entity("Users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({transformer: new PasswordTransofrm()})
  @Exclude()
  password: string

}

export default User;
