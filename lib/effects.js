import {useState} from "react";
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then(res => res.json())

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
