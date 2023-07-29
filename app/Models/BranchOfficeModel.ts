import { Model } from "./Model";
export class BranchOfficeModel extends Model {
  private targetDbTable: any = this.prisma.BranchOffices;
  private allowedFields: string[] = ['country'];

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
