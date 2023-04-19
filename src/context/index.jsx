import React, { useContext, createContext } from "react";

import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();
export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0x647511D3B251151b9952a09878D1ae1Bf9825771');
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async (form) => {
        try {
            const data = await createCampaign([
                address, // owner
                form.title, // title
                form.description, // description
                form.target,
                new Date(form.deadline).getTime(), // deadline,
                form.image
              ])
        }catch(error){
        console.log("contract call failure", error)

        }
    }
    return (
        <StateContext.Provider
          value={{ 
            address,
            contract,
            connect,
            createCampaign: publishCampaign,
            // getCampaigns,
            // getUserCampaigns,
            // donate,
            // getDonations
          }}
        >
          {children}
        </StateContext.Provider>
    )
};
export const useStateContext = () => useContext(StateContext);