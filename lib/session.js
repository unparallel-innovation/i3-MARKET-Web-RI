import MongoStore from 'connect-mongo';
import { v4 as uuidv4 } from 'uuid';
import nextSession from 'next-session';
import { promisifyStore } from 'next-session/lib/compat';

const mongoSt = MongoStore.create({
    secret: uuidv4(),
    mongoUrl: process.env.MONGO_URL + 'admin'
});

export const getSession = nextSession({
    store: promisifyStore(mongoSt)
});

