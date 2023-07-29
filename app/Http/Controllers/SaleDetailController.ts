import { Request, Response } from "express";
import { SaleDetailsModel } from "../../Models/SaleDetailsModel";
import dotenv from "dotenv";
import { DB } from '../../helpers/DB';
import { randomFill } from "crypto";
dotenv.config();

export class SaleDetailController extends SaleDetailsModel {
    getSaleDetails = async (req: Request, res: Response): Promise<Response> => {
        try {
            return res.status(200).json(await this.all());
        } catch (error: any) {
            return res.json({ error: { message: 'El servidor no puede devolver una respuesta debido a un error del cliente' } });
        }
    };

    provideBillCode = async (): Promise<string> => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const codeLength = 11; // Longitud del código deseado
        let code = '';
        let repeat = false;
        do {
          code = '';
          for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
          }
        
          const verifyExistence: any = await DB.table('SaleDetails').where('bill_code', code).get();
          if(verifyExistence) repeat = true;
        } while (repeat);
        
        return code;
      }

    storeSaleDetail = async (req: Request, res: Response): Promise<any> => {
        try {
            console.log('Sale Details input:', req.body);
            const sale_id: number = req.body.sale_id;
            const product_id: number = req.body.product_id;
            const quantity: number = req.body.quantity;

            const product: any = await DB.table('products').where('id', product_id).get();
            console.log('Producto a comprar:', product);
            const prod_price = product[0].price;

            const sub_total = (quantity*prod_price).toFixed(2);
            const dataToStore = {
                sale_id: sale_id,
                product_id: product_id,
                quantity: quantity,
                sub_total: parseFloat(sub_total),
                bill_code: this.provideBillCode()
            }

            console.log('Data to store:', dataToStore);
            return res.status(201).json(await this.create(dataToStore));
        } catch (error: any) {
            return res.json({ error: { message: 'El servidor no puede devolver una respuesta debido a un error del cliente' } });
        }
    };

    getSaleDetail = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id);
            return res.json(await this.where('id', id).get());
        } catch (error: any) {
            return res.json({ error: { message: 'El servidor no puede devolver una respuesta debido a un error del cliente' } });
        }
    };

    updateSaleDetail = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const newData: object = req.body;
            console.log("Datos capturados:", newData);
            return res.status(200).json(await this.update(id, newData));
        } catch (error: any) {
            return res.json({ error: { message: 'El servidor no puede devolver una respuesta debido a un error del cliente' } });
        }
    };

    deleteSaleDetail = async (req: Request, res: Response): Promise<any> => {
        try {
            const id = parseInt(req.params.id);
            const process = await this.delete(id);
            if (process.code === 'P2003') {
                console.log('Error p2003 when delete');
                return res.status(409).json({
                        error: {
                            message: 'El registro no puede ser eliminado ya que su referencia esta siendo usada en otro registro'
                        }
                    });
              
            }
            return res.status(204).json({ message: 'Registro eliminado exitosamente' });
        } catch (error: any) {
            return res.status(400).json({ error: { message: error } });
        }
    };
}
