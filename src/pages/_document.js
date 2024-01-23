import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="modal-root"></div>
        <div id="update-modal"></div>
        <div id="edit-profile-modal"></div>
      </body>
    </Html>
  )
}
