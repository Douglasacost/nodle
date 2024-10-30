import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Bytes, Address } from "@graphprotocol/graph-ts"
import { PeriodSet } from "../generated/schema"
import { PeriodSet as PeriodSetEvent } from "../generated/MissionPayments/MissionPayments"
import { handlePeriodSet } from "../src/mission-payments"
import { createPeriodSetEvent } from "./mission-payments-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let period = BigInt.fromI32(234)
    let newPeriodSetEvent = createPeriodSetEvent(period)
    handlePeriodSet(newPeriodSetEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("PeriodSet created and stored", () => {
    assert.entityCount("PeriodSet", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "PeriodSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "period",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
