import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Bytes, Address } from "@graphprotocol/graph-ts"
import { BatchMinted } from "../generated/schema"
import { BatchMinted as BatchMintedEvent } from "../generated/Contract/Contract"
import { handleBatchMinted } from "../src/rewards"
import { createBatchMintedEvent } from "./rewards-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let batchSum = BigInt.fromI32(234)
    let totalRewardsClaimed = BigInt.fromI32(234)
    let digest = Bytes.fromI32(1234567890)
    let newBatchMintedEvent = createBatchMintedEvent(
      batchSum,
      totalRewardsClaimed,
      digest
    )
    handleBatchMinted(newBatchMintedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BatchMinted created and stored", () => {
    assert.entityCount("BatchMinted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BatchMinted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "batchSum",
      "234"
    )
    assert.fieldEquals(
      "BatchMinted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "totalRewardsClaimed",
      "234"
    )
    assert.fieldEquals(
      "BatchMinted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "digest",
      "1234567890"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
