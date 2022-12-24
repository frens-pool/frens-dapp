import { apolloClient } from './apolloClient';
import { gql } from '@apollo/client'

const buildQuery = ({ lensHandle }) => {
  const query = `
    query Profile {
      profile(request: { handle: "${lensHandle}" }) {
        id
        name
        bio
        attributes {
          displayType
          traitType
          key
          value
        }
        followNftAddress
        metadata
        isDefault
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
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
            amount {
              asset {
                symbol
                name
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
  `
  return query;
} 

export const queryOperator = async (ensName) => {
  // const tempConstantENS = "heeckhau.eth";
  const lensHandle = ensName?.replace(new RegExp(".eth$"), '.lens');
  const queryForOperator = buildQuery({ lensHandle });
  const response = await apolloClient.query({
    query: gql(queryForOperator),
  })
  // console.log('Lens example data: ', response)
  return response;
}