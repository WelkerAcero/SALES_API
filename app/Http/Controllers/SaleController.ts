import { Request, Response } from "express";
import { SaleModel } from "../../Models/SaleModel";
import dotenv from "dotenv";
import { DB } from "../../helpers/DB";
dotenv.config();

export class SaleController extends SaleModel {
    

    setBillCode = async (): Promise<string> => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const codeLength = 10; // Longitud del código deseado
        let code = '';
        let repeat = false;
        do {
          code = '';
          for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters[randomIndex];
          }
        
          const verifyExistence: any = await DB.table('Sales').where('sale_code', code).get();
          if (Object.values(verifyExistence).length > 0) repeat = true;
          
        } while (repeat);
        
        return code;
    }

    getSales = async (req: Request, res: Response): Promise<Response> => {
        try {
            return res.status(200).json(await this.all());
        } catch (error: any) {
            return res.json({ error: { message: 'El servidor no puede devolver una respuesta debido a un error del cliente' } });
        }
    };

    storeSale = async (req: Request, res: Response): Promise<any> => {
        try {
            const customer_id = req.body.customer_id;
            const seller_id = req.body.seller_id;
            
            const toStore = {
                customer_id: customer_id,
                seller_id: seller_id,
                sale_code: this.setBillCode(),
            } 
            
            return res.status(201).json(await this.create(toStore));
        } catch (error: any) {
            return res.json({ error: { message: 'El servidor no puede devolver una respuesta debido a un error del cliente' } });
        }
    };

    getSale = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id);
            if (id) return res.json(await this.where('id', id).get()); 
            return res.json({ error: { message: `No se encontro el id: Asegurate de establecer la busqueda de la 
            siguiente manera: https://_URL_/52`} });
        } catch (error: any) {
            return res.json({ error: { message: 'El servidor no puede devolver una respuesta debido a un error del cliente' } });
        }
    };

    
    getSaleByDate = async (req: Request, res: Response): Promise<Response> => {
        try {
            const date = req.params.date;
            console.log('Params:', req.params.date);
            return res.json(await this.where('createdAt', date).get());
        } catch (error: any) {
            return res.json({ error: { message: 'El servidor no puede devolver una respuesta debido a un error del cliente' } });
        }
    };

    updateSale = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const newData: object = req.body;
            console.log("Datos capturados:", newData);
            return res.status(200).json(await this.update(id, newData));
        } catch (error: any) {
            return res.json({ error: { message: 'El servidor no puede devolver una respuesta debido a un error del cliente' } });
        }
    };

    deleteSale = async (req: Request, res: Response): Promise<any> => {
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
