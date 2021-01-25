import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn,Unique,ValueTransformer } from 'typeorm';
import * as crypto from "crypto";

class PasswordTransofrm implements ValueTransformer {
  from(value: string) {
    return value;
  }
  to(value: string) {
    return crypto.createHmac('sha256', value).digest('base64');
  }
}

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({unique:true})
  username: string;

  @Column({unique:true})
  email: string;

  @Column({transformer: new PasswordTransofrm()})
  @Exclude()
  password: string

}

export default User;
