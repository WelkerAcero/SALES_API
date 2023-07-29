import { Model } from "./Model";
export class ProductModel extends Model {
  private targetDbTable: any = this.prisma.Products;
  private allowedFields: string[] = ['branch_office_id','provider_id','category_id','name','price','stock'];

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
