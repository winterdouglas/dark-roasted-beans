import "i18next";
import { resources, defaultNS } from "./i18n";

declare module "i18next" {
  // and extend them!
  //   interface CustomTypeOptions {
  //     // custom namespace type if you changed it
  //     defaultNS: "common";
  //     // custom resources type
  //     resources: typeof en;
  //   }
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: (typeof resources)["en"];
  }
}
