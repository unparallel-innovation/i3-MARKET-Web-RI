import nextConnect from 'next-connect';
import auth from '../../../middleware/auth';
import passport from '../../../lib/passport';
import User from '../../../lib/user';

const handler = nextConnect();

handler.use(auth)
    .get(
        passport.authenticate(
            'oidc',
            { session: false, failureRedirect: '/login', failureMessage: true }
        ), async (req, res) => {
            if (req.user) {
                req.session.user = new User(req.user);
                await req.session.commit();
                res.redirect('/');
            }
        }
    );

export default handler;
