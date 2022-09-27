import React, { useRef, useEffect, useState, useCallback } from 'react';
export const log = log => console.debug({ ...log });
export const useWidth = (ref, numbers, gap) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  useEffect(() => {
    setContainerWidth(ref.current.offsetWidth);
    setItemWidth((ref.current.offsetWidth - (numbers - 1) * gap) / numbers);
    setSlideWidth((ref.current.offsetWidth - (numbers - 1) * gap) / numbers + gap);
  }, [ref]);
  return [containerWidth, itemWidth, slideWidth];
};

export const useTranslate = (width, numbers, length) => {
  const [translate, setTranslate] = useState(new Array(length * 2).fill(0));
  const [status, setStatus] = useState(new Array(length * 2).fill(false));
  useEffect(() => {
    const initStatus = [...status];
    for (let i = length - 1; i < length + numbers + 1; i++) {
      initStatus[i] = true;
    }
    setStatus(initStatus);
    const initTranslate = [...translate];
    for (let i = 0; i < length * 2; i++) {
      initTranslate[i] = (i - length) * width;
    }
    setTranslate(initTranslate);
  }, [width, numbers, length]);
  return [translate, status, setTranslate, setStatus];
};
