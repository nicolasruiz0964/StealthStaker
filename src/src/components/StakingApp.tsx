import { useState, useMemo } from 'react';
import { Contract } from 'ethers';
import { useAccount, useReadContract } from 'wagmi';

import { useEthersSigner } from '../hooks/useEthersSigner';
import { useZamaInstance } from '../hooks/useZamaInstance';
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contracts';
import { Header } from './Header';
import '../styles/StakingApp.css';

const ZERO_HANDLE = '0x0000000000000000000000000000000000000000000000000000000000000000';

type DecryptedBalances = {
  wallet: bigint;
  staked: bigint;
  total: bigint;
};

export function StakingApp() {
  const { address } = useAccount();
  const signerPromise = useEthersSigner();
  const { instance, isLoading: zamaLoading, error: zamaError } = useZamaInstance();

  const [faucetAmount, setFaucetAmount] = useState('1000');
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [decryptedBalances, setDecryptedBalances] = useState<DecryptedBalances | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);

  const walletQuery = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'confidentialBalanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  const stakedQuery = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getStakedBalance',
    args: address ? [address] : undefined,
    query: {
      enabled: Boolean(address),
    },
  });

  const totalStakedQuery = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getTotalStaked',
    query: {
      enabled: Boolean(address),
    },
  });

  const encryptedHandles = useMemo(() => {
    return {
      wallet: walletQuery.data ?? ZERO_HANDLE,
      staked: stakedQuery.data ?? ZERO_HANDLE,
      total: totalStakedQuery.data ?? ZERO_HANDLE,
    };
  }, [walletQuery.data, stakedQuery.data, totalStakedQuery.data]);

  const refreshBalances = async () => {
    setDecryptedBalances(null);
    await Promise.all([walletQuery.refetch(), stakedQuery.refetch(), totalStakedQuery.refetch()]);
  };

  const resolveSigner = async () => {
    const signer = await signerPromise;
    if (!signer) {
      throw new Error('Wallet signer is not available');
    }
    return signer;
  };

  const handleFaucet = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);

    if (!address) {
      setErrorMessage('Connect your wallet before requesting faucet tokens.');
      return;
    }

    const parsedAmount = Number(faucetAmount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage('Enter a faucet amount greater than zero.');
      return;
    }

    try {
      setIsProcessing(true);
      setStatusMessage('Submitting faucet transaction...');
      const signer = await resolveSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const tx = await contract.faucet(address, parsedAmount);
      await tx.wait();
      setStatusMessage('Faucet transaction confirmed.');
      await refreshBalances();
    } catch (error) {
      console.error('Faucet failed:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to request faucet tokens.');
    } finally {
      setIsProcessing(false);
    }
  };

  const encryptAmount = async (amount: number) => {
    if (!instance) {
      throw new Error('Encryption service is not ready yet.');
    }
    if (!address) {
      throw new Error('Connect your wallet to encrypt values.');
    }

    const buffer = instance.createEncryptedInput(CONTRACT_ADDRESS, address);
    buffer.add64(BigInt(amount));
    return buffer.encrypt();
  };

  const handleStake = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);

    if (!address) {
      setErrorMessage('Connect your wallet before staking.');
      return;
    }

    const parsedAmount = Number(stakeAmount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage('Enter a stake amount greater than zero.');
      return;
    }

    try {
      setIsProcessing(true);
      setStatusMessage('Encrypting stake amount...');
      const encrypted = await encryptAmount(parsedAmount);
      const signer = await resolveSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setStatusMessage('Submitting stake transaction...');
      const tx = await contract.stake(encrypted.handles[0], encrypted.inputProof);
      await tx.wait();
      setStatusMessage('Stake transaction confirmed.');
      setStakeAmount('');
      await refreshBalances();
    } catch (error) {
      console.error('Stake failed:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to stake tokens.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUnstake = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);

    if (!address) {
      setErrorMessage('Connect your wallet before unstaking.');
      return;
    }

    const parsedAmount = Number(unstakeAmount);
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage('Enter an unstake amount greater than zero.');
      return;
    }

    try {
      setIsProcessing(true);
      setStatusMessage('Encrypting unstake amount...');
      const encrypted = await encryptAmount(parsedAmount);
      const signer = await resolveSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      setStatusMessage('Submitting unstake transaction...');
      const tx = await contract.unstake(encrypted.handles[0], encrypted.inputProof);
      await tx.wait();
      setStatusMessage('Unstake transaction confirmed.');
      setUnstakeAmount('');
      await refreshBalances();
    } catch (error) {
      console.error('Unstake failed:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to unstake tokens.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecryptBalances = async () => {
    setErrorMessage(null);
    setIsDecrypting(true);

    if (!address) {
      setErrorMessage('Connect your wallet to decrypt balances.');
      setIsDecrypting(false);
      return;
    }
    if (!instance) {
      setErrorMessage('Encryption service is not ready yet.');
      setIsDecrypting(false);
      return;
    }

    try {
      const handles = [] as Array<{ handle: string; contractAddress: string }>;
      if (encryptedHandles.wallet !== ZERO_HANDLE) {
        handles.push({ handle: encryptedHandles.wallet, contractAddress: CONTRACT_ADDRESS });
      }
      if (encryptedHandles.staked !== ZERO_HANDLE) {
        handles.push({ handle: encryptedHandles.staked, contractAddress: CONTRACT_ADDRESS });
      }
      if (encryptedHandles.total !== ZERO_HANDLE) {
        handles.push({ handle: encryptedHandles.total, contractAddress: CONTRACT_ADDRESS });
      }

      if (handles.length === 0) {
        setDecryptedBalances({ wallet: 0n, staked: 0n, total: 0n });
        setIsDecrypting(false);
        return;
      }

      const keypair = instance.generateKeypair();
      const startTimestamp = Math.floor(Date.now() / 1000).toString();
      const durationDays = '7';
      const contractAddresses = [CONTRACT_ADDRESS];

      const eip712 = instance.createEIP712(
        keypair.publicKey,
        contractAddresses,
        startTimestamp,
        durationDays
      );

      const signer = await resolveSigner();
      const signature = await signer.signTypedData(
        eip712.domain,
        { UserDecryptRequestVerification: eip712.types.UserDecryptRequestVerification },
        eip712.message
      );

      const result = await instance.userDecrypt(
        handles,
        keypair.privateKey,
        keypair.publicKey,
        signature.replace('0x', ''),
        contractAddresses,
        address,
        startTimestamp,
        durationDays
      );

      const wallet = encryptedHandles.wallet === ZERO_HANDLE ? 0n : BigInt(result[encryptedHandles.wallet] || '0');
      const staked = encryptedHandles.staked === ZERO_HANDLE ? 0n : BigInt(result[encryptedHandles.staked] || '0');
      const total = encryptedHandles.total === ZERO_HANDLE ? 0n : BigInt(result[encryptedHandles.total] || '0');

      setDecryptedBalances({ wallet, staked, total });
    } catch (error) {
      console.error('Failed to decrypt balances:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to decrypt balances.');
    } finally {
      setIsDecrypting(false);
    }
  };

  return (
    <div className="staking-app">
      <Header />
      <main className="staking-main">
        <section className="staking-card">
          <div className="card-header">
            <h2 className="card-title">Balances</h2>
            <button
              onClick={handleDecryptBalances}
              className="primary-button"
              disabled={!address || isDecrypting || zamaLoading}
            >
              {isDecrypting ? 'Decrypting...' : 'Decrypt Balances'}
            </button>
          </div>
          <p className="card-description">
            Balances are stored as encrypted handles. Use the decrypt button to view your amounts locally.
          </p>
          <div className="handle-grid">
            <div className="handle-item">
              <span className="handle-label">Wallet handle</span>
              <code className="handle-value">{encryptedHandles.wallet}</code>
            </div>
            <div className="handle-item">
              <span className="handle-label">Staked handle</span>
              <code className="handle-value">{encryptedHandles.staked}</code>
            </div>
            <div className="handle-item">
              <span className="handle-label">Total staked handle</span>
              <code className="handle-value">{encryptedHandles.total}</code>
            </div>
          </div>
          <div className="balance-grid">
            <div className="balance-item">
              <span className="balance-label">Wallet</span>
              <span className="balance-value">
                {decryptedBalances ? `${decryptedBalances.wallet.toString()} tZama` : '***'}
              </span>
            </div>
            <div className="balance-item">
              <span className="balance-label">Staked</span>
              <span className="balance-value">
                {decryptedBalances ? `${decryptedBalances.staked.toString()} tZama` : '***'}
              </span>
            </div>
            <div className="balance-item">
              <span className="balance-label">Total Staked</span>
              <span className="balance-value">
                {decryptedBalances ? `${decryptedBalances.total.toString()} tZama` : '***'}
              </span>
            </div>
          </div>
        </section>

        <section className="staking-card">
          <h2 className="card-title">Claim Test Tokens</h2>
          <p className="card-description">
            Mint confidential tZama tokens directly to your connected wallet for staking.
          </p>
          <form className="form" onSubmit={handleFaucet}>
            <label className="form-label">
              Amount
              <input
                type="number"
                min="1"
                step="1"
                value={faucetAmount}
                onChange={(event) => setFaucetAmount(event.target.value)}
                className="form-input"
              />
            </label>
            <button type="submit" className="primary-button" disabled={isProcessing || !address}>
              {isProcessing ? 'Processing...' : 'Mint Tokens'}
            </button>
          </form>
        </section>

        <div className="action-grid">
          <section className="staking-card">
            <h2 className="card-title">Stake tZama</h2>
            <p className="card-description">
              Encrypt the amount locally before sending it on-chain. Only you and the contract can access it.
            </p>
            <form className="form" onSubmit={handleStake}>
              <label className="form-label">
                Amount to stake
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={stakeAmount}
                  onChange={(event) => setStakeAmount(event.target.value)}
                  className="form-input"
                />
              </label>
              <button
                type="submit"
                className="primary-button"
                disabled={isProcessing || !address || zamaLoading}
              >
                {isProcessing ? 'Processing...' : zamaLoading ? 'Loading Zama...' : 'Stake'}
              </button>
            </form>
          </section>

          <section className="staking-card">
            <h2 className="card-title">Unstake tZama</h2>
            <p className="card-description">
              Withdraw your encrypted stake back into your wallet using the same confidential flow.
            </p>
            <form className="form" onSubmit={handleUnstake}>
              <label className="form-label">
                Amount to unstake
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={unstakeAmount}
                  onChange={(event) => setUnstakeAmount(event.target.value)}
                  className="form-input"
                />
              </label>
              <button
                type="submit"
                className="primary-button"
                disabled={isProcessing || !address || zamaLoading}
              >
                {isProcessing ? 'Processing...' : zamaLoading ? 'Loading Zama...' : 'Unstake'}
              </button>
            </form>
          </section>
        </div>

        {(statusMessage || errorMessage || zamaError) && (
          <div className="feedback">
            {statusMessage && <p className="feedback-success">{statusMessage}</p>}
            {(errorMessage || zamaError) && (
              <p className="feedback-error">{errorMessage ?? zamaError}</p>
            )}
          </div>
        )}

        {!address && (
          <div className="feedback">
            <p className="feedback-warning">Connect your wallet to access faucet and staking actions.</p>
          </div>
        )}
      </main>
    </div>
  );
}
