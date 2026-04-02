declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_TAG: string;
    }
  }
}

export {};
