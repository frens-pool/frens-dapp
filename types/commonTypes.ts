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

export type SsvValidatorType = {
  is_valid: boolean;
};

export type SsvOperatorType = {
  id: number;
  checked: boolean;
  name: string;
  is_active: number;
  performance: any;
  fee: number;
  validators_count: number;
  address_whitelist: string;
};
