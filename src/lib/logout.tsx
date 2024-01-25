/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

export function logout() {
  Cookie.remove("accessToken");
  // window.location.href = "/logout";
}
