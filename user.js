var pg = require('pg');
var _ = require('lodash');
var assert = require('assert');

var User = function (args) {
    assert(args.connectionString, 'Needs a connectionString');

    var run = function (sql, params, next) {
        pg.connect(args.connectionString, function (err, client, done) {
            assert.ok(err === null, err);

            client.query(sql, params, function (err, result) {
                done();
                pg.end();

                if (err) {
                    next(err, null);
                } else {
                    next(null, result.rows);
                }
            });
        });
    };

    this.save = function (tbl, doc, next) {

    };
    this.findById = function (tbl, id, next) {
        var sql = 'select * from ' + tbl + ' where id = $1';
        var params = [id];
        run(sql, params, next);
    };
    this.find = function (tbl, criteria, next) {
        var sql = 'select * from ' + tbl;
        var params = [];
        run(sql, params, next);
    };
};

module.exports = User;