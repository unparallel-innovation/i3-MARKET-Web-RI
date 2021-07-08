import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then(res => res.json())

export function useData(url) {
  return useSWR(url, fetcher);
}
