const mongoose = require('mongoose');
const {Schema} = mongoose ;
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');

const UserSchema = new Schema({

    email: {
        type: 'string',
        lowercase: true,
        unique: true,
        required: [true, "Cannot be blank"]
    },

    password: {
        type: 'string',
        required: [true, "Cannot be blank"]
    },

    tokens: [],

    articles: [{
        type: Schema.Types.ObjectId, ref: 'BlogPost'
    }],

    lists: [{
        type: Schema.Types.ObjectId, ref: 'ToDoList'
    }],
});

UserSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt){
        if(err) return next(err);

        bcrypt.hash( user.password, salt, function(err,hash){
            if(err) return next(err);

            user.password = hash ;
            next();
        })
    })
});

UserSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

UserSchema.methods.generateAuthToken = async function(){
    const user = this ;
    const token = jwt.sign({ _id: user._id.toString()}, 'appSecret');
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;


} 


UserSchema.statics.findByCredential = async function(email, password) {
    const user = await User.findOne({email});
    if(!user) throw new Error('Invalid Email or Password');
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error('Invalid Email or Password');

    return user
}

const User = mongoose.model('User', UserSchema);



module.exports = User ;