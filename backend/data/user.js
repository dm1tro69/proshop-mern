import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@test.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Dmytro',
        email: 'dmytro@test.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Olga',
        email: 'olga@test.com',
        password: bcrypt.hashSync('123456', 10),
    },
]
export default users
