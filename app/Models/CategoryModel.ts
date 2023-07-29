import { Model } from "./Model";
export class CategoryModel extends Model {
  private targetDbTable: any = this.prisma.Categories;
  private allowedFields: string[] = ['name'];

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
