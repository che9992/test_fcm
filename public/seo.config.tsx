import { NextSeo } from "next-seo";

//service
import service from "public/service.json";

function SEO() {
  return (
    <NextSeo
      title={`${service.category} | 에듀셀파 서비스에 오신것을 환영합니다`}
      description={`${service.category} 에듀셀파 서비스에 오신것을 환영합니다`}
      canonical={service.url}
      openGraph={{
        type: "website",
        locale: "ko_KR",
        url: service.url,
        title: `${service.category} | 에듀셀파 서비스에 오신것을 환영합니다`,
        description: `${service.category} 에듀셀파 서비스에 오신것을 환영합니다`,
        site_name: service.category,
        images: [
          {
            url: service.imageUrl,
            alt: `${service.category} 에듀셀파 서비스에 오신것을 환영합니다`,
          },
        ],
      }}
    />
  );
}

export default SEO;
