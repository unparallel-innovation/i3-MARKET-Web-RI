import { connector } from '/lib/server.js'
import categoriesJSON from '/data/categories.json'
import providersJSON from '/data/providers.json'
import offeringsJSON from '/data/offeringsByCategory.json'

export default async function handler(req, res) {
  const { searchType, providerId, category, page, size } = req.query;
  let offerings = [];

  if (searchType === "provider" && providerId !== "undefined"){
    offerings = await connector.getProviderOfferings(providerId, page, size);
  }


  if (searchType === "category" && category !== "undefined"){
    offerings = await connector.getCategoryOfferings(category, page, size);
  }

  const result = {
    categories: await connector.getCategories(),
    providers: await connector.getProviders(),
    offerings: offerings,
  }
  res.status(200).json(result);
}
