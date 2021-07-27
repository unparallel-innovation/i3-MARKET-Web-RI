import { connector } from '/lib/server.js'

export default async function handler(req, res) {
  const { searchType, providerId, category, page, size } = req.query;
  let offerings = [];
  console.log(searchType, providerId, category, page, size)

  if (searchType === "provider")
    offerings = await connector.getProviderOfferings(providerId, page, size);

  if (searchType === "category")
    offerings = await connector.getCategoryOfferings(category, page, size);

  const result = {
    categories: await connector.getCategories(),
    providers: await connector.getProviders(),
    offerings,
  }

  res.status(200).json(result);
}
