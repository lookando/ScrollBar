import React, { useEffect, useState } from 'react';
import './index.less'


interface ScrollBarProps {
    children: React.ReactNode;
}

// 全局变量
// 鼠标滚轮滚动距离到顶部的距离
let deltaY = 0;
// 滚动条高度
let var_thumb_height = 0;

const ScrollBar: React.FC<ScrollBarProps> = ({ children }) => {
    const scrollable_contentRef = React.useRef<HTMLDivElement>(null);
    // 滚动条高度 
    const [thumb_height, setThumb_height] = useState<number>(0);
    // 滚动条距离顶部的位置
    const [thumb_top, setThumb_top] = useState<number>(0);


    const handleScroll = (event: any) => {
        if (scrollable_contentRef.current) {
            deltaY += event.deltaY
      
            if (deltaY < 0) {
                setThumb_top(0);
                deltaY = 0
            } else if (deltaY > (scrollable_contentRef.current.scrollHeight - scrollable_contentRef.current.clientHeight)) {
                setThumb_top(100 - var_thumb_height);
                deltaY = scrollable_contentRef.current.scrollHeight - scrollable_contentRef.current.clientHeight

            } else {  
                setThumb_top(Math.floor(((deltaY) / scrollable_contentRef.current.scrollHeight) * 100));
            }
        }
    };

    useEffect(() => {
        if (scrollable_contentRef.current) {
            setThumb_height(Math.ceil((scrollable_contentRef.current.clientHeight / scrollable_contentRef.current.scrollHeight) * 100))
            var_thumb_height = (Math.ceil((scrollable_contentRef.current.clientHeight / scrollable_contentRef.current.scrollHeight) * 100))
        }
    }, [])

    useEffect(() => {
        if (scrollable_contentRef.current) {
            scrollable_contentRef.current.addEventListener('wheel', handleScroll);
            // 清理事件监听器
            return () => {
                scrollable_contentRef.current?.removeEventListener('wheel', handleScroll);
            };
        }
    }, []);
    return (
        <div
            className="scroll_container"
        >
            <div className='scrollable_content'
                ref={scrollable_contentRef}
            >
                {children}
            </div>
            <div className="scrollbar" >
                <div className="track" >
                    <div
                        style={{ height: thumb_height + '%', top: thumb_top + '%' }}
                        className="thumb"
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default ScrollBar;