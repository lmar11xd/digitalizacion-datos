const db = require('../config/connection');
const Constants = require('../utils/Constants');
const PersonRepo = require('./person_repo');
const ConsentimientoRepo = require('./consentimiento_repo')

function getNameTable(domain) {
  if (domain == 'person_mf') {
    return Constants.TABLE_NAME_PERSON_MF;
  } else if (domain == 'person_ik') {
    return Constants.TABLE_NAME_PERSON_IK;
  } else if (domain == 'consentimiento') {
    return Constants.TABLE_NAME_CONSENTIMIENTO;
  }
  return '';
}

function truncateTable(nameTable) {
  return new Promise(async function (resolve, reject) {
    try {
      let sql = `TRUNCATE TABLE ${nameTable}`;
      await db.executeQuery(sql, {}, { autoCommit: true });
      console.log(`TRUNCATE TABLE ${nameTable}`);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}

async function loadDataTable(data, chunkSize, domain) {

  console.time("METODO PARTICION 1");
  let count = 1;
  while (data.length) {
    let result;
    if (domain == 'person_mf') {
      result = await PersonRepo.insertBulkPerson(data.splice(0, chunkSize));
    } else if (domain == 'person_ik') {
      result = await PersonRepo.insertBulkPersonIK(data.splice(0, chunkSize));
    } else if (domain == 'consentimiento') {
      result = await ConsentimientoRepo.insertBulkConsentimiento(data.splice(0, chunkSize));
    }
    console.log(`PAQUETE ${count}:`, result);
    count++;
  }
  console.timeEnd("METODO PARTICION 1");
  return [];

}

exports.truncateTable = truncateTable;
exports.loadDataTable = loadDataTable;
exports.getNameTable = getNameTable;