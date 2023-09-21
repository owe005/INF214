//
//Just the code for referencing. See the readme.MD file for solution. I added a return statement for it to return bcrypt.compare()
//


function login(req, res) {
    validateLogin(req.nameOrEmail, req.password).then(
        (result) => {
            // (BUG) Why does `result` has value `undefined` here?
        }       
    )
};

function validateLogin(nameOrEmail, password) {
    var errors = {};
    if (validator.isEmpty(nameOrEmail)) {
        errors.nameOrEmail = 'username is required';
    }
    if (validator.isEmpty(password)) {
        errors.password = 'password is required';
    }
    return db.User.find({$or:[{ username: nameOrEmail }, { email: nameOrEmail }]})
        .then(existingUser => {
            if (existingUser.length > 0) {
            // user exists, check if password matches hash
            var user = existingUser[0];
            return bcrypt.compare(password, user.password_digest) // Problem solved by adding a return statement.
                .then(valid => {
                    if (!valid){
                        errors.password = 'Invalid Password';
                    }
                    return { isValid: isEmpty(errors), errors };
                })
            } else {
                errors.nameOrEmail = 'username or email does not exist';
                return { isValid: isEmpty(errors), errors };
            }
        });
}
