/*
 * Copyright (c) 2014, COPYRIGHTⓒ2014 eBiz-Pro. ALL RIGHTS RESERVED.
 *
 */
var express = require('express');
var config = require('../../config/config');
var database = require('../../db/' + config.dbkind);
var auth = require('../../auth/auth.js');

function getRouter() {
    
    var router = express.Router();

    router.get('/duty-months/:year', auth.role('user'), dutyMonths);
    router.get('/dailyduty/:day', auth.role('manager'), dailyduty);

    return router;
}

module.exports.getRouter = getRouter;

function dutyMonths(req, res, next) {

    database.simpleExecute(
        'select ' +
        '    bizcd              as  "bizcd"            ,' +
        '    pay_month          as  "pay_month"        ,' +
        '    dept_cd            as  "dept_cd"          ,' +
        '    empno              as  "empno"            ,' +
        '    empname            as  "empname"          ,' +
        '    class_nm           as  "class_nm"         ,' +
        '    dept_nm            as  "dept_nm"          ,' +
        '    pay_version_id     as  "pay_version_id"   ,' +
        '    time_nor_time      as  "time_nor_time"    ,' +
        '    time_ot1_time      as  "time_ot1_time"    ,' +
        '    time_ot2_time      as  "time_ot2_time"    ,' +
        '    time_night_time    as  "time_night_time"  ,' +
        '    time_week1_time    as  "time_week1_time"  ,' +
        '    time_week2_time    as  "time_week2_time"  ,' +
        '    time_paid1_time    as  "time_paid1_time"  ,' +
        '    time_paid2_time    as  "time_paid2_time"  ,' +
        '    time_allowed_time  as  "time_allowed_time" ' +
        'from monthlyduty ' +
        "where pay_month like  :year || '%' and empno = :empno ",
        {
            year: req.params.year, 
            empno: req.user.empno
        },
        { outFormat: database.OBJECT }
    )
    .then(function(results) {
        res.json(results.rows);
    })    
    .catch(function(err) {
        next(err);
    });    
    
}

function dailyduty(req, res, next) {

    database.simpleExecute(
        'select ' +
        '    workdt       as "workdt"       ,' +
        '    week         as "week"         ,' +
        '    worknm       as "worknm"       ,' +
        '    start_tm     as "start_tm"     ,' +
        '    end_tm       as "end_tm"       ,' +
        '    out_tm       as "out_tm"       ,' +
        '    in_tm        as "in_tm"        ,' +
        '    iotm         as "iotm"         ,' +
        '    late_time    as "late_time"    ,' +
        '    out_time     as "out_time"     ,' +
        '    nor_time     as "nor_time"     ,' +
        '    ot1_time     as "ot1_time"     ,' +
        '    ot2_time     as "ot2_time"     ,' +
        '    night_time   as "night_time"   ,' +
        '    week1_time   as "week1_time"   ,' +
        '    week2_time   as "week2_time"   ,' +
        '    paid1_time   as "paid1_time"   ,' +
        '    paid2_time   as "paid2_time"   ,' +
        '    total_time   as "total_time"   ,' +
        '    nor_time_s   as "nor_time_s"   ,' +
        '    ot1_time_s   as "ot1_time_s"   ,' +
        '    ot2_time_s   as "ot2_time_s"   ,' +
        '    night_time_s as "night_time_s" ,' +
        '    week1_time_s as "week1_time_s" ,' +
        '    week2_time_s as "week2_time_s" ,' +
        '    paid1_time_s as "paid1_time_s" ,' +
        '    paid2_time_s as "paid2_time_s" ,' +
        '    total2_time  as "total2_time"   ' +
        'from dailyduty ' +
        'where workdt = :day and empno = :empno ',
        {
            day: req.params.day, 
            empno: req.user.empno
        },
        { outFormat: database.OBJECT }
    )
    .then(function(results) {
        res.json(results.rows[0]);
    })    
    .catch(function(err) {
        next(err);
    });    
    
}

