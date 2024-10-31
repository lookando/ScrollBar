import React, { useEffect, useState } from 'react';
import './index.css'
import { log } from 'console';

interface ScrollBarProps {
    children: React.ReactNode;
}



const ScrollBar: React.FC<ScrollBarProps> = ({ children }) => {
    const scrollContainerRef = React.useRef<HTMLDivElement>(null);
    const [thumb_height, setThumb_height] = useState<number>(0);

    useEffect(() => {
        if (scrollContainerRef.current) {
            setThumb_height(Math.ceil((scrollContainerRef.current.clientHeight / scrollContainerRef.current.scrollHeight) * 100))
            console.log(scrollContainerRef, 'scrollContainerRef');
        }

    }, [])

    useEffect(() => {
        const handleScroll = (event:any) => {
            console.log(event,'event');
            // console.log(scrollContainerRef.current?.scrollHeight, 'scrollContainerRef');

            
            const delta = event.deltaY;

            // if (delta > 0) {
            //     //   setScrollDirection('向下滚动');
            //     console.log('向下滚动',delta);

            // } else {
            //     console.log('向上滚动',delta);

            //     //   setScrollDirection('向上滚动');
            // }
        };

        if (scrollContainerRef.current) {
            scrollContainerRef.current.addEventListener('wheel', handleScroll);

            // 清理事件监听器
            return () => {
                scrollContainerRef.current?.removeEventListener('wheel', handleScroll);
            };
        }
    }, []);
    return (
        <div
            className='scrollable_content'
            ref={scrollContainerRef}
        >
            <div className="scroll-container" >
                {children}
            </div>
            <div className="scrollbar" >
                <div className="track" >
                    <div
                        style={{ height: thumb_height + '%' }}
                        className="thumb"
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default ScrollBar;