import path = require('path');
import xlsx = require('xlsx');

const file = xlsx.readFile(path.resolve(__dirname, 'teste.xlsx'));
const tojson = xlsx.utils.sheet_to_json(file.Sheets.Sheet1);

for (const aa of tojson) {
    console.log(aa);
}
