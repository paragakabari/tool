import Document, { Html, Head, Main, NextScript } from "next/document";
import { MaxWarningsExceededError } from "sass-lint/lib/exceptions";
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600&display=swap"
            rel="stylesheet"
          />

          <script
            src="https://kit.fontawesome.com/b7ecb94de9.js"
            crossOrigin="anonymous"
          ></script>
          <script src="https://html2canvas.hertzen.com/dist/html2canvas.js"></script>

          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-C81NCPVH47"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-C81NCPVH47');`,
            }}
          />

          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5504931430899051"
            crossOrigin="anonymous"
          ></script>

          <title>AiGallery Tools - Tools for every task</title>
        </Head>
        <style></style>
        <body id="body">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default MyDocument;
