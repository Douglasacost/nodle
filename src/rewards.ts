import {
  BatchMinted as BatchMintedEvent,
  BatchSubmitterRewardSet as BatchSubmitterRewardSetEvent,
  EIP712DomainChanged as EIP712DomainChangedEvent,
  Minted as MintedEvent,
  PeriodSet as PeriodSetEvent,
  QuotaSet as QuotaSetEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
} from "../generated/Contract/Contract"
import {
  BatchMinted,
  BatchSubmitterRewardSet,
  EIP712DomainChanged,
  Minted,
  PeriodSet,
  QuotaSet,
  RewardsRoleAdminChanged,
  RewardsRoleGranted,
  RewardsRoleRevoked,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
} from "../generated/schema"

export function handleBatchMinted(event: BatchMintedEvent): void {
  let entity = new BatchMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.batchSum = event.params.batchSum
  entity.totalRewardsClaimed = event.params.totalRewardsClaimed
  entity.digest = event.params.digest

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBatchSubmitterRewardSet(
  event: BatchSubmitterRewardSetEvent,
): void {
  let entity = new BatchSubmitterRewardSet(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.bp = event.params.bp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleEIP712DomainChanged(
  event: EIP712DomainChangedEvent,
): void {
  let entity = new EIP712DomainChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMinted(event: MintedEvent): void {
  let entity = new Minted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.recipient = event.params.recipient
  entity.amount = event.params.amount
  entity.totalRewardsClaimed = event.params.totalRewardsClaimed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePeriodSet(event: PeriodSetEvent): void {
  let entity = new PeriodSet(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.period = event.params.period

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleQuotaSet(event: QuotaSetEvent): void {
  let entity = new QuotaSet(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.quota = event.params.quota

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RewardsRoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role
  entity.previousAdminRole = event.params.previousAdminRole
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RewardsRoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RewardsRoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
