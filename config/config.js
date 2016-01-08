/*
 * Copyright (c) 2014, COPYRIGHTⓒ2014 eBiz-Pro. ALL RIGHTS RESERVED.
 *
 */
module.exports = {
    'secret': 'eBizProIsAwesome',
    'dbkind': 'mysql', // set oracledb or mysql
    'oracledb': {
        user: 'mpas',
        password: 'mpas',
        externalAuth  : false,
        connectString: 'localhost/oracle',
        /* connectString: '192.168.10.101/orcl', */
        poolMax: 20,
        poolMin: 2,
        poolIncrement: 2,
        poolTimeout: 10
    },
    'mysql': {
        host :'localhost',
        port : 3306,
        user : 'mpas',
        password : 'mpas',
        database:'mpas',
        connectionLimit:20,
        waitForConnections:false
    }
};