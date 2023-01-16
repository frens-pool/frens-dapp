import PocketBase, { Record } from "pocketbase";

export namespace CacheService {
  const POCKET_BASE_MAIL: string = process.env.CACHE_MAILKEY ?? "";
  const POCKET_BASE_PASSWORD: string = process.env.CACHE_PASSKEY ?? "";

  const COLLECTION_NAME: string = "poolInfos";
  const pb = new PocketBase("https://frens-cache.pockethost.io");

  export async function getShareIds(poolAddress: string): Promise<string[]> {
    const record = await getRecordByPoolAddress(poolAddress);
    if (record === undefined) return [];

    return record.shareIds;
  }

  export async function saveShareId(
    poolAddress: string,
    shareIds: string[]
  ): Promise<void> {
    const record = await getRecordByPoolAddress(poolAddress);
    if (record === undefined) {
      // Make record with data
      await pb.collection(COLLECTION_NAME).create({
        poolAddress: poolAddress,
        shareIds: shareIds,
      });
    } else {
      // Update record.
      const cachedShareIds: Set<string> = new Set(record.shareIds);
      shareIds.forEach((share) => cachedShareIds.add(share));
      await pb.collection(COLLECTION_NAME).update(record.id, {
        shareIds: Array.from(cachedShareIds),
      });
    }
  }

  async function getRecordByPoolAddress(
    poolAddress: string
  ): Promise<Record | undefined> {
    await pb.admins.authWithPassword(POCKET_BASE_MAIL, POCKET_BASE_PASSWORD);
    try {
      return await pb
        .collection(COLLECTION_NAME)
        .getFirstListItem(`poolAddress="${poolAddress}"`);
    } catch (err) {
      return undefined;
    }
  }
}
