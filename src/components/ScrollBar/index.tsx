import React from 'react';

interface ScrollBarProps {
    children: React.ReactNode;
}

const ScrollBar: React.FC<ScrollBarProps> = ({ children }) => {
    return (
        <div
            className="scrollable-content"
            // ref={scrollContainerRef}
            style={{ overflow: 'auto', height: '100%', position: 'relative' }}
        >
            <div className="scroll-container" >
                {children}
            </div>
            <div className="scrollbar" >
                <div className="track" >
                    <div
                        className="thumb"
          
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default ScrollBar;