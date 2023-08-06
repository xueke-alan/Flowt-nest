import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Role } from "./Role";
import { User } from "./User";

@Index("UserRole_User_staffID_fk", ["staffId"], {})
@Index("UserRole_Role_name_fk", ["role"], {})
@Entity("UserRole", { schema: "flowt" })
export class UserRole {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "staffId", nullable: true, length: 50 })
  staffId: string | null;

  @Column("varchar", { name: "role", nullable: true, length: 50 })
  role: string | null;

  @ManyToOne(() => Role, (role) => role.userRoles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "role", referencedColumnName: "name" }])
  role2: Role;

  @ManyToOne(() => User, (user) => user.userRoles, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "staffId", referencedColumnName: "staffId" }])
  staff: User;
}
