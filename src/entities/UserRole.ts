import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("UserRole", { schema: "flowt" })
export class UserRole {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "staffID", nullable: true, length: 50 })
  staffId: string | null;

  @Column("varchar", { name: "roleName", nullable: true, length: 50 })
  roleName: string | null;
}
