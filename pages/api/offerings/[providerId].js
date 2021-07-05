const apiUrl = "http://95.211.3.244:3000";

export async function getOfferings(providerId) {
  // const url = `${apiUrl}/semantic-engine/api/registration/offering/${providerId}/providerId`;
  // // console.log("fetch " + url);
  // const res = await fetch(url);
  // const data = await res.json();
  // return data;
  return [{
    name: "offering a",
  }, {
    name: "offering b"
  }];
}

export default async function handler(req, res) {
  const { providerId } = req.query; // api/offerings/ADV01
  const offerings = await getOfferings(providerId);
  res.status(200).json(offerings);
}
