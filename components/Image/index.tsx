import { useState } from "react";
import styles from "./Image.module.css";

export const Image = ({ path }: ImageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const bucketUrl = "https://storage.yandexcloud.net/takoysyakoy-art";

  const description = path.replace("project/", "").replace("/", " ");

  return (
    <>
      <div onClick={() => setIsOpen(true)} className={styles.wrapper}>
        <div className={styles.image}>
          <img
            src={`${bucketUrl}/${path}`}
            alt={description}
            className={styles.img}
          />
        </div>
      </div>
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className={styles.modal}>
          <div className={styles.modalWrapper}>
            <img
              src={`${bucketUrl}/${path}`}
              alt={description}
              className={styles.image}
            />
          </div>
        </div>
      )}
    </>
  );
};

interface ImageProps {
  path: string;
}

export default Image;
