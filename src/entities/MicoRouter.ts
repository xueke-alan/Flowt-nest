import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MicoRouterGroup } from './MicoRouterGroup';
import { MicoRouterRole } from './MicoRouterRole';

@Index('micoRouter_pk', ['path'], { unique: true })
@Index('micoRouter_pk2', ['title'], { unique: true })
@Index('micoRouter_pk3', ['group', 'sort'], { unique: true })
@Entity('micoRouter', { schema: 'flowt' })
export class MicoRouter {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'title', unique: true, length: 255 })
  title: string;

  @Column('varchar', { name: 'entry', length: 255 })
  entry: string;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @Column('varchar', { name: 'path', unique: true, length: 255 })
  path: string;

  @Column('varchar', { name: 'group', nullable: true, length: 255 })
  group: string | null;

  @Column('tinyint', { name: 'hidden', width: 1, default: () => "'0'" })
  hidden: boolean;

  @Column('varchar', { name: 'icon', nullable: true, length: 255 })
  icon: string | null;

  @Column('varchar', { name: 'position', length: 255, default: () => "'side'" })
  position: string;

  @Column('varchar', { name: 'parent', nullable: true, length: 255 })
  parent: string | null;

  @Column('int', { name: 'state', default: () => "'0'" })
  state: number;

  @Column('int', { name: 'sort' })
  sort: number;

  @ManyToOne(
    () => MicoRouterGroup,
    (micoRouterGroup) => micoRouterGroup.micoRouters,
    { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' },
  )
  @JoinColumn([{ name: 'group', referencedColumnName: 'group' }])
  group2: MicoRouterGroup;

  @OneToMany(() => MicoRouterRole, (micoRouterRole) => micoRouterRole.router2)
  micoRouterRoles: MicoRouterRole[];
}
