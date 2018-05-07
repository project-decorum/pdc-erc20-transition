declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'bn.js' {
  interface BigNumber {}
}

declare module 'web3';

declare module 'bitcore-lib';

declare module "*.json" {
  const value: any;
  export default value;
}
