import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './Role';
import { MicoRouter } from './MicoRouter';

@Index('micoRouterRole_pk', ['role', 'router'], { unique: true })
@Index('micoRouterRole_micoRouter_title_fk', ['router'], {})
@Entity('micoRouterRole', { schema: 'flowt' })
export class MicoRouterRole {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'router', length: 255 })
  router: string;

  @Column('varchar', { name: 'role', length: 255 })
  role: string;

  @ManyToOne(() => Role, (role) => role.micoRouterRoles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'role', referencedColumnName: 'name' }])
  role2: Role;

  @ManyToOne(() => MicoRouter, (micoRouter) => micoRouter.micoRouterRoles, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'router', referencedColumnName: 'title' }])
  router2: MicoRouter;
}
