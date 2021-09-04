import properties from '../congif';
import ChainUtility from '../utils/chain';

export default class Wallet {
  /**
   * the wallet will hold the public key
   * and the private key pair
   * and the balance
   */
  balance: number;

  keyPair: any;

  publicKey: string;

  // `ChainUtil.genKeyPair();`
  constructor() {
    this.balance = properties.BALANCE;
    this.keyPair = ChainUtility.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  toString(): string {
    return `Wallet -
      publicKey: ${this.publicKey.toString()}
      balance  : ${this.balance}`;
  }
}
