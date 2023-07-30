import { Model } from "./Model";
export class SaleDetailsModel extends Model {
  private targetDbTable: any = this.prisma.SaleDetails;
  private allowedFields: string[] = ['sale_code', 'product_id','quantity','sub_total'];

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
