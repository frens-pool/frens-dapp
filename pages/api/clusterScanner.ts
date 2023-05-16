import { SSVScannerCommand } from "cluster-scanner";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const params = JSON.parse(req.body);

  const command = new SSVScannerCommand(params);
  const result = await command.scan();

  return res.status(200).json({ cluster: Object.values(result) });
}
