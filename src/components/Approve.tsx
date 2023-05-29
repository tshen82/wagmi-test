import { usePrepareContractWrite, useContractWrite } from 'wagmi'
import { useAccount } from 'wagmi'
import { erc20Abi } from "abitype/test"
 
export default function Approve() {
  const { address, isConnecting, isDisconnected } = useAccount()

  const { config, error, isError } = usePrepareContractWrite({
    address: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
    abi: erc20Abi,
    functionName: 'approve',
    args:[ address as `0x${string}`, 0n]
  })
  const { data, write } = useContractWrite(config)
 
  if(!address) return null
  
  return (
    <div>
      <button disabled={!write} onClick={() => write?.()}>
        Approve
      </button>
      {isError && <div>Error: {error?.message}</div>}
    </div>
  )
}