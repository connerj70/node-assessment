var express    = require('express'),
    bodyParser = require('body-parser'),
    ctrl       = require('./userCtrl.js');

var app = express();

app.use(bodyParser.json());


app.get('/api/users', ctrl.getUsers);
app.get('/api/users/:id', ctrl.getUsersById);
app.get('/api/admins', ctrl.getAdmins);
app.get('/api/nonadmins', ctrl.getNonAdmins);
app.get('/api/user_type/:userType', ctrl.getUsersByType);

app.put('/api/users/:userId', ctrl.putUser);

app.post('/api/users', ctrl.addUser);

app.delete('/api/users/:userId', ctrl.deleteUser);



app.listen(3000, function() {
    console.log("Listening on port 3000...");
})