import { message } from "antd";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LayoutHOC from "../components/layouts/LayoutHOC";
import { ADMIN_ROLES, IAdminJWT } from "../services/admin/admin.model";
import { validateAdminRole } from "../services/admin/admin.service";

export default function Home() {
  const router = useRouter();
  const [adminDetails, setAdminDetails] = useState<IAdminJWT>({
    username: "",
    id: 0,
    role: ADMIN_ROLES.USER,
    iat: 0,
  });

  async function checkAdminId() {
    let res;
    try {
      res = validateAdminRole();
      setAdminDetails(res);
    } catch (e) {
      message.error("Unauthorized");
      router.push("/login");
    }
  }

  useEffect(() => {
    checkAdminId();
  }, []);

  useEffect(() => {
    if (adminDetails.role === ADMIN_ROLES.ADMIN) {
      router.push("/carousel");
    }
    if (adminDetails.role === ADMIN_ROLES.SUPER_ADMIN) {
      router.push("/contacts");
    }
    if (adminDetails.role === ADMIN_ROLES.HOST) {
      router.push("/contacts");
    }
  }, [adminDetails]);

  return <></>;
}
