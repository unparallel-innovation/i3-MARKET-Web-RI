import { connector } from '/lib/server.js'
// import offerings from '/data/offeringsByCategory.json'

export default async function handler(req, res) {
  const { providerId } = req.query; // api/offerings/ADV01
  const offerings = await connector.getProviderOfferings(providerId);
  console.log(offerings);
  res.status(200).json(offerings);
}
