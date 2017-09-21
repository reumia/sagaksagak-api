import orm from 'orm'
import DB_CONFIG from '../configs/database'

const DB_URL = `mysql://${DB_CONFIG.user}:${DB_CONFIG.password}@${DB_CONFIG.host}/${DB_CONFIG.database}`

orm.connect(DB_URL, (err, db) => {
    if (err) throw err

    const Person = db.define("person", {
        name      : String,
        surname   : String,
        age       : Number, // FLOAT
        male      : Boolean,
        continent : [ "Europe", "America", "Asia", "Africa", "Australia", "Antarctica" ], // ENUM type
        photo     : Buffer, // BLOB/BINARY
        data      : Object // JSON encoded
    }, {
        methods: {
            fullName: function () {
                return this.name + ' ' + this.surname;
            }
        },
        validations: {
            age: orm.enforce.ranges.number(18, undefined, "under-age")
        }
    });

    // add the table to the database
    db.sync(function(err) {
        if (err) throw err;

        Person.find({ surname: "Doe" }, function (err, people) {
            // SQL: "SELECT * FROM person WHERE surname = 'Doe'"
            if (err) throw err;

            console.log("People found: %d", people.length);
            console.log("First person: %s, age %d", people[0].fullName(), people[0].age);

            people[0].age = 16;
            people[0].save(function (err) {
                // err.msg = "under-age";
            });
        });
    });
})

