
import nextConnect from 'next-connect'
import passport from '../lib/passport'
import session from '../lib/session'

const auth = nextConnect()
    .use(session)
    .use(passport.initialize())
    .use(passport.session())

export default auth
