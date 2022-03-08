import { ironSession } from "next-iron-session";
import { v1 as uuidv1 } from 'uuid';

const session = ironSession({
    cookieName: "web-ri",
    password: uuidv1(),
    // if your localhost is served on http:// then disable the secure flag
    cookieOptions: {
        secure: process.env.NODE_ENV === "production"
    },
});

export default session;
