import { connector } from '/lib/server.js'

export default async function handler(req, res) {
    res.status(200).json({
      // providersN: (await connector.getProviders()).length,
      // offeringsN: (await connector.getOfferings()).length,
      // categories: await connector.getOfferingsByCategory(),
      // providersN: 8,
      // offeringsN: 32,
      categories: [{
        category: "Agriculture",
        offerings: 5,
      }, {
        category: "Automotive",
        offerings: 1,
      }, {
        category: "Culture",
        offerings: 3,
      }, {
        category: "Economy",
        offerings: 5,
      }, {
        category: "Education",
        offerings: 10,
      }, {
        category: "Energy",
        offerings: 12,
      }, {
        category: "Environment",
        offerings: 8,
      }, {
        category: "Government",
        offerings: 10,
      }, {
        category: "Health",
        offerings: 2,
      }, {
        category: "International",
        offerings: 4,
      }, {
        category: "Justice",
        offerings: 14,
      }, {
        category: "Manufacturing",
        offerings: 20,
      }, {
        category: "Regions",
        offerings: 2,
      }, {
        category: "Science",
        offerings: 5,
      }, {
        category: "Transport",
        offerings: 1,
      }, {
        category: "Wellbeing",
        offerings: 6,
      }, {
        category: "Society",
        offerings: 2,
      }],
    });
}
