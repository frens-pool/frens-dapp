import { EthereumKeyStore, SSVKeys } from "ssv-keys";
import Web3 from "web3";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    const body = JSON.parse(req.body);
    const bodyKeystore = JSON.parse(body.keystore);
    const bodyOperators = body.operators;
    const operatorIds = bodyOperators.map((operator: any) => {
      return operator.id;
    });
    const operatorPublicKeys = bodyOperators.map((operator: any) => {
      return operator.public_key;
    });
    const operatorFees = bodyOperators.map((operator: any) => {
      return operator.fee;
    });
    const sumOfFees = operatorFees.reduce((a: any, b: any) => a + b);
    console.log(sumOfFees);

    const keyStore = new EthereumKeyStore(JSON.stringify(bodyKeystore));
    const keyStorePW = body.password.toString();

    const ssvKeys = new SSVKeys(SSVKeys.VERSION.V3);

    // Get public key using the keystore password
    const privateKey = await keyStore.getPrivateKey(keyStorePW);
    const threshold = await ssvKeys.createThreshold(privateKey, operatorIds);
    const shares = await ssvKeys.buildShares(
      privateKey,
      operatorIds,
      operatorPublicKeys
    );

    const web3 = new Web3();
    // const tokenAmount = web3.utils.toBN(23826430000000).toString();

    const payload = await ssvKeys.buildPayload(
      ssvKeys.validatorPublicKey,
      operatorIds,
      shares,
      sumOfFees
    );

    // Token amount (liquidation collateral and operational runway balance to be funded)
    const operatorIdsArray = Array.from(operatorIds);

    // Return all the needed params to build a transaction payload
    const ssvData = [
      threshold.validatorPublicKey,
      operatorIdsArray,
      payload.readable.shares,
      sumOfFees,
    ];

    res.status(200).json({ ssvData });
  } catch (err) {
    res.status(451).json("likely wrong pw");
  }
}
