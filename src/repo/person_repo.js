const db = require('../config/connection');
const Utils = require('../utils/Utils');
const Constants = require('../utils/Constants');

function getPerson(dni){ 
    return new Promise(async function(resolve, reject) {
        try {
            let result = await db.executeQuery(`SELECT * FROM ${Constants.TABLE_NAME_PERSON_MF} WHERE NRO_DOC = :dni`, [dni], false);
            resolve(result.rows.length > 0 ? result.rows [0]: []);
        } catch (error) {
            reject(error);
        }
    });
}

function insertBulkPerson(arrayData) {
    return new Promise (async function (resolve, reject) {
        try {
            let sql = `INSERT INTO ${Constants.TABLE_NAME_PERSON_MF} (
                DEPARTAMENTO,
                CORPORACION, 
                TIPO_DOC,
                NRO_DOC, 
                NOMBRES, 
                APE_PATERNO, 
                APE_MATERNO, 
                TELEFONO, 
                CELULAR, 
                CORREO, 
                FIRMA,
                FEC_CREA,
                USU_CREA
            ) VALUES (:1,:2,:3,:4,:5,:6,:7,:8,:9,:10,:11,SYSDATE,'APP_NODEJS')`;

            let options = {
                autoCommit: true,
                bindDefs: [
                    { type: db.oracledb.STRING, maxSize: 50 },
                    { type: db.oracledb.STRING, maxSize: 50 },
                    { type: db.oracledb.STRING, maxSize: 50 },
                    { type: db.oracledb.STRING, maxSize: 50 },
                    { type: db.oracledb.STRING, maxSize: 100 }, //NOMBRES
                    { type: db.oracledb.STRING, maxSize: 50 },
                    { type: db.oracledb.STRING, maxSize: 50 },
                    { type: db.oracledb.STRING, maxSize: 50 },
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

/*

                FECHA_ACTUALIZACION,
                DNI_CORRECTO,
                CALIDAD_CELULAR,
                CALIDAD_EMAIL,
                CONSENTIMIENTO_MIFA,
                CONSENTIMIENTO_INKA,
                NUEVO_CELULAR,
                NUEVO_EMAIL,
                NUEVO_CLIENTE, 
                
                
                    { type: db.oracledb.STRING, maxSize: 2 },//12-LEN_DNI
                    { type: db.oracledb.STRING, maxSize: 100 },//13-CORREO_VALIDACION
                    { type: db.oracledb.STRING, maxSize: 20 },//14-FECHA_ACTUALIZACION
                    { type: db.oracledb.STRING, maxSize: 5 },//15-DNI_CORRECTO
                    { type: db.oracledb.STRING, maxSize: 5 },//16-PASA_RCALIDAD_CELULAR
                    { type: db.oracledb.STRING, maxSize: 5 },//17-PASA_RCALIDAD_EMAIL
                    { type: db.oracledb.STRING, maxSize: 255 },//18-NRO_CELULAR_E
                    { type: db.oracledb.STRING, maxSize: 255 },//19-EMAIL_E
                    { type: db.oracledb.STRING, maxSize: 5 },//20-CONSENTIMIENTO_MIFA
                    { type: db.oracledb.STRING, maxSize: 5 },//21-CONSENTIMIENTO_INKA
                    { type: db.oracledb.STRING, maxSize: 5 },//22-DUPLICADO
                    { type: db.oracledb.STRING, maxSize: 5 },//23-DATO_NUEVO_CELULAR
                    { type: db.oracledb.STRING, maxSize: 5 },//24-DATO_NUEVO_EMAIL
                    { type: db.oracledb.STRING, maxSize: 5 },//25-CLIENTE_NUEVO*/

function insertBulkPersonIK(arrayData) {
    return new Promise (async function (resolve, reject) {
        try {
            let sql = `INSERT INTO ${Constants.TABLE_NAME_PERSON_IK} (
                CORPORACION, 
                TIPO_DOC,
                NRO_DOC, 
                NOMBRES, 
                APE_PATERNO, 
                APE_MATERNO, 
                TELEFONO, 
                CELULAR, 
                CORREO, 
                FIRMA,
                DEPARTAMENTO,
                FECHA_ACTUALIZACION,
                DNI_CORRECTO,
                CALIDAD_CELULAR,
                CALIDAD_EMAIL,
                CONSENTIMIENTO_MIFA,
                CONSENTIMIENTO_INKA,
                NUEVO_CELULAR,
                NUEVO_EMAIL,
                NUEVO_CLIENTE,
                FEC_CREA,
                USU_CREA
            ) VALUES (
                :CIA,
                :TIPO_DOC,
                :NRO_DOC,
                :NOMBRES,
                :APE_PATERNO,
                :APE_MATERNO,
                :TELEFONO,
                :CELULAR,
                :CORREO,
                :FIRMA,
                :DEPARTAMENTO,
                :FECHA_ACT,
                :DNI_CORRECTO,
                :CALIDAD_CELULAR,
                :CALIDAD_EMAIL,
                :CONSENT_MIFA,
                :CONSENT_INKA,
                :NUEVO_CELULAR,
                :NUEVO_EMAIL,
                :NUEVO_CLIENTE,
                SYSDATE,
                'APP_NODEJS'
            )`;

            let options = {
                autoCommit: true,
                bindDefs: {
                    CIA: { type: db.oracledb.STRING, maxSize: 50 },//1-CIA
                    TIPO_DOC: { type: db.oracledb.STRING, maxSize: 50 },//2-TIPO_DOCUMENTO
                    NRO_DOC: { type: db.oracledb.STRING, maxSize: 50 },//3-DNI
                    NOMBRES: { type: db.oracledb.STRING, maxSize: 50 },//4-NOMBRE
                    APE_PATERNO: { type: db.oracledb.STRING, maxSize: 50 },//5-APELLIDO_PATERNO
                    APE_MATERNO: { type: db.oracledb.STRING, maxSize: 50 },//6-APELLIDO_MATERNO
                    TELEFONO: { type: db.oracledb.STRING, maxSize: 50 },//7-TELEFONO
                    CELULAR: { type: db.oracledb.STRING, maxSize: 50 },//8-CELULAR
                    CORREO: { type: db.oracledb.STRING, maxSize: 100 },//9-CORREO
                    FIRMA: { type: db.oracledb.STRING, maxSize: 100 },//10-FIRMA
                    DEPARTAMENTO: { type: db.oracledb.STRING, maxSize: 50 },//11-DEP
                    FECHA_ACT: { type: db.oracledb.STRING, maxSize: 20 },
                    DNI_CORRECTO: { type: db.oracledb.STRING, maxSize: 2 },
                    CALIDAD_CELULAR: { type: db.oracledb.STRING, maxSize: 2 },
                    CALIDAD_EMAIL: { type: db.oracledb.STRING, maxSize: 2 },
                    CONSENT_MIFA: { type: db.oracledb.STRING, maxSize: 2 },
                    CONSENT_INKA: { type: db.oracledb.STRING, maxSize: 2 },
                    NUEVO_CELULAR: { type: db.oracledb.STRING, maxSize: 2 },
                    NUEVO_EMAIL: { type: db.oracledb.STRING, maxSize: 2 },
                    NUEVO_CLIENTE: { type: db.oracledb.STRING, maxSize: 2 },
                }
            };

            let result = await db.executeManyQuery(sql, arrayData, options);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
}

exports.getPerson = getPerson;
exports.insertBulkPerson = insertBulkPerson;
exports.insertBulkPersonIK = insertBulkPersonIK;