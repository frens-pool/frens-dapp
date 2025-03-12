import { ClusterScanner, NonceScanner } from "ssv-scanner";

interface CacheEntry {
  data: any;
  timestamp: number;
}

const cache: { [key: string]: CacheEntry } = {};


export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const inputParams = JSON.parse(req.body);

  const cacheKey = JSON.stringify({
    nodeUrl: inputParams.nodeUrl,
    contractAddress: inputParams.contractAddress,
    ownerAddress: inputParams.ownerAddress,
    operatorIds: inputParams.operatorIds,
    network: inputParams.network,
  });

  // Check cache first
  const cachedResponse = cache[cacheKey];
  const now = Date.now();

  if (cachedResponse && now - cachedResponse.timestamp < 60000 * 50) { // Cache for 60 seconds
    console.log(`using cached clusterscanner response for key ${cacheKey}`);
    return res.status(200).json(cachedResponse.data);
  }

  // dirty hack to avoid double run
  cache[cacheKey] = {
    data: null,
    timestamp: Date.now()
  }

  try {
    console.log(`running clusterscanner for key ${cacheKey}`);
    const params = {
      nodeUrl: inputParams.nodeUrl,
      contractAddress: inputParams.contractAddress,
      ownerAddress: inputParams.ownerAddress,
      operatorIds: inputParams.operatorIds,
      network: inputParams.network,
    };

    const clusterScanner = new ClusterScanner(params);
    const result = await clusterScanner.run(params.operatorIds);

    const nonceScanner = new NonceScanner(params);
    const nextNonce = await nonceScanner.run();

    const responseData = {
      cluster: Object.values(result),
      nonce: nextNonce
    };

    console.log(`finished, data:`,responseData);

    // Update cache
    cache[cacheKey] = {
      data: responseData,
      timestamp: Date.now()
    };

    return res.status(200).json(responseData);
  } catch (error) {
    console.error("Error processing request:", error);
    return res.status(500).send({ error: 'Internal Server Error' });
  }

}
