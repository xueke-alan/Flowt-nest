import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RolePermission } from "./RolePermission";

@Index("Permission_pk", ["name"], { unique: true })
@Entity("Permission", { schema: "flowt" })
export class Permission {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", unique: true, length: 50 })
  name: string;

  @Column("varchar", { name: "description", nullable: true, length: 100 })
  description: string | null;

  @Column("varchar", { name: "resource", nullable: true, length: 50 })
  resource: string | null;

  @Column("varchar", { name: "action", nullable: true, length: 255 })
  action: string | null;

  @OneToMany(
    () => RolePermission,
    (rolePermission) => rolePermission.permission2
  )
  rolePermissions: RolePermission[];
}
