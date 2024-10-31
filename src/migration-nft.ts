import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  MigrationNFT,
  Transfer as TransferEvent,
} from "../generated/MigrationNFT/MigrationNFT";
import {
  ERC721Approval,
  ERC721ApprovalForAll,
  ERC721Token,
  ERC721Transfer,
} from "../generated/schema";
import { TokenMetadata as TokenMetadataTemplate } from "../generated/templates";

export function handleApproval(event: ApprovalEvent): void {
  let entity = new ERC721Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.approved = event.params.approved;
  entity.tokenId = event.params.tokenId;

  entity.contract = event.address;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ERC721ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.operator = event.params.operator;
  entity.approved = event.params.approved;

  entity.contract = event.address;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new ERC721Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.tokenId = event.params.tokenId;

  entity.contract = event.address;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  // check for token existence
  let token = ERC721Token.load(
    event.address.concatI32(event.params.tokenId.toI32())
  );

  if (token == null) {
    token = new ERC721Token(
      event.address.concatI32(event.params.tokenId.toI32())
    );
    token.identifier = event.params.tokenId;
    token.owner = event.params.to.toHexString();
    token.timestamp = event.block.timestamp;
    token.contract = event.address;
    token.transactionHash = event.transaction.hash;

    const contract = MigrationNFT.bind(event.address);

    let tokenURI = contract.try_tokenURI(event.params.tokenId);

    if (!tokenURI.reverted) {
      const strippedURI = tokenURI.value.split("ipfs://")[1];
      token.uri = tokenURI.value;
      token.ipfsURI = strippedURI;
      
      TokenMetadataTemplate.create(strippedURI);
    }
  } else {
    token.owner = event.params.to.toHexString();
  }

  token.save();
}
