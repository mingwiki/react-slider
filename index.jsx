import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import cn from 'classnames';
import styles from './index.module.scss';
import { log, useWidth, useTranslate } from './utils';
const Component = props => {
  const { className, children, gap, numbers, ...others } = props;
  const sliderRef = useRef(null);
  const [containerWidth, itemWidth, slideWidth] = useWidth(sliderRef, numbers, gap);
  const [translate, status, setTranslate, setStatus] = useTranslate(slideWidth, numbers, children.length);
  return (
    <>
      <div className={cn(styles.slider, className)} style={{ height: '300px' }} ref={sliderRef} {...others}>
        {[...children, ...children].map((child, idx) => (
          <div
            key={idx}
            className={styles.item}
            style={{
              width: `${itemWidth}px`,
              flex: `1 0`,
              transition: status[idx] ? 'all 1s ease' : 'none',
              transform: `translate3d(${translate[idx]}px,0px,0px)`,
            }}
          >
            {child}
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          const temp = translate.slice(0, translate.length - 1);
          temp.unshift(translate.pop());
          setTranslate(temp);
          const temp2 = status.slice(0, status.length - 1);
          temp2.unshift(status.pop());
          setStatus(temp2);
        }}
        style={{ fontSize: '80px' }}
      >
        left
      </button>
      <button
        onClick={() => {
          const temp = translate.slice(1);
          temp.push(translate.shift());
          setTranslate(temp);
          const temp2 = status.slice(1);
          temp2.push(status.shift());
          setStatus(temp2);
        }}
        style={{ fontSize: '80px' }}
      >
        right
      </button>
    </>
  );
};
export default Component;
