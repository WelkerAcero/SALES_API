import { Request, Response } from "express";
import { SaleDetailsModel } from "../../Models/SaleDetailsModel";
import dotenv from "dotenv";
import { DB } from '../../helpers/DB';
dotenv.config();

export class SaleDetailController extends SaleDetailsModel {

    getSaleDetails = async (req: Request, res: Response): Promise<Response> => {
        try {
            return res.status(200).json(await this.with([{
                Sales:
                {
                    include: { Sellers: true, Customers: true }
                },
                Products:
                {
                    include: { Categories: true, Branch_Offices: true, Providers: true}
                }
            }]).paginate(5));
        } catch (error: any) {
            return res.json({ error: { message: 'El servidor no puede devolver una respuesta debido a un error del cliente' } });
        }
    };

    storeSaleDetail = async (req: Request, res: Response): Promise<any> => {
        try {
            console.log('Sale Details input:', req.body);
            const sale_id: number = req.body.sale_id;
            const product_id: number = req.body.product_id;
            const quantity: number = req.body.quantity;

            const product: any = await DB.table('products').where('id', product_id).get();
            console.log('Producto a comprar:', product);
            const prod_price = product[0].price;

            const sub_total = (quantity * prod_price).toFixed(2);
            const dataToStore = {
                sale_id: sale_id,
                product_id: product_id,
                quantity: quantity,
                sub_total: parseFloat(sub_total),
            }
            return res.status(201).json(await this.create(dataToStore));
        } catch (error: any) {
            return res.json({ error: { message: 'El servidor no puede devolver una respuesta debido a un error del cliente' } });
        }
    };

    getSaleDetail = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id);
            if (id) return res.json(await this.where('id', id).get()); 
            return res.json({ error: { message: `No se encontro el id: Asegurate de establecer la busqueda de la 
            siguiente manera: https://_URL_/52`} });
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
