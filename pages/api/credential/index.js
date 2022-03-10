import nextConnect from 'next-connect';
import passport from '/lib/passport';
import auth from '../../../middleware/auth';

export default nextConnect()
    .use(auth)
    .get(passport.authenticate('openidconnect', { session: false }),
        function (req, res) {

        })
