import { Instituicao } from 'src/modules/instituicao/entities/instituicao.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 11 })
  cpf: string;

  @Column({ length: 255 })
  rg: string;

  @Column({ length: 255 })
  endereco: string;

  @Column({ length: 255 })
  curso: string;

  @ManyToOne(() => Instituicao, (isntitution) => isntitution.usuarios, { eager: true })
  instituicao: Instituicao;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
