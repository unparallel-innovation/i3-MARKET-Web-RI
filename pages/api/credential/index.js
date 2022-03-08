import nextConnect from 'next-connect';
import passport from '/lib/passport';
import auth from '../../../middleware/auth';

export default nextConnect()
    .use(auth)
    .get(passport.authenticate("openidconnect", { session: false }, (error, token) => {
        if (error) {
            console.error(error)
        } else {
            console.log(token)
        }
    }))


