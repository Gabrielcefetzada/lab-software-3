import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
import { Vantagem } from 'src/modules/vantagem/entities/vantagem.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
  } from 'typeorm';
  
  @Entity('instituicao')
  export class Instituicao {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 100 })
    nome: string;

    @Column({ length: 14 })
    cnpj: string;

    @OneToMany(() => Usuario, (user) => user.instituicao)
    usuarios?: Usuario[] | null;
    
    @OneToMany(() => Vantagem, (vantagem) => vantagem.instituicao)
    vantagens?: Vantagem[] | null;
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  }
  