import { connector } from '/lib/server.js'

export default async function handler(req, res) {
  const { searchType, providerId, category, page, size } = req.query;

  if (searchType == "provider") {
    const offerings = await connector.getProviderOfferings(providerId, page, size);
    console.log(offerings);
    res.status(200).json(offerings);
    return;
  }

  if (searchType == "category") {
    const offerings = await connector.getCategoryOfferings(category, page, size);
    res.status(200).json(offerings);
    return;
  }

  res.status(200).json([]);
}
