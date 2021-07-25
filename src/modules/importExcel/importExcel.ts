// eslint-disable-next-line @typescript-eslint/no-var-requires
const xlsxj = require('xlsx-to-json-lc');
import { promisify } from 'util';

const excelTo = promisify(xlsxj);

async function assyncToJson(
    inputFile: string,
    outputFile: string,
): Promise<any[] | void> {
    await excelTo({
        input: inputFile,
        output: outputFile,
        //lowerCaseHeaders: true, //converts excel header rows into lowercase as json keys
    })
        .then(function (result: any) {
            //console.error(result);
        })
        .catch(function (err: any) {
            console.error(err);
        });
}

export { assyncToJson };
