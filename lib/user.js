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
            roles |= ROLE_PROVIDER;
    }

    rolesStr() {
        let arr = [];

        if (!this.roles)
            return "No roles";

        if (this.roles & ROLE_PROVIDER)
            arr.push("Provider");

        if (this.roles & ROLE_CONSUMER)
            arr.push("Consumer");

        if (this.roles & ROLE_ADMIN)
            arr.push("Admin");

        const last = arr.pop();

        if (arr.length)
            return arr.join(", ") + " and " + last;
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

// const user = new User('John James Doe', 'Siemens', ROLE_CONSUMER);
const user = new User('John James Doe', 'Siemens', ROLE_PROVIDER | ROLE_CONSUMER, 'Siemens_AG');

export default user;
