import { catchErrors } from '../../../lib/server';
import nextConnect from 'next-connect';
import passport from '../../../lib/passport';
import auth from '../../../middleware/auth';

// export default catchErrors(async (req, res) => {
//
//     }
// )
const handler = nextConnect()

handler
    .use(auth)
    .get(passport.authenticate('openidconnect'), {session: false}, (req, res) => {

    // res.json({ user: req.user })

    console.log("request", req)

    console.log("\nresponse", res)

})

export default handler
