(function() {
  var app, express;

  express = require("express");

  app = express.createServer();

  app.get("/", function(req, res) {
    return res.redirect("/index.html");
  });

  app.configure(function() {
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(express.static(__dirname + "/omh"));
    app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
    return app.use(app.router);
  });

  app.listen(8888);

}).call(this);
