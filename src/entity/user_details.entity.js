const typeorm = require('typeorm');

module.exports = new typeorm.EntitySchema({
    name: 'UserDetails',
    tableName: 'user_details',
    columns: {
        USER_ID: {
            primary: true,
            type: 'int',
            generated: true,
        },
        USERNAME: {
            type: 'varchar',
            length: 100,
            nullable: false,
        },
        CONTACT_NUMBER: {
            type: 'int',
            nullable: false,
            unique: true
        },
        PASSWORD: {
            type: 'varchar',
            length: 100,
            nullable: false,
        },
        CREATED_AT: {
            createDate: true,
        }
    }
})