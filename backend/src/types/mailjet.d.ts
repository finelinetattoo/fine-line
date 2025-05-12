declare module 'node-mailjet' {
  const Mailjet: {
    apiConnect: (
      apiKey: string,
      apiSecret: string,
    ) => {
      post: (
        endpoint: string,
        options: { version: string },
      ) => {
        request: (body: unknown) => Promise<unknown>;
      };
    };
  };
  export = Mailjet;
}
