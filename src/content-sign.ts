import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  BatchMetadataUpdate as BatchMetadataUpdateEvent,
  ClickNFT,
  MetadataUpdate as MetadataUpdateEvent,
  Transfer as TransferEvent,
} from "../generated/ClickNFT/ClickNFT";
import {
  ERC721Approval,
  ERC721ApprovalForAll,
  ERC721BatchMetadataUpdate,
  ERC721MetadataUpdate,
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

export function handleBatchMetadataUpdate(
  event: BatchMetadataUpdateEvent
): void {
  let entity = new ERC721BatchMetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._fromTokenId = event.params._fromTokenId;
  entity._toTokenId = event.params._toTokenId;

  entity.contract = event.address;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleMetadataUpdate(event: MetadataUpdateEvent): void {
  let entity = new ERC721MetadataUpdate(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity._tokenId = event.params._tokenId;

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
    token.owner = event.params.to;
    token.timestamp = event.block.timestamp;

    const contract = ClickNFT.bind(event.address);

    let tokenURI = contract.try_tokenURI(event.params.tokenId);

    if (!tokenURI.reverted) {
      token.uri = tokenURI.value;
      const strippedURI = tokenURI.value.split("ipfs://")[1];

      TokenMetadataTemplate.create(strippedURI);
    }
  } else {
    token.owner = event.params.to;
  }

  token.save();
}
