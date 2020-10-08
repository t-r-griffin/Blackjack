import React from 'react';
import Observer from 'react-intersection-observer';
export default function Img(props) {
  const { src, width, height, alt, ...rest } = props;

  return (
    <div className="root" style={{ '--maxWidth': width }}>
      <Observer triggerOnce={true}>
        {({ inView, ref }) => (
          <div
            ref={ref}
            className="wrapper"
            style={{
              '--height': height,
              '--width': width,
            }}
          >
            <img
              src={inView ? src : ''}
              width={width}
              height={height}
              alt={alt}
              className="img"
              {...rest}
            />
          </div>
        )}
      </Observer>
    </div>
  );
}
