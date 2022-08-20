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

  useEffect(() => {
    router.push("/login");
  }, []);

  return <></>;
}
