import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("Users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

}

export default User;
