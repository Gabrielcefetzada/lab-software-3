import { Instituicao } from 'src/modules/instituicao/entities/instituicao.entity';
import { Transacao } from 'src/modules/transacao/entities/transacao.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => Instituicao, (instituicao) => instituicao.usuarios, { eager: true })
  instituicao: Instituicao;

  @OneToMany(() => Transacao, (transacao) => transacao.pagador)
  transacoesComoPagador: Transacao[];

  @OneToMany(() => Transacao, (transacao) => transacao.beneficiario)
  transacoesComoBeneficiario: Transacao[];

  @Column({default: 0})
  saldo: number;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
