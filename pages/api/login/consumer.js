import nextConnect from 'next-connect';
import auth from '../../../middleware/auth';
import passport from '../../../lib/passport';

const handler = nextConnect();

handler.use(auth)
    .get(
        passport.authenticate(
            'oidc',
            { scope: 'openid vc vc:consumer' }
        )
    );

export default handler;
