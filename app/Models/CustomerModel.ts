import { Model } from "./Model";
export class CustomerModel extends Model {
  private targetDbTable: any = this.prisma.Customers;
  private allowedFields: string[] = ['rut','name','lastname','address','cellphone'];

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
