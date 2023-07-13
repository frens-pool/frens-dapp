import { SSVScannerCommand } from "cluster-scanner";

export default async function handler(req: any, res: any) {

  // TODO : remove this when it all works..
  console.log(`cluster-scanner called`);
  console.log(`body`,req.body);

  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const params = JSON.parse(req.body);

  const command = new SSVScannerCommand(params);
  const result = await command.scan();

  return res.status(200).json({ cluster: Object.values(result) });
}
