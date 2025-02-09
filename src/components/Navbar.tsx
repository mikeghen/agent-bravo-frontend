import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useReadContract, useAccount } from 'wagmi';
import { CONTRACTS } from "@/config/contracts";

const Navbar = () => {
  const { address } = useAccount();
  const [isOpen, setIsOpen] = useState(false);

  const { data: balanceData } = useReadContract({
    address: CONTRACTS.AgentBravoToken.address,
    abi: CONTRACTS.AgentBravoToken.abi,
    functionName: "balanceOf",
    args: [address],
  });

  const formattedBalance = balanceData ? (Number(balanceData) / 1e18).toString() : "0";

  return (
    <nav className="fixed w-full bg-background/80 backdrop-blur-md z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-semibold gradient-text">
              Agent Bravo
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/agents" className="text-gray-400 hover:text-primary transition-colors">
              My Agents
            </Link>
            <Link to="/proposals" className="text-gray-400 hover:text-primary transition-colors">
              Proposals
            </Link>
            <div className="ml-4 flex items-center gap-4">
              {address && (
                <div className="p-2 rounded-lg border border-green-300/30">
                  <p>
                    <span className="text-white">{formattedBalance}</span>{" "}
                    <span className="gradient-text">BRAVO</span>
                  </p>
                </div>
              )}
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  mounted,
                }) => {
                  const ready = mounted;
                  const connected = ready && account && chain;

                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        style: {
                          opacity: 0,
                          pointerEvents: 'none',
                          userSelect: 'none',
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <button
                              onClick={openConnectModal}
                              className="inline-flex items-center px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors neon-border"
                            >
                              Connect Wallet
                            </button>
                          );
                        }

                        return (
                          <div className="flex items-center gap-4">
                            <button
                              onClick={openChainModal}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/80 text-primary border border-primary/30 hover:border-primary/50 transition-colors"
                            >
                              {chain.hasIcon && (
                                <div className="w-5 h-5">
                                  {chain.iconUrl && (
                                    <img
                                      alt={chain.name ?? 'Chain icon'}
                                      src={chain.iconUrl}
                                      className="w-5 h-5"
                                    />
                                  )}
                                </div>
                              )}
                              {chain.name}
                            </button>

                            <button
                              onClick={openAccountModal}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/80 text-primary border border-primary/30 hover:border-primary/50 transition-colors"
                            >
                              {account.displayName}
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/90 backdrop-blur-md border-b border-white/10">
            <Link
              to="/agents"
              className="block px-3 py-2 text-gray-400 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              My Agents
            </Link>
            <Link
              to="/proposals"
              className="block px-3 py-2 text-gray-400 hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Proposals
            </Link>
            {address && (
              <div className="px-3 py-2">
                <div className="p-2 rounded-lg border border-green-300/30">
                  <p>
                    <span className="text-white">{formattedBalance}</span>{" "}
                    <span className="gradient-text">BRAVO</span>
                  </p>
                </div>
              </div>
            )}
            <div className="px-3 py-2">
              <ConnectButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
