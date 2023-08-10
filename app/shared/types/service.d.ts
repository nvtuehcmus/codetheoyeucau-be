export type Services = Array<{
  base_url: string;
  name: string;
  services: {
    [key: string]: string;
  };
}>;
