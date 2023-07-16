import { Lotes, PrismaClient } from '@prisma/client';
import { prismaClient } from '../../../../common/infra/database/prismaClient';
import { DBException } from '../../../../util/exceptions/HttpExceptions';



export type ILote = {
    id: number;
    nome: string;
    id_externo: number;
    order_pdf: number;
    ativo: boolean;
}


export interface IloteRepository {
    create(data: Omit<ILote, 'id'>): Promise<ILote>;
    createMany( data: Omit<ILote, "id">[]): Promise<any> ;
    findByIdExterno(id_externo: number): Promise<ILote | null>;
    findById(id: number): Promise<ILote | null>;
    findAll(): Promise<ILote[]>;
    update(id: number, data: Partial<ILote>): Promise<ILote>;
    delete(id: number): Promise<void>;
}

export class LoteRepository implements IloteRepository {
    constructor(private prisma: PrismaClient = prismaClient) {

    }

    async create(data: Omit<ILote, 'id'>): Promise<ILote> {
        try {
            const lote = await this.prisma.lotes.create({ data });
            return lote;
        } catch (error) {
            if (error instanceof Error) {

                throw new DBException(`Failed to create lote: ${error.message}`, 400);
            }
            throw new DBException('Failed to create lote,unknown error !!!', 400);
        }
    }

    async createMany( data: Omit<ILote, "id">[]): Promise<string> {
        try {
            const lote = await this.prisma.lotes.createMany({ data: data });

            return `${lote.count} lote(s) created.`;
        } catch (error) {
            if (error instanceof Error) {

                throw new DBException(`Failed to create lote: ${error.message}`, 400);
            }
            throw new DBException('Failed to create lote,unknown error !!!', 400);
        }
    }


    async findByIdExterno(id_externo: number): Promise<ILote | null> {
        try {

            return this.prisma.lotes.findUnique({ where: { id_externo } });
        } catch (error) {

            if (error instanceof Error) {

                throw new DBException(`Failed to find lote by id_externo: ${error.message}`, 400);
            }
            throw new DBException('Failed to find  lote,unknown error !!!', 400);
        }
    }


    async findById(id: number): Promise<ILote | null> {
        try {
            const lote = await this.prisma.lotes.findUnique({ where: { id } });
            return lote;
        } catch (error) {

            if (error instanceof Error) {

                throw new DBException(`Failed to find lote by ID: ${error.message}`, 400);
            }
            throw new DBException('Failed to find  lote,unknown error !!!', 400);
        }
    }

    async findAll(): Promise<ILote[]> {
        try {
            const lotes = await this.prisma.lotes.findMany();
            return lotes;
        } catch (error) {

            if (error instanceof Error) {
                throw new DBException(`Failed to retrieve lotes: ${error.message}`, 400);
            }
            throw new DBException('Failed to retrieve lotes, unknown error !!!', 400);
        }
    }

    async update(id: number, data: Partial<ILote>): Promise<ILote> {
        try {
            const lote = await this.prisma.lotes.update({ where: { id }, data });
            return lote;
        } catch (error) {
            if (error instanceof Error) {
                throw new DBException(`Failed to update lote: ${error.message}`, 400);
            }
            throw new DBException('Failed to update lote, unknown error !!!', 400);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.prisma.lotes.delete({ where: { id } });
        } catch (error) {
            if (error instanceof Error) {
                throw new DBException(`Failed to delete lote: ${error.message}`, 400);
            }
            throw new DBException('Failed to delete lote, unknown error !!!', 400);
        }
    }
}


export const loteRepository:IloteRepository = new LoteRepository();