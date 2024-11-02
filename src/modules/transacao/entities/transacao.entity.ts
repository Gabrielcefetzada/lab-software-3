import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('transacao')
export class Transacao {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, usuario => usuario.transacoesComoPagador, { eager: true })
  pagador: Usuario;

  @ManyToOne(() => Usuario, usuario => usuario.transacoesComoBeneficiario, { eager: true })
  beneficiario: Usuario;

  @Column('decimal', { precision: 10, scale: 2 })
  valor: number;

  @Column({ length: 255 })
  motivo: string;
  
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
