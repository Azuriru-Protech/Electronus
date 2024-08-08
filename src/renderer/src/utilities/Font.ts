import { Inter, Noto_Sans_SC, Noto_Sans_TC } from "next/font/google";
import localFont from "next/font/local";

export const inter = Inter({ subsets: ["latin"] });
export const notoSansSC = Noto_Sans_SC({ subsets: ["latin"] });
export const notoSansTC = Noto_Sans_TC({ subsets: ["latin"] });
export const pingFang = localFont({
  src: [
    {
      path: "../assets/fonts/PingFang-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../assets/fonts/PingFang-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../assets/fonts/PingFang-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/PingFang-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/PingFang-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/PingFang-Heavy.ttf",
      weight: "900",
      style: "normal",
    },
  ],
});
