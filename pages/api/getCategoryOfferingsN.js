import { connector } from '/lib/server.js'

export default async function handler(req, res) {
    const { category } = req.query;

    // const offerings = await connector.getCategoryOfferings(category);

    res.status(200).json({
      // offeringsN: offerings.length,
      offeringsN: 3,
    });
}
