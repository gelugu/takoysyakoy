import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Header, Image, Wall } from "../components";
import styles from "../styles/Home.module.css";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { Gallery } from "../components/Gallery";

const Home: NextPage = () => {
  const [projects, setProjects] = useState<string[]>([
    "projects/some 1",
    "projects/some 2",
  ]);

  useEffect(() => {
    const client = new S3Client({
      endpoint: "https://storage.yandexcloud.net",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY || "",
      },
      region: "ru-central1",
    });
    const c = new ListObjectsV2Command({
      Bucket: "takoysyakoy-art",
      Prefix: "projects/",
    });
    client.send(c).then((data) => {
      if (data.Contents) {
        setProjects(
          data.Contents?.filter((c) => c.Key?.endsWith("/"))
            .filter((c) => c.Key != "projects/")
            .map((c) => c.Key || "")
        );
        console.log(
          data.Contents?.filter((c) => c.Key?.endsWith("/"))
            .filter((c) => c.Key != "projects/")
            .map((c) => c.Key || "")
        );
      }
    });
  }, []);

  return (
    <div className={styles.content}>
      <Head>
        <title>takoysyakoy art</title>
        <meta name="description" content="Zlata Ulitina" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Header />
      </header>

      <main className={styles.main}>
        {projects.map((p) => (
          <Wall project={p} key={p} />
        ))}
        {/* <Gallery path="projects" /> */}
      </main>

      <footer className={styles.footer}>Footer</footer>
    </div>
  );
};

export default Home;
