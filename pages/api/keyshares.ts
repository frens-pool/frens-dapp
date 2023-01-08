import { Encryption, EthereumKeyStore, Threshold } from "ssv-keys";
import { encode } from "js-base64";
import Web3 from "web3";

const operators = [
  "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBM3FncW9MMUlERWhTZ3RoMkYycUEKS3dtekhFblQrTkoxNVk5L3B0UTVBOFZpdXNtazgrbEVKcUNjYlN2YTRIZTlNQVNPWDBVU210d2tiaS9IdFVSTAp2Qi9adFE5MFZqK2NuZ2Q5KzZjY2VtNVkwMm50K3hjUFg4TStkYWYzYVVFbHZ1REtPemtxWmZXMjQxQnpCMFdtCmFlaVFlWE1QUTlSNmkzSGFrZC9KNlhyck02QmUyR0FWT0x6ZE52eUNFdFJjVjRVTXc2NzBwUDhjYldhRkVWdEoKWlBPOFc4MGx3anZkQ0NCUTBRMlppVEkySG43N1lXc01xeExVaTJNSjN6WCtPeVFvaVJ5cFpyU2FzaitTTTJaWQpXNGRPMUNRcXJHZ3pPS2JXMnFBWjBHZytrdytQeHdyOUtYRE84WGJlKytVTFhEaWFneFZmZjg5ODZCOXRUYWlaCmp3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K",
  "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBeUtVWTVEUmZZREljengzcjhVY0UKTlpFMFdIQXFuV2FIRjZYRlUydVdObjVOVE94Zkt4ZmZaLzkyeVE1citQVkJPRmQrcHhILzI2QXJVT3dNL1lBRQpRbDZ0VzBtc1FqdUtIU1Q4aUtvTDRTNUt0aDNoeTBqeFRHR1ZZaWdjWG1vRURjd2YxaG8wdWRxRmlEN3dFWXN1CmZHa2E2U1ZQNnBab1NMaU9HZFRKUWVzVDI5WEVCdDZnblhMaFB1MER2K0xsQUJJQ1pqWEFTZWtpSFVKUHRjYlgKRjZFL0lScGpkWHVNSmUyOXZDcmZudXhWWk93a1ptdzJXdGljYlNDOVJpSFRYWUQ1dnVGakZXRHNZMERHUDhzOAoyc1haVHdsNWl4dEhlUWM2N1lLRFN6YU1MNnY1VUVZblhUTzZzNHFVSWVnTXJwZjd3S0xGVWxqRTMwbnNIaVBUCjBRSURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K",
  "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBelc5VGNJMWxXbmUydkNqZzJlb2UKY3o3NnZ4OVU2QWgvTnZRT0dJY1JTbk5mUWc1amxjM0JuTUM4eW1pQTQzVHJDejl6UFVhUVozZG5idW9DZEY3awpoOWZKcVd3SFFrU2pFQ1ZtVytQS2FVWmQ4aW42cGVGbmgrZEowenR1cUx1aUlJMWQvU05xdGJUaFA2VjQ4TGxDCklsVUhXVFRaKzNVY2dBanlwenIxRmxYU2hGV0w0aGcxeXF3K0p1WW1yTnY2cGZaeWdVbTZQaTBVazVXUVZnUk4KR2RrU3BTb2ZYZERGcElWN0xBU3V0a2dGUytqVnpaL3E5bmh1ejVjNlJWaDYvV1hiZVpDbXhnMGU2R2hIVXY0bAp4SGNaSUkraWhzWk5KM3V5b2NiaWlubE5EaTNMK2hySEUxMExNeVRoN2lVSC8yd1k4MjJKMmdDSEZzNWhkVkNrCm53SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K",
  "LS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBelRDZ1hLeStWRitvOFNIdFVwT1YKcXNDSDJHSVhOUkJtS0Ixb251aUE2TnBFK3crOXFMQllQUjdDZ0p4eWxMYWFvYnNVNWhKd001K2ZKcGF3OU9XbApzSU40MGtRNU1JaXY3SVFBTUtiSnZuNmFwYWZGYXJFTjA3WjJUN2VVWDU1RWJwSC9lRXZDUzB4WjV3dklCTTJQCnpKSU5TYlVUNHR5MTNDZkFZOE5IOWcybFdiS3AzVUtuMTZpcmRMcWFmd0tjUTNtaG90K3NBSE52NTdaNWdZS3IKUGY0Q0F4b0oyT0FEVlRYUGxuOXluOGhiU084ajZJOTVHYWxiWk9lZTdGR3FMNmYrVnJrZXBLMEU5K2VFSkJTVwpoeURxcjg4dEFydlB1VWNhUEltMll0dG5sTS9pRGJNNDNnWXRHOEV1bTAvMEZZZGY5dmtJeTRZK2VmaGdPVmluCnB3SURBUUFCCi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0K",
];
const operatorIds = [91, 2, 9, 83];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  try {
    const body = JSON.parse(req.body);
    const bodyKeystore = JSON.parse(body.keystore);

    const keyStore = new EthereumKeyStore(JSON.stringify(bodyKeystore));
    const keyStorePW = body.password.toString();

    const thresholdInstance = new Threshold();
    // Get public key using the keystore password
    const privateKey = await keyStore.getPrivateKey(keyStorePW);
    const threshold = await thresholdInstance.create(privateKey, operatorIds);
    let shares = new Encryption(operators, threshold.shares).encrypt();
    // Loop through the operators RSA keys and format them as base64
    shares = shares.map((share) => {
      share.operatorPublicKey = encode(share.operatorPublicKey);
      // Return the operator key and KeyShares (sharePublicKey & shareEncrypted)
      return share;
    });
    const web3 = new Web3();
    // Get all the public keys from the shares
    const sharesPublicKeys = shares.map((share) => share.publicKey);
    // Get all the private keys from the shares and encode them as ABI parameters
    const sharesEncrypted = shares.map((share) =>
      web3.eth.abi.encodeParameter("string", share.privateKey)
    );

    // Token amount (liquidation collateral and operational runway balance to be funded)
    const tokenAmount = web3.utils.toBN(21342395400000000000).toString();
    const operatorIdsArray = Array.from(operatorIds);

    // Return all the needed params to build a transaction payload
    const ssvData = [
      threshold.validatorPublicKey,
      operatorIdsArray,
      sharesPublicKeys,
      sharesEncrypted,
      tokenAmount,
    ];

    res.status(200).json({ ssvData });
  } catch (err) {
    res.status(451).json("likely wrong pw");
  }
}
