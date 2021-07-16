import { connector } from '/lib/server.js'
// import offerings from '/data/offeringsByCategory.json'

export default async function handler(req, res) {
  const { providerId } = req.query; // api/offerings/ADV01
  // const offerings = await connector.fetchData("GET", "/offering/{id}/providerId?provider_id", providerId)
  const offerings = await connector.fetchData("GET", "/offering/{category}?category", "Automotive");
  console.log(offerings);
  res.status(200).json(offerings);
}
