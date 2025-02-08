import { Address } from 'viem'
import AgentBravoGovernorABI from './abis/AgentBravoGovernor.json'
import AgentBravoDelegateFactoryABI from './abis/AgentBravoDelegateFactory.json'
import AgentBravoTokenABI from './abis/AgentBravoToken.json'

export const CHAIN_ID = 11155111 // Sepolia

export const CONTRACTS = {
  AgentBravoGovernor: {
    address: '0x0705294b11715FC2C1D231D3616D76fc07F3c8Cd' as Address,
    abi: AgentBravoGovernorABI,
  },
  AgentBravoToken: {
    address: '0x0Bb81307daEBB2Ca0A19a44c65717A3728324745' as Address,
    abi: AgentBravoTokenABI,
  },
  AgentBravoDelegateFactory: {
    address: '0x7c41063Bda9D7B2C67e655179205f074f27E11c1' as Address,
    abi: AgentBravoDelegateFactoryABI,
  },
} as const

// Type helpers
export type ContractName = keyof typeof CONTRACTS
export type ContractABI<T extends ContractName> = typeof CONTRACTS[T]['abi']
export type ContractAddress<T extends ContractName> = typeof CONTRACTS[T]['address'] 