import { Column, Entity, Index } from "typeorm";

@Index("UserID", ["id"], { unique: true })
@Entity("User", { schema: "flowt" })
export class User {
  @Column("char", { primary: true, name: "id", length: 36 })
  id: string;

  @Column("varchar", {
    name: "StaffID",
    comment: "员工编号",
    length: 50,
    default: () => "'XX00000'",
  })
  staffId: string;

  @Column("varchar", { name: "Username", comment: "英文姓名", length: 50 })
  username: string;

  @Column("varchar", {
    name: "UsernameCn",
    nullable: true,
    comment: "中文姓名",
    length: 50,
  })
  usernameCn: string | null;

  @Column("varchar", {
    name: "UsernameGPO",
    nullable: true,
    comment: "GPO显示的姓名",
    length: 50,
  })
  usernameGpo: string | null;

  @Column("varchar", {
    name: "Avatar",
    nullable: true,
    comment: "头像地址",
    length: 255,
  })
  avatar: string | null;

  @Column("varchar", {
    name: "Email",
    nullable: true,
    comment: "邮箱",
    length: 255,
  })
  email: string | null;

  @Column("int", {
    name: "State",
    comment: "账号状态(0:在职员工;1:离职员工)",
    default: () => "'0'",
  })
  state: number;
}
