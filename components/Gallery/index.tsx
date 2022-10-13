import { useEffect, useState } from "react";
import styles from "./Gallery.module.css";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { Image } from "..";

export const Gallery = ({ path }: GalleryProps) => {
  const [projects, setProjects] = useState<string[]>([
    "proj a",
    "proj b",
    "proj c",
    "proj d",
    "proj d",
    "proj d",
    "proj d",
    "proj d",
    "proj d",
    "proj d",
    "proj d",
    "proj d",
    "proj d",
    "proj d",
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
      Prefix: `${path}/`,
    });
    client.send(c).then((data) => {
      if (data.Contents) {
        // setProjects(
        //   data.Contents?.filter((c) => c.Key?.endsWith("/"))
        //     .filter((c) => c.Key != `${path}/`)
        //     .map((c) => c.Key || "")
        // );
      }
    });
  }, []);

  return (
    <div className={styles.gallery}>
      {projects.map((project) => (
        <div className={styles.project}>{project}</div>
      ))}
    </div>
  );
};

interface GalleryProps {
  path: string;
}

export default Image;
