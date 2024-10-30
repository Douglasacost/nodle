import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { VoteStarted } from "../generated/schema"
import { VoteStarted as VoteStartedEvent } from "../generated/NODLMigration/NODLMigration"
import { handleVoteStarted } from "../src/nodl-migration"
import { createVoteStartedEvent } from "./nodl-migration-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let proposal = Bytes.fromI32(1234567890)
    let oracle = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let amount = BigInt.fromI32(234)
    let newVoteStartedEvent = createVoteStartedEvent(
      proposal,
      oracle,
      user,
      amount
    )
    handleVoteStarted(newVoteStartedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("VoteStarted created and stored", () => {
    assert.entityCount("VoteStarted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "VoteStarted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "proposal",
      "1234567890"
    )
    assert.fieldEquals(
      "VoteStarted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "oracle",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "VoteStarted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "VoteStarted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
