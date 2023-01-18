import { apolloClient } from "./apolloClient";
import { gql } from "@apollo/client";

const buildQuery = ({ operatorAddress }: { operatorAddress: string }) => {
  const query = `
  query DefaultProfile {
    defaultProfile(request: { ethereumAddress: "${operatorAddress}"}) {
      id
      name
      bio
      isDefault
      attributes {
        displayType
        traitType
        key
        value
      }
      followNftAddress
      metadata
      handle
      picture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          chainId
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
      }
      coverPicture {
        ... on NftImage {
          contractAddress
          tokenId
          uri
          chainId
          verified
        }
        ... on MediaSet {
          original {
            url
            mimeType
          }
        }
      }
      ownedBy
      dispatcher {
        address
        canUseRelay
      }
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
      followModule {
        ... on FeeFollowModuleSettings {
          type
          contractAddress
          amount {
            asset {
              name
              symbol
              decimals
              address
            }
            value
          }
          recipient
        }
        ... on ProfileFollowModuleSettings {
         type
        }
        ... on RevertFollowModuleSettings {
         type
        }
      }
    }
  }
  `;
  return query;
};

export const queryOperator = async ({
  operatorAddress,
}: {
  operatorAddress: string;
}) => {
  const queryForOperator = buildQuery({ operatorAddress });
  const response = await apolloClient.query({
    query: gql(queryForOperator),
  });
  return response;
};
