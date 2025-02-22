const bcrypt = require('bcryptjs');

const password = '1234567';  // Replace this with the actual password you want to hash

bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
        console.error('Error hashing password:', err);
    } else {
        console.log('Hashed Password:', hashedPassword);
    }
});
