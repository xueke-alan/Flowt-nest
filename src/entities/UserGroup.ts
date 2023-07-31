import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("UserGroup_User_staffID_fk", ["staffId"], {})
@Entity("UserGroup", { schema: "flowt" })
export class UserGroup {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "staffId", nullable: true, length: 50 })
  staffId: string | null;

  @Column("varchar", { name: "groupName", nullable: true, length: 50 })
  groupName: string | null;

  @ManyToOne(() => User, (user) => user.userGroups, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "staffId", referencedColumnName: "staffId" }])
  staff: User;
}
