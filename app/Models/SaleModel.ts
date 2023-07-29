import { Model } from "./Model";
export class SaleModel extends Model {
  private targetDbTable: any = this.prisma.Sales;
  private allowedFields: string[] = [];

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
