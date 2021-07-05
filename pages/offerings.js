import useSWR from 'swr'
import Layout from '/components/Layout.js'
const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Offerings() {
  const providerId = 'ADV01';
  const { data, error } = useSWR(`/api/offerings/${providerId}`, fetcher);

  if (error)
    return <Layout>Offerings failed to load</Layout>;

  if (!data)
    return <Layout>Loading...</Layout>;

  const offeringsEl = data.map(offering => (
    <li key={offering.name}>{ offering.name }</li>
  ));

  return (<Layout>
    <h1>Offerings</h1>
    <ul>{ offeringsEl }</ul>
  </Layout>);
}

