import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("UserRole_User_staffID_fk", ["staffId"], {})
@Entity("UserRole", { schema: "flowt" })
export class UserRole {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "staffId", nullable: true, length: 50 })
  staffId: string | null;

  @Column("varchar", { name: "roleName", nullable: true, length: 50 })
  roleName: string | null;
}
