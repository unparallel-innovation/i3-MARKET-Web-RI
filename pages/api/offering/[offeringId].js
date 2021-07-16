import { connector } from '/lib/server.js'
// import offering from '/data/offeringById.json'

export default async function handler(req, res) {
  const { offeringId } = req.query; // api/offerings/ADV01
  // const offerings = await getOffering(offeringId);
  let offering = await connector.fetchData("GET", "/offering/{id}/offeringId?offering_id", offeringId)
  offering = offering.length ? offering[0] : null;
  res.status(200).json(offering);
}

