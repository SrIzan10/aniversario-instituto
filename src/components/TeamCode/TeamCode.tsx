import {jetbrainsMonoFont} from "@/util/jetbrainsMonoFont";
import styles from "./index.module.css";
import React from "react";

export default function TeamCode({teamCode}: { teamCode: string }) {
  return (
    <div style={jetbrainsMonoFont.style} className={styles.teamCode}>
      {teamCode}
    </div>
  )
}