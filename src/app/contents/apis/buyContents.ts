// 콘텐츠 > 콘텐츠 구매
export const buyContents = async ({
  axiosInstance,
  content,
  paymentKey,
  orderName,
  approvedAt,
  cancels = null,
  card = null,
  totalAmount,
  suppliedAmount,
  taxFreeAmount,
  vat,
  method,
}: AxiosType & {
  content?: any;
  paymentKey?: string;
  orderId?: string;
  orderName?: string;
  approvedAt?: any;
  cancels?: any;
  card?: any;
  easyPay?: any;
  totalAmount?: string | number;
  suppliedAmount?: string | number;
  taxFreeAmount?: string | number;
  vat?: string | number;
  method?: string | number;
}) => {
  const { data } = await axiosInstance.post("/contents/buy/", {
    content,
    paymentKey,
    orderName,
    approvedAt,
    cancels,
    card,
    totalAmount,
    suppliedAmount,
    taxFreeAmount,
    vat,
    method,
  });
  return data;
};
