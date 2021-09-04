/* eslint-disable @typescript-eslint/no-unused-vars */

import ChainUtility from '../utils/chain';
import Wallet from './Wallet';

export default class Transaction {
  id: string;

  input: string | null;

  outputs: any[];

  constructor() {
    this.id = ChainUtility.id();
    this.input = null;
    this.outputs = [];
  }

  public createTransaction(
    senderWallet: Wallet,
    recipient: string,
    amount: number,
  ): any {
    if (amount > senderWallet.balance) {
      console.info('insufficient  balance');
    }
    this.outputs.push(
      ...[
        {
          amount: senderWallet.balance - amount,
          address: senderWallet.publicKey,
        },
        { amount, address: recipient },
      ],
    );
  }
}
