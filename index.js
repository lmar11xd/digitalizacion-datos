const XLSX = require('xlsx');
const Constants = require('./src/utils/Constants');
const Utils = require('./src/utils/Utils');
const DataRepo = require('./src/repo/data_repo');

var filePath = '', strStartRow = '', startRow = 1;

function readParams() {
  try {
    filePath = process.argv[2];//Ruta archivo
    domain = process.argv[3]; //Dominio
    strStartRow = process.argv[4]; //Fila de inicio de data
  } catch (error) {
    console.log("ERROR -> PARAMETROS NO INGRESADOS");
  }
}

async function readExcel(path, domain) {
  console.log("INICIO PROCESO");
  console.time("PROCESO");

  try {
    console.log(`LEER EXCEL DESDE: ${path}`);
    const columns = Utils.getColumnNames(domain);
    const workbook = XLSX.readFile(path);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    startRow = strStartRow == undefined ? startRow: parseInt(strStartRow);
    console.log(startRow);
    //raw: false --> todos los valores como String
    //range: 1 --> omite la fila 1
    var data = XLSX.utils.sheet_to_json(
      worksheet, 
      { 
        header: columns.length > 0 ? columns : 1, 
        raw: false,
        defval: '',
        range: startRow
      }
    );
    //data.splice(0, 1);//Data empieza desde la segunda fila

    console.log(data[0]);
    console.log(`TOTAL REGISTROS: ${data.length}`);

    if (data.length > 0) {
      let nameTable = DataRepo.getNameTable(domain);
      await DataRepo.truncateTable(nameTable);
      await DataRepo.loadDataTable(data, Constants.CHUNK_SIZE, domain);

    }
  } catch (error) {
    console.log(error);
  }
  console.timeEnd("PROCESO");
  console.log("FIN PROCESO");
}

readParams();
if (!Utils.isEmpty(filePath) && !Utils.isEmpty(domain) ) {
  readExcel(filePath, domain);
}


//Nombre del archivo sin tildes
//readExcel('C:\\Users\\USER\\Downloads\\Proyecto Digitalizacion de Vouchers.xlsx');
//readExcel('C:\\Users\\USER\\Downloads\\Proyecto Digitalizacion de Vouchers V03 - Para Subir.xlsx');
//readExcel('C:\\Users\\USER\\Downloads\\Proyecto Digitalizacion Test.xlsx');

//EXE
//Command: node .\src\index.js "C:\Users\USER\Downloads\Proyecto Digitalizacion Test.xlsx"

//Terminal: npm run dev test.xlsx
//Terminal npm start test.xlsx
//npm start "D:\LMAR\TEST\104560\MF_DATA.xlsx" person_mf 2
//npm start "D:\LMAR\TEST\104560\IK_DATA.xlsx" person_ik

//INSTALAR NODE 16
//INCLUIR LA CARPETA node_modules