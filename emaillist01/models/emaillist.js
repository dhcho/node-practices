const mysql = require('mysql');
const util = require('util');

const dbconn = require('./dbconn');

module.exports = {
    findAll: async function() {
        const conn = dbconn();
        // const query = function(sql,data){
        //     return new Promise(function(resolve, reject){
        //         conn.query(
        //             sql,
        //             data,
        //             function(error, rows, field) {
        //                 if(error){
        //                     reject(error);
        //                     return;
        //                 }

        //                 resolve(rows);
        //             });
        //     });
        // }

        // const query = (sql,data) => new Promise(function(resolve, reject){
        //     conn.query(sql, data, (error, rows, field) => error ? reject(error):resolve(rows))
        // });

        // const query = (sql, data) => new Promise((resolve, reject) => conn.query(sql, data, (error, results, field) => error ? reject(error):resolve(rows))); 
        const query = util.promisify(conn.query).bind(conn);

        try{
            /*
            conn.query(
                "select first_name, last_name, email from emaillist order by no", 
                [], 
                function(error, rows, field){
                results = rows;
                console.log("sql callback:" + results);
            });
            */
            const results = await query("select first_name as firstName, last_name as lastName, email from emaillist order by no desc", []);
            return results;
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }
    },
    insert: async function(emaillist) {
        console.log(emaillist);
        console.log(Object.values(emaillist));
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);

        try{
            return await query(
                "insert into emaillist values(null, ?, ?, ?)", 
                // [emaillist.fn, emaillist.ln, emaillist.email]
                Object.values(emaillist)
            );
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }
    }
}