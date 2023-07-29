import { Model } from "./Model";
export class SellerModel extends Model {
  private targetDbTable: any = this.prisma.Sellers;
  private allowedFields: string[] = ['rut','name','lastname','address','cellphone','birthday','email'];

  constructor() {
    super();
    this.targetTable();
    this.fieldsAllowed();
  }

  targetTable(): void {
    super.setTargetDbTable(this.targetDbTable);
  }

  fieldsAllowed(): void {
    super.setFields(this.allowedFields);
  }
}
