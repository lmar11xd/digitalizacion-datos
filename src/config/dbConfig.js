module.exports = {
    user          : process.env.NODE_ORACLEDB_USER || "user",
    password      : process.env.NODE_ORACLEDB_PASSWORD || "pass",
    connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "(DESCRIPTION=(ADDRESS_LIST=(ADDRESS=(PROTOCOL=TCP)(PORT=1521)(HOST=10.*.*.*)))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=XE)))",
    externalAuth  : process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
  };