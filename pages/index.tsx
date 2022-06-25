import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import LayoutHOC from "../components/layouts/LayoutHOC";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/contacts");
  }, []);

  return <></>;
}
