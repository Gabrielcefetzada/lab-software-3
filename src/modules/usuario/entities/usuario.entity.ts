import { Instituicao } from 'src/modules/instituicao/entities/instituicao.entity';
import { Transacao } from 'src/modules/transacao/entities/transacao.entity';
import { Vantagem } from 'src/modules/vantagem/entities/vantagem.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
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
  
  @ManyToMany(() => Vantagem, (vantagem) => vantagem.beneficiarios)
  vantagensComoBeneficiario: Vantagem[];

  @Column({default: 0})
  saldo: number;

  @Column({ length: 255, default: 'PASSWORD' })
  password: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
