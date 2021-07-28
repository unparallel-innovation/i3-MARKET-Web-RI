import { connector } from '/lib/server.js'

export default async function handler(req, res) {
    res.status(200).json({
      providersN: await connector.getProviders(),
      offeringsN: await connector.getOfferings(),
    });
}
