const apiUrl = "https://api-url.com";
export async function getOfferings(providerId) {
  // const res = await fetch(`${apiUrl}/semantic-engine/api/registration/offering/${providerId}/providerId`);
  // const data = await res.json();
  // return data;
  return [{
    name: "offering a",
  }, {
    name: "offering b"
  }];
}

export default function handler(req, res) {
  const { providerId } = req.query; // api/offerings.js?providerId=ADV01
  getOfferings().then(offerings => {
    res.status(200).json(offerings);
  });
}
