import { ClusterScanner, NonceScanner } from "ssv-scanner";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  // const command = new SSVScannerCommand(params);
  // const result = await command.scan();

  const inputParams = JSON.parse(req.body);
  console.log("inputParams");
  console.log(inputParams);

  const params = {
    nodeUrl: inputParams.nodeUrl,
    contractAddress: inputParams.contractAddress,
    ownerAddress: inputParams.ownerAddress,
    operatorIds: inputParams.operatorIds,
  };

  const clusterScanner = new ClusterScanner(params);
  const result = await clusterScanner.run(params.operatorIds);
  console.log(
    JSON.stringify(
      {
        block: result.payload.Block,
        "cluster snapshot": result.cluster,
        cluster: Object.values(result.cluster),
      },
      null,
      "  "
    )
  );

  const nonceScanner = new NonceScanner(params);
  const nextNonce = await nonceScanner.run();
  console.log("Next nonce:", nextNonce);

  return res
    .status(200)
    .json({ cluster: Object.values(result), nonce: nextNonce });
}
