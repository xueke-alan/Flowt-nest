import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("UserPassword_User_staffID_fk", ["staffId"], {})
@Entity("UserPassword", { schema: "flowt" })
export class UserPassword {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "staffID", nullable: true, length: 50 })
  staffId: string | null;

  @Column("varchar", { name: "hashPassword", nullable: true, length: 255 })
  hashPassword: string | null;

  @Column("varchar", { name: "salt", nullable: true, length: 255 })
  salt: string | null;

  @Column("int", { name: "saltRounds", nullable: true })
  saltRounds: number | null;

  @Column("datetime", { name: "valid_until", nullable: true })
  validUntil: Date | null;

  @ManyToOne(() => User, (user) => user.userPasswords, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "staffID", referencedColumnName: "staffId" }])
  staff: User;
}
