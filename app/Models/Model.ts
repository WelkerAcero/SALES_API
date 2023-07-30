import { PrismaClient } from '@prisma/client';

const PRISMA = new PrismaClient();

export class Model {
  private _whereCondition: any = {};
  private _withRelation: any = {};
  private fields: string[];
  private dbTable: any;

  protected prisma: any = PRISMA
  protected relation: string[] | string = '';

  constructor() {
    this.dbTable = null;
    this.fields = [];
  }

  where(columnName: string, value: string | number | boolean): Model {
    this._whereCondition = {
      ...this._whereCondition,
      [columnName]: value
    }
    return this;
  }

  protected with(tableRelation: string[] | any): Model {
    this._whereCondition = {};
    tableRelation.forEach((element: any) => {
      if (typeof element === 'string') {
        this._withRelation[element] = true;
      } else {
        Object.assign(this._withRelation, element);
      }
    });
    return this;
  }

  private async executeQuery(pageSize?: number): Promise<Model> {
    try {
      const relation = Object.keys(this._withRelation).length > 0 ? this._withRelation : false;
      const options: any = {
        where: this._whereCondition,
        include: relation,
      };

      if (pageSize !== undefined) {
        const page: number = 1;
        options.skip = (page - 1) * pageSize;
        options.take = pageSize;
      }

      return await this.dbTable.findMany(options);

    } catch (error: any) {
      return error;
    }
  }

  async get(): Promise<Model> {
    const result = await this.executeQuery();
    console.log('result:', result);
    return result;
  }

  async paginate(pageSize: number): Promise<Model> {
    return await this.executeQuery(pageSize);
  }

  protected async create(commingData: object): Promise<any> {
    try {
      console.log('This is the aim table:', this.dbTable);

      for (let property in commingData) {
        if (!this.fields.includes(property)) {
          return { error: `The field: ${property} is not listed in the allowed params` }
        }
      }

      try {
        return await this.dbTable.create({
          data: commingData
        });
      } catch (error: any) {
        if (error.code === 'P2002') {
          return {
            error: { message: 'Error: Duplicidad en los datos. Restricción de datos duplicados' }
          }
        }
      }

    } catch (error: any) {
      return error;
    }
  }

  protected async update(id: number | string, newData: object, idName: string = 'id') {
    try {
      const result = await this.dbTable.update({
        where: {
          [idName]: id,
        },
        data: newData,
      });
      console.log('Datos actualizado:', result);
    } catch (error: any) {
      if (error.code === 'P2002') {
        return {
          error: { message: 'Error: Duplicidad en los datos. Restricción de datos duplicados' }
        }
      }
    }
  }

  protected async delete(id: number|string, idName:string = 'id') {
    try {
      return await this.dbTable.delete({
        where: {
          [idName]: id,
        },
      });
    } catch (error: any) {
      return error;
    }
  }


  protected async all(): Promise<Model> {
    try {
      return await this.dbTable.findMany();
    } catch (error: any) {
      console.error(error);
      return error;
    }
  }

  protected setTargetDbTable(targetDbTable: any): void {
    this.dbTable = null;
    this.dbTable = targetDbTable;
  }

  protected setFields(fields: string[]): void {
    this.fields = fields;
  }

}
