import { Model } from "./Model";
export class ProviderModel extends Model {
  private targetDbTable: any = this.prisma.Providers;
  private allowedFields: string[] = ['rut','name','address','cellphone'];

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
