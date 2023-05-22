import { KeyShares, SSVKeys } from "ssv-keys";
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

    const operators = bodyOperators.map((operator: any) => ({
      id: operator.id,
      publicKey: operator.public_key,
    }));

    const ssvKeys = new SSVKeys();

    const { publicKey, privateKey } = await ssvKeys.extractKeys(
      bodyKeystore,
      body.password.toString()
    );

    const encryptedShares = await ssvKeys.buildShares(privateKey, operators);

    const keyShares = new KeyShares();
    const payload = await keyShares.buildPayload({
      publicKey,
      operators,
      encryptedShares,
    });

    const web3 = new Web3();
    const tokenAmount = web3.utils.toBN(70000000000000000000).toString();

    res.status(200).json({
      publicKey,
      privateKey,
      encryptedShares,
      payload,
      tokenAmount,
    });

    // const operatorIds = bodyOperators.map((operator: any) => {
    //   return operator.id;
    // });
    // const operatorPublicKeys = bodyOperators.map((operator: any) => {
    //   return operator.public_key;
    // });
    // const operatorFees = bodyOperators.map((operator: any) => {
    //   return operator.fee;
    // });
    // const sumOfFees = operatorFees.reduce((a: any, b: any) => a + b);
    // // console.log(sumOfFees);

    // const keyStore = new EthereumKeyStore(JSON.stringify(bodyKeystore));
    // const keyStorePW = body.password.toString();

    // const ssvKeys = new SSVKeys();

    // // Get public key using the keystore password
    // const privateKey = await keyStore.getPrivateKey(keyStorePW);
    // const shares = await ssvKeys.buildShares(privateKey, bodyOperators);

    // const web3 = new Web3();
    // const tokenAmount = web3.utils.toBN(20000000000000000000).toString();

    // const payload = await ssvKeys.buildPayload(
    //   ssvKeys.validatorPublicKey,
    //   operatorIds,
    //   shares,
    //   tokenAmount
    // );

    // // Token amount (liquidation collateral and operational runway balance to be funded)
    // const operatorIdsArray = Array.from(operatorIds);

    // // Return all the needed params to build a transaction payload
    // const ssvData = [
    //   threshold.validatorPublicKey,
    //   operatorIdsArray,
    //   payload.readable.shares,
    //   tokenAmount,
    // ];

    // console.log(ssvData);

    // res.status(200).json({ ssvData });
  } catch (err) {
    res.status(451).json("likely wrong pw");
  }
}
