declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "*.png" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const value: any;
  export default value;
}
