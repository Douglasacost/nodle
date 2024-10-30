import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Bytes, Address } from "@graphprotocol/graph-ts"
import {
  BatchMinted,
  BatchSubmitterRewardSet,
  EIP712DomainChanged,
  Minted,
  PeriodSet,
  QuotaSet,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked
} from "../generated/Contract/Contract"

export function createBatchMintedEvent(
  batchSum: BigInt,
  totalRewardsClaimed: BigInt,
  digest: Bytes
): BatchMinted {
  let batchMintedEvent = changetype<BatchMinted>(newMockEvent())

  batchMintedEvent.parameters = new Array()

  batchMintedEvent.parameters.push(
    new ethereum.EventParam(
      "batchSum",
      ethereum.Value.fromUnsignedBigInt(batchSum)
    )
  )
  batchMintedEvent.parameters.push(
    new ethereum.EventParam(
      "totalRewardsClaimed",
      ethereum.Value.fromUnsignedBigInt(totalRewardsClaimed)
    )
  )
  batchMintedEvent.parameters.push(
    new ethereum.EventParam("digest", ethereum.Value.fromFixedBytes(digest))
  )

  return batchMintedEvent
}

export function createBatchSubmitterRewardSetEvent(
  bp: i32
): BatchSubmitterRewardSet {
  let batchSubmitterRewardSetEvent = changetype<BatchSubmitterRewardSet>(
    newMockEvent()
  )

  batchSubmitterRewardSetEvent.parameters = new Array()

  batchSubmitterRewardSetEvent.parameters.push(
    new ethereum.EventParam(
      "bp",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(bp))
    )
  )

  return batchSubmitterRewardSetEvent
}

export function createEIP712DomainChangedEvent(): EIP712DomainChanged {
  let eip712DomainChangedEvent = changetype<EIP712DomainChanged>(newMockEvent())

  eip712DomainChangedEvent.parameters = new Array()

  return eip712DomainChangedEvent
}

export function createMintedEvent(
  recipient: Address,
  amount: BigInt,
  totalRewardsClaimed: BigInt
): Minted {
  let mintedEvent = changetype<Minted>(newMockEvent())

  mintedEvent.parameters = new Array()

  mintedEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  mintedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  mintedEvent.parameters.push(
    new ethereum.EventParam(
      "totalRewardsClaimed",
      ethereum.Value.fromUnsignedBigInt(totalRewardsClaimed)
    )
  )

  return mintedEvent
}

export function createPeriodSetEvent(period: BigInt): PeriodSet {
  let periodSetEvent = changetype<PeriodSet>(newMockEvent())

  periodSetEvent.parameters = new Array()

  periodSetEvent.parameters.push(
    new ethereum.EventParam("period", ethereum.Value.fromUnsignedBigInt(period))
  )

  return periodSetEvent
}

export function createQuotaSetEvent(quota: BigInt): QuotaSet {
  let quotaSetEvent = changetype<QuotaSet>(newMockEvent())

  quotaSetEvent.parameters = new Array()

  quotaSetEvent.parameters.push(
    new ethereum.EventParam("quota", ethereum.Value.fromUnsignedBigInt(quota))
  )

  return quotaSetEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  previousAdminRole: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdminRole",
      ethereum.Value.fromFixedBytes(previousAdminRole)
    )
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
}
