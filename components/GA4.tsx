const GA_MEASUREMENT_ID = Deno.env.get('GA_MEASUREMENT_ID');

const GA4 = () => {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }
  return (
    <>
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}></script>
      <script dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `,
      }}></script>
    </>
  )
}

export default GA4;