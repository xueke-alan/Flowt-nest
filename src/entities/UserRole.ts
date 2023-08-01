import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("UserRole_User_staffID_fk", ["staffId"], {})
@Entity("UserRole", { schema: "flowt" })
export class UserRole {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "staffId", nullable: true, length: 50 })
  staffId: string | null;

  @Column("varchar", { name: "roleName", nullable: true, length: 50 })
  roleName: string | null;

  @ManyToOne(() => User, (user) => user.userRoles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "staffId", referencedColumnName: "staffId" }])
  staff: User;
}
