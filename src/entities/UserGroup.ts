import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("UserGroup", { schema: "flowt" })
export class UserGroup {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "staffID", nullable: true, length: 50 })
  staffId: string | null;

  @Column("varchar", { name: "groupName", nullable: true, length: 50 })
  groupName: string | null;
}
