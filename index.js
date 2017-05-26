var app = require('./config/server');

// Start server
//-------------------------------------------------
var server = app.listen(__PORT, function() {
    console.log(`Server is listening on port ${__PORT}`);
});