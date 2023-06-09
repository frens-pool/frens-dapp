export type DepositFileData = {
    pubkey: string;
    withdrawal_credentials: string;
    amount: bigint;
    signature: string;
    deposit_message_root: string;
    deposit_data_root: string;
    fork_version: string;
    network_name: string;
    deposit_cli_version: string;
};