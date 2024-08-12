"use client";

import { useState } from "react";
import styles from "./LoginTab.module.scss";
import Underline from "../Underline/Underline";

export default function LoginTab({ ...props }) {
  const [activeTab, setActiveTab] = useState(0);
  const data = props.data;

  return (
    <div className={styles.tabWrapper}>
      {data &&
        data.map((item: string, index: number) => {
          return (
            <div
              key={index}
              className={`${styles.tabItem} ${
                activeTab === index ? styles.active : ""
              }`}
              onClick={() => {
                setActiveTab(index);
                props.onActiveTabCallback(index);
              }}>
              <p> {item}</p>
              <Underline
                show={activeTab === index}
                style={{ maxWidth: "80px" }}
              />
            </div>
          );
        })}
    </div>
  );
}
