import nextConnect from 'next-connect';
import auth from '../../../middleware/auth';
import passport from '../../../lib/passport';

const handler = nextConnect()

handler.use(auth)
    .get(
        passport.authenticate(
            'oidc',
            { session: false, failureRedirect: '/login', failureMessage: true}
        ), async (req, res) => {
            if (req.user) {
                req.session.user = req.user
                await req.session.commit()
                res.redirect("/")
            }
        }
    )

export default handler
