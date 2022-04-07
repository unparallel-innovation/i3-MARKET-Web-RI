import MongoStore from 'connect-mongo';
import { v4 as uuidv4 } from 'uuid';
import nextSession from 'next-session';
import { promisifyStore } from 'next-session/lib/compat';

const mongoSt = MongoStore.create({
    secret: uuidv4(),
    mongoUrl: "mongodb://localhost:27017/i3m_sessions"
    // mongoUrl: "mongodb://webri_mongo_user:webri_mongo_pass@mongo:27017/i3m_sessions"
})

export const getSession = nextSession({
    store: promisifyStore(mongoSt)
})

