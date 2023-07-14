
import { Boletos, PrismaClient } from '@prisma/client';
import { prismaClient } from '../../../../common/infra/database/prismaClient';
import { DBException } from '../../../../util/exceptions/HttpExceptions';



export type IBoleto = Boletos




export interface IBoletoRepository {
    create(data: Omit<IBoleto, 'id'>): Promise<IBoleto>;
    findById(id: number): Promise<IBoleto | null>;
    findAll(): Promise<IBoleto[]>;
    update(id: number, data: Partial<IBoleto>): Promise<IBoleto>;
    delete(id: number): Promise<void>;
}

export class BoletoRepository implements IBoletoRepository {
    constructor(private prisma: PrismaClient = prismaClient) {

    }

    async create(data: Omit<IBoleto, 'id'>): Promise<IBoleto> {
        try {
            const boleto = await this.prisma.boletos.create({ data });
            return boleto;
        } catch (error) {
            if (error instanceof Error) {

                throw new DBException(`Failed to create boleto: ${error.message}`, 400);
            }
            throw new DBException('Failed to create boleto,unknown error !!!', 400);
        }
    }



    async findById(id: number): Promise<IBoleto | null> {
        try {
            const boleto = await this.prisma.boletos.findUnique({ where: { id } });

            if(!boleto){
                throw new DBException(`Failed to find boleto by ID: not found`,404 );
            }
            return boleto;
        } catch (error) {

            if (error instanceof Error) {

                throw new DBException(`Failed to find boleto by ID: ${error.message}`, 400);
            }
            throw new DBException('Failed to find  boleto,unknown error !!!', 400);
        }
    }

    async findAll(): Promise<IBoleto[]> {
        try {
            const boletos = await this.prisma.boletos.findMany();
            return boletos;
        } catch (error) {

            if (error instanceof Error) {
                throw new DBException(`Failed to retrieve boletos: ${error.message}`, 400);
            }
            throw new DBException('Failed to retrieve boletos, unknown error !!!', 400);
        }
    }

    async update(id: number, data: Partial<IBoleto>): Promise<IBoleto> {
        try {
            const boleto = await this.prisma.boletos.update({ where: { id }, data });
            return boleto;
        } catch (error) {
            if (error instanceof Error) {
                throw new DBException(`Failed to update boleto: ${error.message}`, 400);
            }
            throw new DBException('Failed to update boleto, unknown error !!!', 400);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await this.prisma.boletos.delete({ where: { id } });
        } catch (error) {
            if (error instanceof Error) {
                throw new DBException(`Failed to delete boleto: ${error.message}`, 400);
            }
            throw new DBException('Failed to delete boleto, unknown error !!!', 400);
        }
    }
}


export const boletoRepository = new BoletoRepository();