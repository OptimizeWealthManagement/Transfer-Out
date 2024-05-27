import React from 'react';
import ringResize from '../../images/ring-resize.svg';

const Loading = () => {
    return (
        <div
            className="loading"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'white',
                zIndex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <img src={ringResize} alt="Loading..." style={{ width: '100px' }} />
        </div>
    );
};

export default Loading;
