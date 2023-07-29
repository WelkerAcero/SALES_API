import { PrismaClient } from '@prisma/client';
const PRISMA = new PrismaClient();

export class DB {
    private static dbConnection: any = PRISMA;
    private static dbTable: any;
    private static _whereCondition: any = {};
    private static _withRelation: any = {};

    static table(targetTable: string): typeof DB {
        DB.dbTable = '';
        DB.dbConnection = PRISMA;
        DB._withRelation = {};
        DB._whereCondition = {};

        const newTable = DB.dbConnection[targetTable];
        if (newTable) {
            DB.dbTable = newTable;
        } else {
            console.error(`La tabla ${targetTable} no existe.`);
        }
        return this;
    }

    static where(columnName: string, value: string | number | boolean): typeof DB {
        DB._whereCondition = {
            ...DB._whereCondition,
            [columnName]: value
        }
        return this;
    }

    static with(tableRelation: string[] | any): typeof DB {
        tableRelation.forEach((element: string) => {
            if (typeof element === 'string') {
                DB._withRelation[element] = true;
            } else {
                Object.assign(DB._withRelation, element)
            }
        });
        return this;
    }

    static async all(): Promise<DB> {
        try {
            return DB.dbTable.findMany();
        } catch (error: any) {
            console.error(error);
            return error;
        }
    }

    static async executeQuery(pageSize?: number): Promise<DB> {
        try {
            const relation = Object.keys(DB._withRelation).length > 0 ? DB._withRelation : false;
            const options: any = {
                where: DB._whereCondition,
                include: relation,
            };

            if (pageSize !== undefined) {
                const page: number = 1;
                options.skip = (page - 1) * pageSize;
                options.take = pageSize;
            }

            return await DB.dbTable.findMany(options);

        } catch (error: any) {
            console.log(error);
            return error;
        }
    }

    static async get(): Promise<DB> {
        return await this.executeQuery();
    }

    static async paginate(pageSize: number): Promise<DB> {
        return await this.executeQuery(pageSize);
    }

    static async update(id: number, newData: object) {
        try {
            const result = await this.dbTable.update({
                where: {
                    id: id,
                },
                data: newData,
            });
            console.log('Datos actualizado:', result);
        } catch (error: any) {
            console.log(error);
            return error;
        }
    }

    static async create(commingData: object): Promise<any> {
        try {
            return await this.dbTable.create({
                data: commingData
            });
        } catch (error: any) {
            console.log(error);
            return error;
        }
    }

}