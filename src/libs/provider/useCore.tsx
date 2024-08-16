import { useAxios } from "@/app/_layout/apis/_config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ROUTE_PATH } from "../utils/route_path";

export function useCore() {
  const router = useRouter();
  const axiosInstance = useAxios();
  const { status, data } = useSession();

  const routePath = ROUTE_PATH;

  return { router, routePath, axiosInstance, status };
}
