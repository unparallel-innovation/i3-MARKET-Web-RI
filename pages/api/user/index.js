import { getSession } from '../../../lib/session';
import { catchErrors } from '../../../lib/server';

export default catchErrors(async (req, res) => {
    const session = await getSession(req, res)
    return {user: session.user}
})
