import nextConnect from 'next-connect';
import passport from '/lib/passport';
import auth from '../../../middleware/auth';

const handler = nextConnect()

handler
    .use(auth)
    .get(passport.authenticate("openidconnect", {
        scope: 'open vc vc:consumer'}))

export default handler
