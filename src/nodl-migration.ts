import {
  VoteStarted as VoteStartedEvent,
  Voted as VotedEvent,
  Withdrawn as WithdrawnEvent,
} from "../generated/NODLMigration/NODLMigration"
import { VoteStarted, Voted, Withdrawn } from "../generated/schema"

export function handleVoteStarted(event: VoteStartedEvent): void {
  let entity = new VoteStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.proposal = event.params.proposal
  entity.oracle = event.params.oracle
  entity.user = event.params.user
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleVoted(event: VotedEvent): void {
  let entity = new Voted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.proposal = event.params.proposal
  entity.oracle = event.params.oracle

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawn(event: WithdrawnEvent): void {
  let entity = new Withdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.proposal = event.params.proposal
  entity.user = event.params.user
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
