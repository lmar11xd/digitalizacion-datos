const db = require('../config/connection');
const Utils = require('../utils/Utils');
const Constants = require('../utils/Constants');


function insertBulkConsentimiento(arrayData) {
    return new Promise (async function (resolve, reject) {
        try {
            let sql = `INSERT INTO ${Constants.TABLE_NAME_CONSENTIMIENTO} (
                DNI,
                NOMBRE, 
                FECHA
            ) VALUES (:1,:2,:3)`;

            let options = {
                autoCommit: true,
                bindDefs: [
                    { type: db.oracledb.STRING, maxSize: 50 },
                    { type: db.oracledb.STRING, maxSize: 100 },
                    { type: db.oracledb.STRING, maxSize: 50 },
                ]
            };

            let result = await db.executeManyQuery(sql, arrayData, options);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

exports.insertBulkConsentimiento = insertBulkConsentimiento;