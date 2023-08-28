import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MicoRouter } from './MicoRouter';

@Index('micoRouterGroup_pk', ['group'], { unique: true })
@Entity('micoRouterGroup', { schema: 'flowt' })
export class MicoRouterGroup {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', {
    name: 'group',
    nullable: true,
    unique: true,
    length: 255,
    default: () => "'其他'",
  })
  group: string | null;

  @Column('varchar', { name: 'description', nullable: true, length: 255 })
  description: string | null;

  @Column('varchar', { name: 'sort', nullable: true, length: 255 })
  sort: string | null;

  @OneToMany(() => MicoRouter, (micoRouter) => micoRouter.group2)
  micoRouters: MicoRouter[];
}
