import { Request, Response } from "express";
import { ProviderModel } from "../../Models/ProviderModel";
import dotenv from "dotenv";
dotenv.config();

export class ProviderController extends ProviderModel {
    getProviders = async (req: Request, res: Response): Promise<Response> => {
        try {
            return res.status(200).json(await this.all());
        } catch (error: any) {
            return res.json({ error: { message: 'El servidor no puede devolver una respuesta debido a un error del cliente' } });
        }
    };

    storeProvider = async (req: Request, res: Response): Promise<any> => {
        try {
            console.log(req.body);
            return res.status(201).json(await this.create(req.body));
        } catch (error: any) {
            return res.json({ error: { message: 'El servidor no puede devolver una respuesta debido a un error del cliente' } });
        }
    };

    getProvider = async (req: Request, res: Response): Promise<Response> => {
        try {
            const id = parseInt(req.params.id);
            return res.json(await this.where('id', id).get());
        } catch (error: any) {
            return res.json({ error: { message: 'El servidor no puede devolver una respuesta debido a un error del cliente' } });
        }
    };

    updateProvider = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id);
            const newData: object = req.body;
            console.log("Datos capturados:", newData);
            return res.status(200).json(await this.update(id, newData));
        } catch (error: any) {
            return res.json({ error: { message: 'El servidor no puede devolver una respuesta debido a un error del cliente' } });
        }
    };

    deleteProvider = async (req: Request, res: Response): Promise<any> => {
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