import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './Permission';
import { Role } from './Role';

@Index('RolePermission_Role_name_fk', ['role'], {})
@Index('RolePermission_Permission_name_fk', ['permission'], {})
@Entity('RolePermission', { schema: 'flowt' })
export class RolePermission {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('char', { name: 'role', nullable: true, length: 36 })
  role: string | null;

  @Column('char', { name: 'permission', nullable: true, length: 36 })
  permission: string | null;

  @ManyToOne(() => Permission, (permission) => permission.rolePermissions, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'permission', referencedColumnName: 'name' }])
  permission2: Permission;

  @ManyToOne(() => Role, (role) => role.rolePermissions, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'role', referencedColumnName: 'name' }])
  role2: Role;
}
