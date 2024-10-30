import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  VoteStarted,
  Voted,
  Withdrawn
} from "../generated/NODLMigration/NODLMigration"

export function createVoteStartedEvent(
  proposal: Bytes,
  oracle: Address,
  user: Address,
  amount: BigInt
): VoteStarted {
  let voteStartedEvent = changetype<VoteStarted>(newMockEvent())

  voteStartedEvent.parameters = new Array()

  voteStartedEvent.parameters.push(
    new ethereum.EventParam("proposal", ethereum.Value.fromFixedBytes(proposal))
  )
  voteStartedEvent.parameters.push(
    new ethereum.EventParam("oracle", ethereum.Value.fromAddress(oracle))
  )
  voteStartedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  voteStartedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return voteStartedEvent
}

export function createVotedEvent(proposal: Bytes, oracle: Address): Voted {
  let votedEvent = changetype<Voted>(newMockEvent())

  votedEvent.parameters = new Array()

  votedEvent.parameters.push(
    new ethereum.EventParam("proposal", ethereum.Value.fromFixedBytes(proposal))
  )
  votedEvent.parameters.push(
    new ethereum.EventParam("oracle", ethereum.Value.fromAddress(oracle))
  )

  return votedEvent
}

export function createWithdrawnEvent(
  proposal: Bytes,
  user: Address,
  amount: BigInt
): Withdrawn {
  let withdrawnEvent = changetype<Withdrawn>(newMockEvent())

  withdrawnEvent.parameters = new Array()

  withdrawnEvent.parameters.push(
    new ethereum.EventParam("proposal", ethereum.Value.fromFixedBytes(proposal))
  )
  withdrawnEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  withdrawnEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return withdrawnEvent
}
