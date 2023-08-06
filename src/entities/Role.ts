import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RolePermission } from "./RolePermission";
import { UserRole } from "./UserRole";
import { MicoRouterRole } from "./MicoRouterRole";

@Index("Role_pk", ["name"], { unique: true })
@Entity("Role", { schema: "flowt" })
export class Role {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", nullable: true, unique: true, length: 50 })
  name: string | null;

  @Column("varchar", { name: "description", nullable: true, length: 100 })
  description: string | null;

  @Column("varchar", { name: "parent", nullable: true, length: 255 })
  parent: string | null;

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role2)
  rolePermissions: RolePermission[];

  @OneToMany(() => UserRole, (userRole) => userRole.role2)
  userRoles: UserRole[];

  @OneToMany(() => MicoRouterRole, (micoRouterRole) => micoRouterRole.role2)
  micoRouterRoles: MicoRouterRole[];
}
