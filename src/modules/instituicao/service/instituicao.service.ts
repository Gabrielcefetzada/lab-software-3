import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
import { Instituicao } from '../entities/instituicao.entity';
import { CreateInstituicaoDto } from '../dto/createInstituicao.dto';
  
  @Injectable()
  export class InstituicaoService {
    constructor(
      @InjectRepository(Instituicao)
      private readonly instituicaoRepository: Repository<Instituicao>,
    ) {}
  
    async createInstitution(createInstituicaoDto: CreateInstituicaoDto): Promise<Instituicao> {
      try {
        const instituicao = this.instituicaoRepository.create(createInstituicaoDto);
        return await this.instituicaoRepository.save(instituicao);
      } catch (error) {
        throw new BadRequestException('Error creating institution');
      }
    }
  
    async findAllInstitution(limit: number = 10, page: number = 1): Promise<Instituicao[]> {
      try {
        const skip = (page - 1) * limit;
        return await this.instituicaoRepository.find({
          take: limit,
          skip,
        });
      } catch (error) {
        throw new BadRequestException('Error retrieving institutions');
      }
    }
  
    async findInstitutionById(id: number): Promise<Instituicao | undefined> {
      try {
        const row = await this.instituicaoRepository.findOne({ where: { id: id } })

        if (!row) {
            throw new NotFoundException('Institution not found');
        }
        return row;
      } catch (error) {
        throw new NotFoundException('Institution not found');
      }
    }
  
    async findInstitutionByCnpj(cnpj: string): Promise<Instituicao | undefined> {
      try {
        const row = await this.instituicaoRepository.findOne({
            where: { cnpj: cnpj },
          });
          if (!row) {
            throw new NotFoundException('Institution not found');
        }
        return row;

      } catch (error) {
        throw new NotFoundException('Institution not found');
      }
    }
  
    async updateInstitution(
      id: number,
      updateInstitutionDto: Partial<Instituicao>,
    ): Promise<Instituicao | undefined> {
      try {
        await this.instituicaoRepository.update(id, updateInstitutionDto);
        return await this.findInstitutionById(id);
      } catch (error) {
        throw new BadRequestException('Error updating Institution');
      }
    }
  
    async deleteInstitution(id: number): Promise<{message:string}> {
      try {
        const company = (await this.findInstitutionById(id)).nome;
        if(company) {
            await this.instituicaoRepository.delete(id);

            return {
                message: `${company} deleted.` 
            }
        }

        throw new BadRequestException('Error deleting Institution. Maybe it ');

      } catch (error) {
        throw new BadRequestException('Error deleting Institution');
      }
    }
  }
  