/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-plusplus */
import Sha256 from 'crypto-js/sha256';

interface BlockData {
  timestamp: number;
  lastHash: string;
  hash: string;
  data: any;
  nonce: number;
  difficulty: number;
}

const DIFFICULTY = 3;
const MINE_RATE = 100000;

export default class Block {
  timestamp: number;

  lastHash: string;

  hash: string;

  data: any;

  nonce: number;

  difficulty: number;

  constructor({
    timestamp,
    lastHash,
    hash,
    data,
    nonce,
    difficulty,
  }: BlockData) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  // creates the very first block, first block always dummy
  static genesis(): Block {
    return new this({
      timestamp: Date.now(),
      lastHash: '-----------',
      hash: 'genesis_hash',
      data: [],
      nonce: 0,
      difficulty: 2,
    });
  }

  // creates a new block
  static mineBlock(lasblock: Block, data: any): Block {
    // const timestamp = Date.now();
    //
    // const lastHash = lasblock.hash;
    // const hash = Block.hash(timestamp, lastHash, data);
    // const nonce = 0;
    let hash;
    let timestamp;
    const lastHash = lasblock.hash;
    let { difficulty } = lasblock;
    let nonce = 0;
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty(lasblock, timestamp);
      hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
      // checking if we have the required no of leading number of zeros
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));
    return new this({
      data,
      difficulty,
      hash,
      lastHash,
      nonce,
      timestamp,
    });
  }

  static adjustDifficulty(lastBlock: Block, currentTime: number): number {
    let { difficulty } = lastBlock;
    difficulty =
      lastBlock.timestamp + MINE_RATE > currentTime
        ? difficulty + 1
        : difficulty - 1;
    return difficulty;
  }

  static hash(
    timestamp: number,
    lastHash: string,
    data: any,
    nonce: number,
    difficulty: number,
  ): string {
    return Sha256(
      `${timestamp}${lastHash}${data}${nonce}${difficulty}`,
    ).toString();
  }

  public toString(): string | null {
    return `Block -
    Timestamp : ${this.timestamp}
    Last Hash : ${this.lastHash.substring(0, 10)}
    Hash      : ${this.hash.substring(0, 10)}
    Data      : ${this.data}
    Nonce     : ${this.nonce}
    Difficulty: ${this.difficulty};
    `;
  }

  static blockHash(block: Block): string {
    const { timestamp, lastHash, data, difficulty, nonce } = block;
    return Block.hash(timestamp, lastHash, data, difficulty, nonce);
  }
}
