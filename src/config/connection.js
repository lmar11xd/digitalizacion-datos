process.env.ORA_SDTZ = 'UTC';

const oracledb = require('oracledb');
const dbConfig = require('./dbConfig');

async function executeQuery(sql, binds, options) {
    let cnn;
    let result;
    try {
        cnn = await oracledb.getConnection(dbConfig);
        result = await cnn.execute(sql, binds, options);
    } catch (error) {
        throw error;
    } finally {
        if(cnn) cnn.release();
    }
    
    return result;
}

async function executeManyQuery(sql, binds, options) {
    let cnn;
    let result;
    try {
        cnn = await oracledb.getConnection(dbConfig);
        result = await cnn.executeMany(sql, binds, options);
    } catch (error) {
        throw error;
    } finally {
        if(cnn) cnn.release();
    }
    
    return result;
}

module.exports = {
    oracledb,
    executeQuery,
    executeManyQuery
}