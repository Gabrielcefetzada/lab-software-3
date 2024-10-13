import { Usuario } from 'src/modules/usuario/entities/usuario.entity';
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
  
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
  }
  