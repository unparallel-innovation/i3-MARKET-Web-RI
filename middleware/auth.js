import nextConnect from 'next-connect';
import passport from '../lib/passport';
import nextSession from "next-session";
import { promisifyStore} from 'next-session/lib/compat';
import { getSession } from '../lib/session';

// const mongoSt = MongoStore.create({
//     secret: uuidv4(),
//     mongoUrl: "mongodb://localhost:27017/i3m_sessions"
// })

// const getSession = nextSession({
//     store: promisifyStore(mongoSt)
// })

const nc = nextConnect()
nc.use(async (req, res, next) => {
    await getSession(req, res); // session is set to req.session
    next();
})
nc.use(passport.initialize())
nc.use(passport.session())

export default nc
