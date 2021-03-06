// This test verifies that changeUser errors are treated as fatal errors.  The
// rationale for that is that a failure to execute a changeUser sequence may
// cause unexpected behavior for queries that were enqueued under the
// assumption of changeUser to succeed.

var assert = require('assert');
var common = require('../../common');

var server = common.createFakeServer();

server.listen(0, function (err) {
  assert.ifError(err);

  var connection = common.createConnection({port: server.port()});

  connection.changeUser({database: 'does-not-exist'}, function (err) {
    assert.ok(err, 'got error');
    assert.equal(err.code, 'ER_BAD_DB_ERROR');
    assert.equal(err.fatal, true);

    server.destroy();
  });
});
