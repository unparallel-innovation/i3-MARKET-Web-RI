import { connector } from '/lib/server.js'

export default async function handler(req, res) {
    const data = req.body;

    switch (req.method) {
        case "GET":
            res.status(200).json({
                categories: await connector.getCategories(),
            });
            break;
        case "POST":
            await connector.registerOffering(data);
            // console.log(JSON.stringify(data));
            res.status(200).json(null);
            return;
    }
}

