import { useRouter } from 'next/router';

export const ROLE_PROVIDER = 1;
export const ROLE_CONSUMER = 2;
export const ROLE_ADMIN = 4;

class User {
    constructor(name, company, roles, providerId) {
        this.name = name;
        this.company = company;
        this.roles = roles;
        this.providerId = providerId;
        if (providerId)
            this.roles |= ROLE_PROVIDER;
    }

    rolesStr() {
        let arr = [];

        if (!this.roles)
            return 'No roles';

        if (this.roles & ROLE_PROVIDER)
            arr.push('Provider');

        if (this.roles & ROLE_CONSUMER)
            arr.push('Consumer');

        if (this.roles & ROLE_ADMIN)
            arr.push('Admin');

        const last = arr.pop();

        if (arr.length)
            return arr.join(', ') + ' and ' + last;
        else
            return last;
    }

    isProvider() {
        return this.roles & ROLE_PROVIDER;
    }

    isConsumer() {
        return this.roles & ROLE_CONSUMER;
    }

    isAdmin() {
        return this.roles & ROLE_ADMIN;
    }
}

export default function useUser(noRedirect) {
    const router = useRouter();

    if (typeof window === 'undefined')
        return null;

    const userLS = localStorage.getItem('user');
    if (!userLS) {
        if (!noRedirect)
            router.push('/login');

        return null;
    }

    const userObj = JSON.parse(userLS);

    return new User(
        userObj.name, userObj.company,
        userObj.roles, userObj.providerId
    );
}
