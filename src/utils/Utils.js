const getStringValue = function (value) {
    if(value == undefined || value == null || value == "-" || (""+value).trim() == "-") return "";
    else return ("" + value).trim();//return value;
}

const isEmpty = function (value) {
    return (value == undefined || value == null || value == "");
}

const getColumnNames = function (domain) {
    const columns = [
        'CIA','TIPO_DOC','NRO_DOC','NOMBRES','APE_PATERNO','APE_MATERNO','TELEFONO',
        'CELULAR','CORREO','FIRMA','DEPARTAMENTO','LEN_DNI','CORREO_VALIDACION','FECHA_ACT',
        'DNI_CORRECTO','CALIDAD_CELULAR','CALIDAD_EMAIL','CELULAR_E','EMAIL_E','CONSENT_MIFA','CONSENT_INKA',
        'DUPLICADO','NUEVO_CELULAR','NUEVO_EMAIL','NUEVO_CLIENTE'
    ];

    if (domain == 'person_ik') {
        return columns;
    }
    return [];
}

exports.getStringValue = getStringValue;
exports.isEmpty = isEmpty;
exports.getColumnNames = getColumnNames;