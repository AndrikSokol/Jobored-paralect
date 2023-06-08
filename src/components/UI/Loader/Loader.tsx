import React, { FC, memo } from "react";
import style from "./Loader.module.css";
const Loader: FC = () => {
  return (
    <div className="w-full flex justify-center my-10">
      <div className={style["loader"]}></div>
    </div>
  );
};

export default memo(Loader);
