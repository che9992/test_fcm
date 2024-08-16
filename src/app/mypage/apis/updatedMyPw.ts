//
// 비밀번호 변경
export const updatedMyPw = async ({
  axiosInstance,
  old_password,
  new_password,
}: AxiosType & { old_password: string; new_password: string }) => {
  try {
    const result = await axiosInstance.put(`/accounts/password_change/`, {
      old_password,
      new_password,
    });
    return result.data;
  } catch (error) {
    throw error;
  }
};
