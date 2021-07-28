import { connector } from '/lib/server.js'

export default async function handler(req, res) {
    res.status(200).json({
      // providersN: await connector.getProviders(),
      // offeringsN: await connector.getOfferings(),
      providersN: 8,
      offeringsN: 32,
      categories: [{
        title: "Agriculture",
        count: 5,
      }, {
        title: "Automotive",
        count: 1,
      }, {
        title: "Culture",
        count: 3,
      }, {
        title: "Economy",
        count: 5,
      }, {
        title: "Education",
        count: 10,
      }, {
        title: "Energy",
        count: 12,
      }, {
        title: "Environment",
        count: 8,
      }, {
        title: "Government",
        count: 10,
      }, {
        title: "Health",
        count: 2,
      }, {
        title: "International",
        count: 4,
      }, {
        title: "Justice",
        count: 14,
      }, {
        title: "Manufacturing",
        count: 20,
      }, {
        title: "Regions",
        count: 2,
      }, {
        title: "Science",
        count: 5,
      }, {
        title: "Transport",
        count: 1,
      }, {
        title: "Wellbeing",
        count: 6,
      }, {
        title: "Society",
        count: 2,
      }],
    });
}
