import offering from '/data/offeringById.json'

export default async function handler(req, res) {
  const { offeringId } = req.query; // api/offerings/ADV01
  // const offerings = await getOffering(offeringId);
  res.status(200).json(offering);
}

