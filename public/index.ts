import express, { Express } from "express";
import response_time from "response-time";
import cors from "cors";
/* import ngrok from "ngrok"; */
import customerRoutes from "../routes/api/CustomerRoute";
import sellerRoutes from "../routes/api/SellerRoute";
import salesRoutes from "../routes/api/SaleRoute";
import saleDetailRoute from "../routes/api/SaleDetailRoute";
import productRoute from "../routes/api/ProductRoute";
import providerRoute from "../routes/api/ProviderRoute";
import categoryRoute from "../routes/api/CategoryRoute";
import branchOfficeRoute from "../routes/api/BranchOfficeRoute";
import BodyParser from "body-parser";

export default class MyServer {
  private _app: Express = express();
  private _port: number = this._app.get("PORT") || 3000;

  constructor() {
    this._app.use(response_time());
    this._app.use(express.json());
    this._app.use(BodyParser.urlencoded({ extended: true }));
    this._app.use(cors({
      credentials: true,
      origin: "http://127.0.0.1:5173" // for a future front-end
    }));
  }

  //API ROUTES, se antepone el prefijo /api
  routes() {
    this._app.use('/api', customerRoutes);
    this._app.use('/api', sellerRoutes);
    this._app.use('/api', salesRoutes);
    this._app.use('/api', saleDetailRoute);
    this._app.use('/api', productRoute);
    this._app.use('/api', providerRoute);
    this._app.use('/api', categoryRoute);
    this._app.use('/api', branchOfficeRoute);
  }

  listen() {
    this.routes();
    this._app.listen(this._port, () => {
      console.log("listening on port " + this._port);
    });
  }

/*   async ngrokConnection(): Promise<any> {
    ngrok.disconnect("ma2w1wkc");
    ngrok.kill();
    const url = await ngrok.connect({
      id: "",
      proto: "http", // http|tcp|tls, defaults to http
      addr: 3000,
      domain: "",
      subdomain: "",
    });

    return console.log(`This is the route generated: ${url}`);
  } */
}
new MyServer().listen();
/* new MyServer().ngrokConnection(); */
