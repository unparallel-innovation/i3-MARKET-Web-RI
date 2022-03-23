import nextConnect from 'next-connect'
import passport  from '../lib/passport.js'
import morgan from 'morgan'
import nextSession from "next-session";
const getSession = nextSession();

const nc = nextConnect()
nc.use(async (req, res, next) => {
    await getSession(req, res); // session is set to req.session
    next();
})
nc.use(morgan('dev'))
nc.use(passport.initialize())
// nc.use(passport.session())

export default nc
