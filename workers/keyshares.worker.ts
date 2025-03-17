import { SSVKeys } from "ssv-keys";
import { ISharesKeyPairs, KeyShares, KeySharesItem } from "ssv-keys";
import BigNumber from "bignumber.js";

self.onmessage = async (e) => {
  const { operatorsList, keystoreFileData, pw, poolAddress } = e.data;
  
  try {
    const ssvKeys = new SSVKeys();
    
    const operators = operatorsList.map((operator: any) => ({
      id: operator.id,
      operatorKey: operator.public_key,
    }));

    const { publicKey, privateKey } = await ssvKeys.extractKeys(
      keystoreFileData,
      pw
    );
    const threshold: ISharesKeyPairs = await ssvKeys.createThreshold(
      privateKey,
      operators
    );
    const encryptedShares = await ssvKeys.encryptShares(
      operators,
      threshold.shares
    );

    // SSV Cluster Data
    let initialClusterData = {
      cluster: {
        Owner: poolAddress,
      }
    };

    const ownerAddress = initialClusterData.cluster.Owner;
    const ownerNonce = 0;

    const keySharesItem = new KeySharesItem();
    await keySharesItem.update({ operators });
    await keySharesItem.update({ ownerAddress, ownerNonce, publicKey });

    await keySharesItem.buildPayload(
      {
        publicKey,
        operators,
        encryptedShares,
      },
      {
        ownerAddress,
        ownerNonce,
        privateKey,
      }
    );

    const keyShares = new KeyShares();
    keyShares.add(keySharesItem);

    const tokenAmount = new BigNumber(5000000000000000000).toString();
    const keySharesPayload = await keyShares.toJson();

    console.log(`keysjares split!`)

    self.postMessage({
      success: true,
      data: {
        payload: JSON.parse(keySharesPayload),
        tokenAmount,
        clusterData: initialClusterData.cluster
      }
    });
  } catch (error: any) {
    self.postMessage({
      success: false,
      error: error.message
    });
  }
}; 