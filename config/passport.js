const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const Produto = require('../models/produto');
const config =  require('../config/database');

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//estou passndo o tokem
    opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // console.log(jwt_payload);
        User.getUserByID(jwt_payload._id, (err, user)=>{         
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);

            }else{
                return done( null, false);
            }
        });
    }))
}
