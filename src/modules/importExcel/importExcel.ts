import path = require('path');
import xlsx = require('xlsx');

const file = xlsx.readFile(
    path.resolve(__dirname, '..', '..', 'files', 'teste.xlsx'),
);
export const tojson = xlsx.utils.sheet_to_json(file.Sheets.Sheet1);
