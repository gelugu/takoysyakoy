import { useEffect, useState } from "react";
import styles from "./Wall.module.css";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { Image } from "..";

export const Wall = ({ project }: WallProps) => {
  const [images, setImages] = useState<string[]>(["a", "b", "c", "d"]);

  useEffect(() => {
    const client = new S3Client({
      endpoint: "https://storage.yandexcloud.net",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY || "",
      },
      region: "ru-central1",
    });
    client
      .send(
        new ListObjectsV2Command({
          Bucket: `takoysyakoy-art`,
          Prefix: project,
        })
      )
      .then((data) => {
        console.log(data);
        if (data.Contents) {
          setImages(
            data.Contents?.filter((c) => !c.Key?.endsWith("/")).map(
              (c) => c.Key || ""
            )
          );
          console.log(
            data.Contents?.filter((c) => !c.Key?.endsWith("/")).map(
              (c) => c.Key || ""
            )
          );
        }
      });
  }, []);

  const projectName = project.split("/")[1];

  return (
    <div className={styles.wall}>
      <h1 className={styles.wallName}>{projectName}</h1>
      <p className={styles.wallDescription}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis temporibus
        inventore voluptatibus error. Quasi, minima. Hic rerum ut beatae totam,
        et veritatis dicta in, accusantium officia tenetur modi repellat minus.
      </p>
      <div className={styles.wallContent}>
        {images.map((image, index) => (
          <div className={styles.wallImage} key={image}>
            <h2 className={styles.imageName}>{index} Name</h2>
            <div className={styles.imageBorder}>
              <Image path={image} />
              {/* <div
                style={{
                  width: `${Math.random() * 800}px`,
                  height: `${Math.random() * 800}px`,
                  backgroundColor: "red",
                }}
              /> */}
            </div>
            <p className={styles.imageDescription}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
              nulla temporibus molestiae earum ut voluptates dignissimos
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

interface WallProps {
  project: string;
}

export default Image;
