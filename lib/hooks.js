import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

async function fetcher(...args) {
    const res = await fetch(...args);

    if (res.ok)
        return await res.json();

    else {
        const errorMsg = await res.text();
        throw new Error('Error: ' + errorMsg);
    }
}

export function useData(url, options) {
    return useSWR(url, fetcher, options);
}

export function useMap(eventKey, label, nInstances = 1) {
    const [ c, setC ] = useState(1);
    let initialMap = {};
    for (let n = 0; n < nInstances;n++) {
        initialMap[`${eventKey}${label}${n}`] = true;
    }
    const [ map, setMap ] = useState(initialMap);

    function onDelete(e, eventKey) {
        if (Object.keys(map).length <= 1)
            return false;

        let im = { ...map };

        delete im[eventKey];

        setMap(im);
    }

    function onAdd() {
        const ek = `${eventKey}${label}${c}`;

        setC(c + 1);
        setMap({
            ...map,
            [ek]: true,
        });
    }

    return [ map, c, onDelete, onAdd ];
}

export function useUser({ redirectTo = '/login', redirectIfFound } = {}) {
    const { data, error } = useSWR('/api/user', fetcher);
    const user = data?.user;
    const finished = Boolean(data);
    const hasUser = Boolean(user);
    const router = useRouter();

    useEffect(() => {
        if (!redirectTo || !finished) return;
        if (
            // If redirectTo is set, redirect if the user was not found.
            (redirectTo && !redirectIfFound && !hasUser)
            // If redirectIfFound is also set, redirect if the user was found
            || (redirectIfFound && hasUser)
        ) {
            router.push(redirectTo);
        }
    }, [redirectTo, redirectIfFound, finished, hasUser]);

    return error ? null : user;
}
