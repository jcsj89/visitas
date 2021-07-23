import path = require('path');
import fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xlsxj = require('xlsx-to-json-lc');

const inputFile = path.resolve(
    __dirname,
    '..',
    '..',
    'files',
    'rol',
    'SUSPENSO.xlsx',
);
const outputFile = path.resolve(
    __dirname,
    '..',
    '..',
    'files',
    'output',
    'output.json',
);

function excelToJson(inputFile: string, outputFile: string): any[] | void {
    //convert excel to json
    xlsxj(
        {
            input: inputFile,
            output: outputFile,
            lowerCaseHeaders: true, //converts excel header rows into lowercase as json keys
        },
        function (err: any, result: any) {
            if (err) {
                console.error(err);
            } else {
                return result;
            }
        },
    );
}

function jsonObj(outputFile: string): any[] {
    //read json file
    const jsonObj = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
    return jsonObj;
}
export { jsonObj, excelToJson, outputFile, inputFile };
