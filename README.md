## DOCUMENTACION ORACLEDB:
https://github.com/oracle/node-oracledb/blob/main/doc/api.md#batchexecut


## HABILITAR EJECUCIÓN DE SCRIPTS
POWERSHELL: Set-ExecutionPolicy Unrestricted

## INSTALAR DEPENDENCIAS
Terminal: npm install
## EJECUTAR APP
Terminal: npm start <ruta_archivo_excel> <dominio> <inicio_data>

### Example: 
    ```
    1. npm start "D:\LMAR\TEST\104560\MF_DATA_TEST.xlsx" person_mf 2
    2. npm start "D:\LMAR\TEST\104560\IK_DATA_TEST.xlsx" person_ik
    ```