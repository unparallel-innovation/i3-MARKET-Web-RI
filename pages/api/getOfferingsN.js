import { connector } from '/lib/server.js'

export default async function handler(req, res) {
    res.status(200).json({
      // offeringsN: (await connector.getOfferings()).length,
      offeringsN: 32,
    });
}
