import { ISharesKeyPairs, SSVKeys } from "ssv-keys";

const keyStoreObject = {
  crypto: {
    kdf: {
      function: "scrypt",
      params: {
        dklen: 32,
        n: 262144,
        r: 8,
        p: 1,
        salt: "d888055f25a2ea44d31a93f5cd8a39a7aed9d5e6e2cb4cd10f8fb806e4c35033",
      },
      message: "",
    },
    checksum: {
      function: "sha256",
      params: {},
      message:
        "54fc108908c780cdfff72b70cdfce5abec26528e1cf922988d5abbfc30e80d2f",
    },
    cipher: {
      function: "aes-128-ctr",
      params: { iv: "aece0ba2dc220f51044fec78d24d295b" },
      message:
        "fad4c2b629df513fa75a1b59bc46d08fe42decb2d40ea5ccac4e3f6296c44525",
    },
  },
  description: "",
  pubkey:
    "95c3654209a51bf8ba2f7616df9e1fd94c965755ab0770ffaf178dc09e661131b71ee55df38db3a29f67b9e5379deeda",
  path: "m/12381/3600/0/0/0",
  uuid: "7e61717c-5feb-402f-bd60-8682002b2291",
  version: 4,
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const body = JSON.parse(req.body);
  console.log(req.body);

  const ssvKeys = new SSVKeys();

  const privateKey = await ssvKeys
    .getPrivateKeyFromKeystoreData(JSON.stringify(keyStoreObject), "dummy123")
    .then((result) => {
      return result;
    });
  res.status(200).json({ privateKey });
}
