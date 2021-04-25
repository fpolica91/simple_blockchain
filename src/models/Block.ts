import Sha256 from 'crypto-js/sha256';

interface BlockData {
  timestamp: Date;
  lastHash: string;
  hash: string;
  data: any;
}

export default class Block {
  timestamp: Date;

  lastHash: string;

  hash: string;

  data: any;

  constructor({ timestamp, lastHash, hash, data }: BlockData) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  // creates the very first block, first block always dummy
  static genesis(): Block {
    return new this({
      timestamp: new Date(Date.now()),
      lastHash: '-----------',
      hash: 'genesis_hash',
      data: [],
    });
  }

  // creates a new block
  static mineBlock(lasblock: Block, data: any): Block {
    const timestamp = new Date(Date.now());

    const lastHash = lasblock.hash;
    const hash = Block.hash(timestamp, lastHash, data);
    const block = new this({
      timestamp,
      lastHash,
      hash,
      data,
    });
    return block;
  }

  static hash(timestamp: Date, lastHash: string, data: any): string {
    return Sha256(`${timestamp}${lastHash}${data}`).toString();
  }

  public toString(): string | null {
    return `Block -
    Timestamp : ${this.timestamp}
    Last Hash : ${this.lastHash.substring(0, 10)}
    Hash      : ${this.hash.substring(0, 10)}
    Data      : ${this.data}`;
  }

  static blockHash(block: Block): string {
    const { timestamp, lastHash, data } = block;
    return Block.hash(timestamp, lastHash, data);
  }
}
