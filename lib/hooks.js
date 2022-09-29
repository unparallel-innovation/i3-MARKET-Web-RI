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

    const [ tempNIndex, setTempNIndex ] = useState(nInstances);
    if(tempNIndex === 0)
        setTempNIndex(1)

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
        setTempNIndex(tempNIndex + 1);

        const ek = `${eventKey}${label}${tempNIndex}`;

        setC(tempNIndex);
        setMap({
            ...map,
            [ek]: true,
        });
    }

    return [ map, tempNIndex, onDelete, onAdd ];
}
