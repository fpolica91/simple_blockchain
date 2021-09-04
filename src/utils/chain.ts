import * as uuid from 'uuid';

const EC = require('elliptic').ec;

const ec = new EC('secp256k1');

export default class ChainUtility {
  static genKeyPair(): string {
    return ec.genKeyPair();
  }

  static id(): string {
    return uuid.v1();
  }
}
