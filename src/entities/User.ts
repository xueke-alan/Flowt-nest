import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserGroup } from "./UserGroup";
import { UserPassword } from "./UserPassword";
import { UserRole } from "./UserRole";

@Index("User_pk", ["staffId"], { unique: true })
@Entity("User", { schema: "flowt" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", {
    name: "staffId",
    unique: true,
    comment: "员工编号",
    length: 50,
    default: () => "'XX00000'",
  })
  staffId: string;

  @Column("varchar", { name: "username", comment: "英文姓名", length: 50 })
  username: string;

  @Column("varchar", {
    name: "gender",
    nullable: true,
    comment: "性别",
    length: 1,
  })
  gender: string | null;

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

  @Column("varchar", { name: "group", nullable: true, length: 25 })
  group: string | null;

  @Column("varchar", {
    name: "Dir",
    nullable: true,
    comment: "Dir.直线",
    length: 20,
  })
  dir: string | null;

  @Column("varchar", {
    name: "shortDir",
    nullable: true,
    comment: "分机号",
    length: 10,
  })
  shortDir: string | null;

  @Column("varchar", {
    name: "mobile",
    nullable: true,
    comment: "手机号",
    length: 20,
  })
  mobile: string | null;

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

  @OneToMany(() => UserGroup, (userGroup) => userGroup.staff)
  userGroups: UserGroup[];

  @OneToMany(() => UserPassword, (userPassword) => userPassword.staff)
  userPasswords: UserPassword[];

  @OneToMany(() => UserRole, (userRole) => userRole.staff)
  userRoles: UserRole[];
}
