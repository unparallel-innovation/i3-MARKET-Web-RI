// import { getOfferingsByCategory } from '@UNPARALLEL/connector-ri'
// import { getOfferings } from '@UNPARALLEL/connector-ri'
import offerings from '/data/offeringsByCategory.json'

export default async function handler(req, res) {
  const { providerId } = req.query; // api/offerings/ADV01
  // const offerings = await getOfferings(providerId);
  // const offerings = await getOfferingsByCategory("Manufacturing");
  res.status(200).json(offerings);
}
