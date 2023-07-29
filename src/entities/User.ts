import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("User", { schema: "flowt" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", {
    name: "staffID",
    comment: "员工编号",
    length: 50,
    default: () => "'XX00000'",
  })
  staffId: string;

  @Column("varchar", { name: "username", comment: "英文姓名", length: 50 })
  username: string;

  @Column("varchar", {
    name: "usernameCn",
    nullable: true,
    comment: "中文姓名",
    length: 50,
  })
  usernameCn: string | null;

  @Column("varchar", {
    name: "usernameGPO",
    nullable: true,
    comment: "GPO显示的姓名",
    length: 50,
  })
  usernameGpo: string | null;

  @Column("varchar", {
    name: "avatar",
    nullable: true,
    comment: "头像地址",
    length: 255,
  })
  avatar: string | null;

  @Column("varchar", {
    name: "email",
    nullable: true,
    comment: "邮箱",
    length: 255,
  })
  email: string | null;

  @Column("int", {
    name: "state",
    comment: "账号状态(0:在职员工;1:离职员工)",
    default: () => "'0'",
  })
  state: number;
}
