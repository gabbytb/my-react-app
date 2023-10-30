//  MONGOOSE: It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
//  "module.exports" is used to export a single function or object from a module.
module.exports = mongoose => {
    const UserSchema = new mongoose.Schema(
        {
            username: {
                type: String,
                max: 32,
                min: 6,
                required: true
            },
            firstName: {
                type: String,
                max: 32,
                min: 6,
                required: true
            },
            lastName: {
                type: String,
                max: 32,
                min: 6,
                required: true
            },
            phone: {
                type: Number
            },
            email: {
                type: String,
                max: 32,
                required: true
            },
            password: {
                type: String,
                max: 1022,
                min: 8,
                required: true
            },
            confirmPassword: {
                type: String,
                max: 1022,
                min: 8,
                required: true
            },
            role: {
                type: String, 
                default: "agent"
            },
            permission: ["contact-index"],
            isActive: {
                type: Boolean
            }
        }, 
        {   
            timestamps: true 
        }
    );


    //  If you use this app with a front-end that needs "id" field instead of "_id", you have to override toJSON method that map default object to a custom object.
    Schema.method("toJSON", function() {
        const { _v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    
    //  Create User Schema
    const User = mongoose.model("user", UserSchema);

    //  Create New User
    User.create({ username: "hibby", firstName: "Ebunoluwa", lastName: "Racheal", phone: 2347052069911, email: "jazy77720000@gmail.com", password: "Administrativerightsonly", confirmPassword: "Administrativerightsonly", role: "agent", permission: ["contact-index"], isActive: true });
    console.log("***** Created New User: ", User);
    
    return User;
};
