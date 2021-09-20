import { Helmet } from "react-helmet";

interface IProps {
  title: string;
}

function Seo({ title }: IProps) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <link rel="canonical" href="http://mysite.com/example" />
    </Helmet>
  );
}

export default Seo;
