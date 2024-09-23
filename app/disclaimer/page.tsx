"use client";

import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Address, useEnsName, useNetwork, useAccount } from "wagmi";
import { PlusSmallIcon } from "@heroicons/react/20/solid";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Header from "components/shared/Header";
import { UserPoolList } from "#/components/dashboard/UserPoolList";
import { ShareList } from "components/dashboard/ShareList";

import { useUserNfts } from "#/hooks/read/useUserNFTs";
import { useUserPools } from "#/hooks/read/useUserPools";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Dashboard: NextPage = () => {
  const { userNFTs, totalDeposit, totalClaimable } = useUserNfts();
  const { isConnected, address } = useAccount();
  const userPools = useUserPools(address as Address);
  const { chain } = useNetwork();
  const [userENS, setUserENS] = useState("");


  const { data: ensName } = useEnsName({
    address: address,
    chainId: chain?.id ?? 5,
    cacheTime: 1_000,
  });

  useEffect(() => {
    if (ensName && address) {
      setUserENS(ensName.toString());
    }
  }, [ensName, address]);


  const stats = [
    // {
    //   name: "My Pools #",
    //   value: userPools?.creates.length,
    // },
    // {
    //   name: "Pool Shares #",
    //   value: userNFTs.length,
    // },
    {
      name: "ETH Deposited",
      value: totalDeposit.toFixed(4).toString(),
    },
    {
      name: "ETH claimable",
      value: totalClaimable.toFixed(4).toString(),
    },
  ];

  // if (isConnected) {
  //   return (
  //     <div>
  //       <Header />
  //       {/* Content */}
  //       <main className="w-full pb-20 lg:pb-32">
  //             <div className="w-full flex flex-col items-start justify-start">
  //               <div className="w-full px-[8vw] pt-20 pb-8 text-black flex flex-1 flex-col items-start justify-start lg:mr-8 bg-[#F7F9FC]">
  //                 <p className="text-[10px] uppercase">disclaimer</p>

  //               </div>
  //              </div>
  //       </main>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-white" data-theme="winter">
      <Header />


      <main className="w-full pb-20 lg:pb-32">
              <div className="w-full flex flex-col items-start justify-start">
                <div className="w-full px-[8vw] pt-20 pb-8 text-black flex flex-1 flex-col items-start justify-start lg:mr-8 bg-[#F7F9FC]">
                     
      {/* <main className="relative -mt-32 ">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="bg-white min-h-[60vh] flex flex-col items-center justify-center rounded-lg py-6 shadow px-4 sm:px-6 lg:px-16"> */}
            {/* <div>disclaimer</div> */}

            <div className="project-rich-text w-richtext">
              <p><strong>Disclaimer <br />FRENS dapp</strong></p>
              <p>v-1, 23.09.2024</p>
              <p>Please read this disclaimer ("<strong>Disclaimer</strong>") carefully before accessing, interacting with, or using the set of blockchain-based smart contracts that together constitute "<strong>FRENS dapp</strong>".
                This Disclaimer relates to the use of the FRENS dapp. The use of services offered by Eguila BV is distinctly separate from the use of the FRENS dapp .</p>
              <p>The FRENS dapp is a fully on-chain, decentralized and non-custodial staking pool protocol. The FRENS dapp enables its users ("<strong>you</strong>" or "<strong>Protocol User(s)</strong>") (i) to stake Ether (ETH) with node operators ("<strong>Node Operator(s)</strong>"</p>
              <p>ALL FUNCTIONALITIES OF THE FRENS dapp ARE OF A PURELY TECHNICAL NATURE, ARE NOT ASSOCIATED WITH, AND DO NOT CONVEY ANY LEGAL CLAIM TOWARD ANY ENTITY, INDIVIDUAL, OR GROUP OF INDIVIDUALS, INCLUDING BUT NOT LIMITED TO Eguila BV, ANY DIRECTOR, EMPLOYEE, AGENT, TEAM MEMBER OR ANY OTHER THIRD-PARTY.</p>
              <p><strong>1. No legal or factual relationship</strong></p>
              <p>The FRENS dapp has been deployed and runs in a non-custodial and decentralized manner on the Ethereum network. Neither Eguila BV or any other third-party is responsible for the operation, running, or functioning of the FRENS dapp and/or any of the interactions, collaborations, or factual relationships between Protocol Users and the smart contracts of the FRENS dapp, between Protocol Users themselves, or between Protocol Users and Operators. Any use of the terms 'we', 'our' etc., is for semantic purposes only and not to be understood as an assumption of ownership or control of the FRENS dapp.</p>
              <p>The Protocol User understands, acknowledges, and agrees that:</p>
              <ul role="list">
                <li><strong>No relevant control / no relevant permissioned functions</strong>: Eguila BV has neither access to nor any other possibility to control and/or influence any transactions, deposits, and/or allocations made by the Protocol Users using the FRENS dapp. Any funds potentially placed with the FRENS dapp are in the sole control of the respective smart contracts and cannot be accessed by Eguila BV. There is no operational dependency of the FRENS dapp on Eguila BV.</li>
                <li><strong>Third Party Services and Materials: </strong>The FRENS dapp may integrate and rely on the functioning of third-party services and technologies, such as the Ethereum network, third-party digital wallets, and other external protocols (collectively, "<strong>Third Party Services</strong>"), as well as third party content, data, information, applications, materials, or may provide links to third-party websites (collectively, "<strong>Third Party Materials</strong>"). By using the FRENS dapp, you acknowledge that the functionality, reliability and compatibility of Third Party Services and Third Party Materials may be essential to the functioning of the FRENS dapp and you assume any and all responsibility for the use of such Third Party Services and Third Party Materials. </li>
                <li><strong>Restaking rewards</strong>: By using the FRENS dapp and subject to the programmatic logic of the FRENS dapp and any integrated Third Party Services (such as the Ethereum staking mechanism), Protocol Users may earn network fees and token rewards from Third Party Services through interactions such as participating in the network consensus mechanism. Any such rewards are a direct compensation for services provided by the Protocol User. Eguila BV has no control over any such rewards (including the amount of such rewards paid to Protocol Users) and such rewards do not originate from / are not intermediated or forwarded by Eguila BV.</li>
                <li><strong>No partnership</strong>: Protocol Users do not agree to and do not state their will to enter into or create a simple partnership, joint venture, or similar sort of legal or factual partnership by accessing or using the FRENS dapp, by holding the FRENS NFT, and/or interacting with the FRENS dapp in any other way.</li>
                <li><strong>Release of claims</strong>: By accessing or using the FRENS dapp, you hereby, to the maximum extent permissible under applicable law, release all present and future claims against Eguila BV, and against any individual or group of project team member or contributors related to your use of the FRENS dapp, the FRENS dapp governance mechanism, and any other facet of the FRENS dapp.</li>
                <li><strong>Open source license</strong>: The FRENS dapp has been developed and published under the MIT open-source license, which forms an integral part of this Disclaimer. </li></ul><p><strong>2. No liability</strong></p>
              <p>Eguila BV HAS NOT AND WILL NOT ENTER INTO ANY LEGAL OR FACTUAL RELATIONSHIP WITH ANY PROTOCOL USER OF THE FRENS dapp. Eguila BV IS, THEREFORE, NOT LIABLE TO ANY PROTOCOL USER FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE, IN CONNECTION WITH THE USE OR INABILITY TO USE THE FRENS dapp (INCLUDING BUT NOT LIMITED TO LOSS OF ETH OR ANY OTHER DIGITAL ASSET OR TOKEN, GOVERNANCE DECISIONS TAKEN, LOSS OF DATA, BUSINESS INTERRUPTION, DATA BEING RENDERED INACCURATE OR OTHER LOSSES SUSTAINED BY A PROTOCOL USER OR THIRD-PARTIES RELATED TO THE FRENS dapp AND/OR ANY ACTIVITY OF A FRONTEND OPERATOR OR A FAILURE OF THE FRENS dapp TO OPERATE WITH ANY OTHER SOFTWARE) OR ANY THIRD PARTY SERVICES OR THIRD PARTY MATERIAL.</p>
              <p><strong>3. Assumption of risks</strong></p>
              <p>The Protocol User understands and acknowledges that the FRENS dapp, in particular, and smart contracts, blockchains, cryptographic tokens, and related systems and software, in general, are nascent, experimental, inherently risky, and subject to change. In order to understand the risks associated with using the FRENS dapp, as well as any other blockchain-based technology, you are strongly encouraged to get acquainted with the underlying protocols as much as possible.</p>
              <p>The following list contains some of the risks associated with the use of the FRENS dapp, without being exhaustive:</p>
              <ul role="list">
                <li>THE FRENS dapp IS DEPLOYED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT.</li>
                <li>THE FRENS dapp IS HIGHLY EXPERIMENTAL, AND ANY DIGITAL ASSETS OR TOKENS (INCLUDING, BUT NOT LIMITED TO, ETH) USED IN CONNECTION WITH THE FRENS dapp ARE AT RISK OF BEING LOST INDEFINITELY, WITHOUT ANY KIND OF CONSIDERATION. </li>
                <li>Although the FRENS dapp has been security-audited prior to its deployment, THERE IS A HIGH RISK THAT THE FRENS dapp MAY CONTAIN BUGS, DEFECTS, OR ERRORS THAT MATERIALLY AND ADVERSELY AFFECT THE USE, FUNCTIONALITY, OR PERFORMANCE OF THE FRENS dapp OR ANY OTHER PROTOCOL, APPLICATION, OR SERVICE CONTAINING OR USED IN CONNECTION WITH THE FRENS dapp OR THAT THE FRENS dapp MAY BE HACKED BY THIRD-PARTIES, POTENTIALLY LEADING TO ADVERSE EFFECTS ON STAKED ASSETS OR THE INDEFINITE LOSS OF ANY DIGITAL ASSETS OR TOKENS PLACED WITH THE FRENS dapp.</li>
                <li>The FRENS dapp is built on the Ethereum network and may make use of other DeFi applications or services, including but not limited to services of Validators. As such, the proper functioning of the FRENS dapp is dependent on the proper functioning of the underlying and/or incorporated protocols. </li>
                <li>Any transaction done on the FRENS dapp requires the Protocol User to pay gas fees on the Ethereum network (or other networks). The cost of transactions on the Ethereum network (or related blockchain networks) is variable and may increase or decrease at any time causing impact to any activities taking place on the Ethereum network.</li>
                <li>Placing transactions, including staking Ether, on the FRENS dapp may carry substantial financial risks. Tokens, and any transactions done with tokens, are by nature highly experimental, risky, complex and challenging to understand, and volatile. Transactions entered in connection with the FRENS dapp are irreversible, final and there are no refunds. Any Protocol User understands, acknowledges, and agrees that any transactions entered in connection with the &nbsp;FRENS dapp are unsolicited and solely initiated, and their outcome is solely born by the Protocol User. The risk of loss in transactions with tokens in connection with the FRENS dapp may be substantial, up to a complete loss. Any Protocol User should, therefore, carefully consider whether entering into such transactions is suitable in light of their circumstances, financial background, and financial resources. Any Protocol User entering into a transaction in connection with the FRENS dapp represents and warrants that they have been, are, and will be solely responsible for marking their independent appraisal, investigations, and research into the risks of any given transaction and that they have sufficient knowledge, market sophistication, access and use of professional advice, and overall experience to make a thorough evaluation of the merits and risks involved. Nobody is responsible or liable for any financial loss or injury sustained from entering into any transactions in connection with the FRENS dapp.</li>
                <li>There are a number of risks associated with holding cryptographic tokens, using blockchain technology, and staking tokens. Such risks include but are not limited to, risk of losing access to tokens due to slashing, loss of private key(s), custodial error or purchaser error, risk of blockchain attacks, risk of hacking and security weaknesses. </li>
                <li>The Protocol User understands, acknowledges, and agrees that the NFT represent their staked position with the FRENS dapp and that the NFT token(s) (i) do not confer or represent any right of any form, including but not limited to any equity or ownership, voting, distribution, redemption, liquidation, intellectual property, participation, or any sort of right to receive future revenues, profit shares, or similar, (ii) do not create or confer any enforceable contractual or other legal obligations against any person or entity (including, but not limited to, Eguila BV, any individual or group of project team members, contributors, or Frens NFT Holders, and similar persons associated in any way with the FRENS dapp, and (iii) are not any kind of loan, investment, or other form of participation in Eguila BV or the FRENS dapp.</li>
                <li>The FRENS dapp is non-custodial. The Protocol User is solely responsible for implementing reasonable measures to secure access to the wallet solution (i.e., private key(s) or other credentials) used to interact with FRENS dapp or staked Ether. </li>
                <li>The FRENS dapp could be impacted by one or more regulatory inquiries or regulatory actions, which could impede or limit the availability of the FRENS dapp and your continued use of the FRENS dapp. The FRENS dapp has not been reviewed, registered, approved, or licensed by any regulatory agency or authority.</li>
                <li>Further risks associated with the use of the FRENS dapp may include but are not limited to, risks of software weakness (of the underlying blockchain infrastructure or any protocol or any other software), risks associated with uncertain laws and regulations, risk of abandonment, lack of success or business failure, speculation risk, risks associated with other applications, risks associated with markets for the cryptographic tokens, risk of losing access to cryptographic tokens due to loss of private key(s), custodial errors or errors of the Protocol User, risks of hacking, theft and vulnerabilities, risks of mining or validation attacks, risks of incompatible wallet services, risks of hard forks, risk of uninsured losses, risks arising from taxation, risks of an unfavorable fluctuation of currency value, risk of dissolution of the network, risk arising from lack of legal rights, risk associated with third-parties, jurisdiction related risks and/or any unanticipated risks. Any and all of these risks could disrupt the underlying technologies and result in a total loss of cryptographic assets, their market value, or any digital funds. The Protocol User is solely responsible for the safekeeping of the private key or other credentials associated with the blockchain address used to interact with the FRENS dapp. ANY PROTOCOL USER THAT IS NOT COMFORTABLE ASSUMING ANY AND ALL RISKS RELATED TO THE ACCESS AND USE OF THE FRENS dapp OR ENGAGING IN TRANSACTIONS THAT RELY ON SMART CONTRACTS, DIGITAL ASSETS AND CRYPTOGRAPHIC TOKENS, AND OTHER EXPERIMENTAL TECHNOLOGY SHOULD NOT DO SO. </li>
              </ul><p>‍</p></div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
