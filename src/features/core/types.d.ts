declare module "Models" {
  export type Article = {
    id: string;
    title: string;
    content: string;
  };

  export type LoggedUser = {
    id: number | string;
    email: string;
  };

  export type LocalesType = "en" | "fr";
}
