/* eslint-disable no-plusplus */
import Block from './Block';

export default class BlockChain {
  chain: Block[];

  constructor() {
    this.chain = [Block.genesis()];
  }

  public addBlock(data: any): Block {
    const last_block = this.chain[this.chain.length - 1];
    const block = Block.mineBlock(last_block, data);
    this.chain.push(block);
    return block;
  }

  public replaceChain(newChain: Block[]): string {
    if (newChain.length <= this.chain.length) {
      return '';
    }
    if (!this.isChainValid(newChain)) {
      return '';
    }
    console.info('Replacing the current chain with new chain');
    this.chain = newChain;
    return '';
  }

  public isChainValid(chain: Block[]): boolean {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }
    for (let i = 1; i < chain.length; i++) {
      const current_block = chain[i];
      const previous_block = chain[i - 1];
      if (
        current_block.lastHash !== previous_block.hash ||
        current_block.hash !== Block.blockHash(current_block)
      ) {
        return false;
      }
    }
    return true;
  }
}
