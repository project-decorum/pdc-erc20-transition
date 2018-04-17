declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'bn.js' {
  interface BigNumber {}
}

declare module 'web3' {
  var x: any;
  export = x;
}

declare module 'bitcore-lib' {
  var x: any;
  export = x;
}
