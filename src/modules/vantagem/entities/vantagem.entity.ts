import { Instituicao } from 'src/modules/instituicao/entities/instituicao.entity';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('vantagem')
export class Vantagem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Instituicao, (instituicao) => instituicao.vantagens, { eager: true })
  instituicao: Instituicao;

  @ManyToMany(() => Usuario, (usuario) => usuario.vantagensComoBeneficiario, { eager: true })
  @JoinTable()
  beneficiarios: Usuario[];

  @Column({ length: 255 })
  nome: string;

  @Column()
  cost: number;
  
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
