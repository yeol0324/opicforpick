export {};

declare global {
  interface Window {
    __GLOBAL_ERROR_HANDLER_INITED__?: boolean;
  }
}
