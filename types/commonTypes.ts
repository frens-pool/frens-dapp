import { Address } from "wagmi";

export type DepositsType = {
  amount: string;
};

export type PoolType = {
  contractAddress: Address;
  creator: Address;
  deposits: DepositsType[];
  poolState: String;
};

export type SsvValidator = {
  is_valid: boolean;
};
