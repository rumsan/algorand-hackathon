import React from 'react';
import { MutatingDots } from 'react-loader-spinner';

const LoadingSpinner = ({ visible, height, width, color, secondaryColor, radius, ariaLabel }: { visible?: boolean, height?: string, width?: string, color?: string, secondaryColor?: string, radius?: string, ariaLabel?: string }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center  ${visible ? 'block' : 'hidden'}`}>
      <MutatingDots
        height={height || '100'}
        width={width || '100'}
        color='rgb(79 70 229)'
        secondaryColor={'rgb(67 56 202)'}
        radius={radius || '12.5'}
        ariaLabel={ariaLabel || 'mutating-dots-loading'}
        visible={visible}
      />
    </div>
  );
};

export default LoadingSpinner;
