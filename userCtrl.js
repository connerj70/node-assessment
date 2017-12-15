var userData = require('./userData.json');

 module.exports = {
     getUsers: function(req, res, next) {

        var {age, lastname, email, favorites} = req.query;

        if(age || lastname || email || favorites) {

        if(age) {
            var toSend = userData.filter((user) => {
                if(user.age < age) {
                    return true;
                } else {
                    return false;
                }
            });
            res.status(200).send(toSend);
        }

        if(lastname) {
            var toSend = userData.filter((user) => {
                if(user.last_name.toLowerCase() === lastname.toLowerCase()) {
                    return true;
                } else {
                    return false;
                }
            });

            res.status(200).send(toSend);
        }

        if(email) {
            var toSend = userData.filter((user) => {
                if(user.email === email) {
                    return true;
                } else {
                    return false;
                }
            });

            res.status(200).send(toSend);
        }

        if(favorites) {
            var toSend = userData.filter((user) => {
                if(user.favorites.indexOf(favorites) !== -1) {
                    return true;
                } else {
                    return false;
                }
            });

            res.status(200).send(toSend);
        }
    } else {

        res.status(200).send(userData);
        }
     },
     getUsersById: function(req, res, next) {
         var {id} = req.params;
         console.log(id);

         let toSend = userData.filter((user) => {
             if(user.id == id) {
                 return true;
             } else {
                 return false;
             }
         });

         if(toSend.length === 1) {
             res.status(200).send(toSend[0]);
         } else {
             res.status(404).json(null);
         }
     },
     getAdmins: function(req, res, next) {
         let toSend = userData.filter((user) => {
             if(user.type == 'admin') {
                 return true;
             } else {
                 return false;
             }
         })
         res.status(200).send(toSend);
     },
     getNonAdmins: function(req, res, next) {
         let toSend = userData.filter((user) => {
             if(user.type !='admin') {
                 return true;
             } else {
                 return false;
             }
         });
         res.status(200).send(toSend);
     },
     getUsersByType: function(req, res, next) {
         let {userType} = req.params;

         let toSend = userData.filter((user) => {
             if(user.type == userType) {
                 return true;
             } else {
                 return false;
             }
         });
         res.status(200).send(toSend);
     },
     putUser: function(req, res, next) {
         let {first_name, last_name, email, gender, language, age, city, state, type, favorites} = req.body;
         let {userId} = req.params;
         let toSend;

         userData.map((user) => {
             if(user.id == userId) {
                 user.first_name = first_name;
                 user.last_name = last_name;
                 user.email = email;
                 user.gender = gender;
                 user.language = language;
                 user.age = age;
                 user.city = city;
                 user.state = state;
                 user.type = type;
                 user.favorites = favorites;
                 toSend = user;
                 res.status(200).send(userData)
             }
         });
     },
     addUser: function(req, res, next) {
        let {first_name, last_name, email, gender, language, age, city, state, type, favorites} = req.body;
        let id = userData[userData.length - 1].id + 1;
        let newUser = {id, first_name, last_name, email, gender, language, age, city, state, type, favorites}
        userData.push(newUser);
        res.status(200).send(userData);
     },
     deleteUser: function(req, res, next) {
         let id = req.params.userId;

         userData.map((value, i) => {
             if(value.id == id) {
                 userData.splice(i, 1);
                 res.status(200).send(userData);
             }
             
         });
     }
 };