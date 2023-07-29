const FS = require('fs');
const { type } = require('os');
const prettier = require('prettier');

const CREAR_MODELO = async (modelNameParam) => {
    try {
        function getModelName(modelNameParam) {
            return `${modelNameParam[0].toUpperCase() + modelNameParam.slice(1)}Model`;
        }

        function getDbModelTable(modelNameParam) {
            let concatLetter = modelNameParam.slice(-1) == 'y'? 'ies': 's';
            if (concatLetter === 'ies') {
                return modelNameParam[0].toUpperCase() + 
                modelNameParam.slice(1).replace(new RegExp('y', 'g'), '').concat(concatLetter);
            }
            return modelNameParam[0].toUpperCase() + modelNameParam.slice(1).concat(concatLetter);
        }

        model = getModelName(modelNameParam);
        table = getDbModelTable(modelNameParam);

        if (modelNameParam != '') {
            template = `import { Model } from "./Model";
                export class ${model} extends Model {
                    private targetDbTable: any = this.prisma.${table};
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
            `;
        }

        let dataFile = `./app/Models/${model}.ts`;
        FS.writeFileSync(dataFile, prettier.format(template, { parser: 'typescript' }));

        return dataFile;

    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {
    CREAR_MODELO
}