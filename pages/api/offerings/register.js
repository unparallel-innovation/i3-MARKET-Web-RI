import { connector } from '/lib/server.js'

export default async function handler(req, res) {
  const { providerId } = req.query; // api/offerings/ADV01
  const data = req.body;
  console.log(JSON.stringify(data));
  const offerings = await connector.registerOffering(data);
  res.status(200).json({});
}

