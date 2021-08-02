import {useState} from "react";
import useSWR from 'swr'

async function fetcher(...args) {
    const res = await fetch(...args);

    if (res.ok)
        return await res.json();

    else {
        const errormsg = await res.text();
        throw new Error(res.status + " - " + errormsg);
    }
}

export function useData(url) {
  return useSWR(url, fetcher);
}

export function useMap(eventKey, label) {
  const [ c, setC ] = useState(1);
  const [ map, setMap ] = useState({
    [`${eventKey}${label}0`]: true,
  });

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
