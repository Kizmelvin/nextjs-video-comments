import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://unpkg.com/cloudinary-video-player@1.9.5/dist/cld-video-player.min.css"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          src="https://unpkg.com/cloudinary-video-player@1.9.5/dist/cld-video-player.min.js"
          type="text/javascript"
          strategy="before interactive"
        ></script>
      </body>
    </Html>
  );
}
