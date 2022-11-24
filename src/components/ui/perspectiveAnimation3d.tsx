import React, { createRef, useEffect, useState, useRef, MouseEvent, ReactNode, FC } from "react";


const style = {
  transformStyle: 'preserve-3d',
  perspective: '600px',
  transform: 'rotate3d(0, 0, 0, 0)',
  boxShadow: '0px 0px 20px rgba(0, 0, 0, .3)'
}


interface IPerspectiveAnimation3dProps {
  children: ReactNode;
}


const PerspectiveAnimation3d: FC<IPerspectiveAnimation3dProps> = ({ children }) => {

  const [childrenSize, setChildrenSize] = useState({
    width: 0,
    height: 0,
    centerX: 0,
    centerY: 0
  });


  const ref = createRef<HTMLDivElement>();
  // const ref = useRef<HTMLDivElement>(null);



  useEffect(() => {
    if (ref) {
      const width = ref.current?.clientWidth || 0;
      const height = ref.current?.clientHeight || 0;
      setChildrenSize({
        width,
        height,
        centerX: width / 2,
        centerY: height / 2
      })
    }
  }, [])




  const mouseMoveHandler = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.nativeEvent;
    let x, y, offsetLeft, offsetTop;

    // console.log(e.nativeEvent)
    console.log(ref.current?.clientLeft)

    offsetLeft = ref.current ? ref.current.offsetLeft: 0;
    offsetTop = ref.current ? ref.current.offsetTop: 0;


    if (e.target === e.nativeEvent.target) {
      x = target.offsetX;
      y = target.offsetY;
    } else {
      x = target.pageX - offsetLeft;
      y = target.pageY - offsetTop;
    }

    // console.log(`x = ${x}, y = ${y}, pageX = ${target.pageX}, pageY = ${target.pageY}, offsetLeft = ${offsetLeft}, offsetTop = ${offsetTop}`)
    
    const dx = childrenSize.centerX - x;
    const dy = childrenSize.centerY - y;
    const rx = +(dx / childrenSize.centerX).toFixed(2);
    const ry = -(dy / childrenSize.centerY).toFixed(2);
    const sx = -(rx * 5);
    const sy = (ry * 5);

    if (ref.current) {
      // ref.current.style.transition = '.2s transform';
      ref.current.style.transform = `rotate3d(${ry}, ${rx}, 0, 20deg)`;
      ref.current.style.boxShadow = `${sx}px ${sy}px 20px rgba(0, 0, 0, .3)`;
    }
  }


  const mouseLeaveHandler = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    // console.log(target)
    target.style.transition = '.5s';
    target.style.transform = `rotate3d(0, 0, 0, 0)`;
    target.style.boxShadow = `0px 0px 20px rgba(0, 0, 0, .3)`;
  }


  return (
    <div
    style={{
      transformStyle: 'preserve-3d',
      perspective: '600px',
    }}
    >
      <div
        ref={ref}
        onMouseMove={mouseMoveHandler}
        onMouseLeave={mouseLeaveHandler}
        style={{
          transition: '.2s transform',
          transform: 'rotate3d(0, 0, 0, 0)',
          boxShadow: '0px 0px 20px rgba(0, 0, 0, .3)'
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default PerspectiveAnimation3d;