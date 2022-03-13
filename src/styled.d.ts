import "styled-components";
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    txtColor: string;
    bxColor: string;
    red: string;
    black: {
      veryDark: string;
      darker: string;
      lighter: string;
    };
    white: {
      darker: string;
      lighter: string;
    };
  }
}
