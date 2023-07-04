import { KeyShares, SSVKeys } from "ssv-keys";
import Web3 from "web3";

// The nonce of the owner within the SSV contract (increments after each validator registration), obtained using the ssv-scanner tool
const TEST_OWNER_NONCE = 1;
// The cluster owner address
const TEST_OWNER_ADDRESS = "0x81592c3de184a3e2c0dcb5a261bc107bfa91f494";

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
    const payload = await keyShares.buildPayload(
      {
        publicKey,
        operators,
        encryptedShares,
      },
      {
        ownerAddress: TEST_OWNER_ADDRESS,
        ownerNonce: TEST_OWNER_NONCE,
        privateKey,
      }
    );

    const web3 = new Web3();
    const tokenAmount = web3.utils.toBN(20000000000000000000).toString();

    const operatorFees = bodyOperators.map((operator: any) => {
      return operator.fee;
    });
    const sumOfFees: number = operatorFees.reduceRight(
      (acc: number, cur: number) => Number(acc) + Number(cur),
      0
    );
    // const tokenAmount = web3.utils.toBN(10 * sumOfFees).toString();

    res.status(200).json({
      publicKey,
      privateKey,
      encryptedShares,
      payload,
      tokenAmount,
    });

    // res.status(200).json({ ssvData });
  } catch (err) {
    res.status(451).json("likely wrong pw");
  }
}
