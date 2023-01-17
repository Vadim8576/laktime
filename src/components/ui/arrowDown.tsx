import React from "react";
import css from './arrowDown.module.css';

export const ArrowDown = () => {
  return (
    <div className={css.arrows}>
      <div className={css.arrows__item}>
        <div className={css.arrows__item_stick}></div>
        <div className={css.arrows__item_stick}></div>
      </div>
      <div className={css.arrows__item}>
        <div className={css.arrows__item_stick}></div>
        <div className={css.arrows__item_stick}></div>
      </div>
    </div>
  )
}