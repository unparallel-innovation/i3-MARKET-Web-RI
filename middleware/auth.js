import nextConnect from 'next-connect';
import passport from '../lib/passport';
import { getSession } from '../lib/session';

const nc = nextConnect()
nc.use(async (req, res, next) => {
    await getSession(req, res); // session is set to req.session
    next();
})
nc.use(passport.initialize())
nc.use(passport.session())

export default nc
