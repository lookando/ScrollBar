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


let var_thumb_top = 0;

let var_thumb_top_up = 0;
let startPosition = 0
let currentPosition = 0
let currentScrollHeight = 0
let currentScrollTop = 0


let isDragging = false
const ScrollBar: React.FC<ScrollBarProps> = ({ children }) => {
    const scrollable_contentRef = React.useRef<HTMLDivElement>(null);
    // 滚动条高度 
    const [thumb_height, setThumb_height] = useState<number>(0);
    // 滚动条距离顶部的位置
    const [thumb_top, setThumb_top] = useState<number>(0);





    /**
     * @param event 鼠标滚轮滚动事件
     */
    const handleScroll = (event: any) => {
        if (scrollable_contentRef.current) {
            deltaY += event.deltaY
            if (deltaY < 0) {
                setThumb_top(0);
                var_thumb_top = 0
                deltaY = 0
                var_thumb_top_up = var_thumb_top;

            } else if (deltaY > (scrollable_contentRef.current.scrollHeight - scrollable_contentRef.current.clientHeight)) {
                setThumb_top(100 - var_thumb_height);
                var_thumb_top = 100 - var_thumb_height
                deltaY = scrollable_contentRef.current.scrollHeight - scrollable_contentRef.current.clientHeight
                var_thumb_top_up = var_thumb_top;
            } else {
                var_thumb_top = Math.floor(((deltaY) / scrollable_contentRef.current.scrollHeight) * 100)
                setThumb_top(Math.floor(((deltaY) / scrollable_contentRef.current.scrollHeight) * 100));
                var_thumb_top_up = var_thumb_top;
            }

        }
    };

    const handleMouseDown = (event: React.MouseEvent) => {
        console.log(event);
        if (scrollable_contentRef.current) {
            currentScrollTop = scrollable_contentRef.current.scrollTop
        }
        deltaY = 0
        startPosition = event.clientY
        isDragging = true;
    };

    const handleMouseMove = (event: MouseEvent) => {
        // console.log(event);

        if (!isDragging) { return; }
        else {

            currentPosition = event.clientY

            if (scrollable_contentRef.current) {
                // console.log(event.clientY,'event.clientY');

                scrollable_contentRef.current.scrollTop = currentScrollTop + (event.clientY - startPosition) * (scrollable_contentRef.current.scrollHeight / scrollable_contentRef.current.clientHeight);
                // console.log((event.clientY - startPosition) / scrollable_contentRef.current.clientHeight, '(event.clientY - startPosition) / scrollable_contentRef.current.clientHeight');
                setThumb_top(Math.min(Math.max(((event.clientY - startPosition) / scrollable_contentRef.current.clientHeight) * 100 + var_thumb_top_up, 0), 100 - var_thumb_height));
                var_thumb_top = Math.min(Math.max(((event.clientY - startPosition) / scrollable_contentRef.current.clientHeight) * 100 + var_thumb_top_up, 0), 100 - var_thumb_height);

            }
        }

    };

    const handleMouseUp = () => {
        var_thumb_top_up = var_thumb_top;
        if (scrollable_contentRef.current) {
            deltaY += scrollable_contentRef.current.scrollTop
        }
        isDragging = false;

    };

    //鼠标滚动
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

    // 鼠标拖动滚动条
    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);

        // 清理事件监听器
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]); // 依赖数组确保在isDragging状态改变时重新设置监听器
    return (
        <div
            className="scroll_container"

        >
            <div className='scrollable_content'
                ref={scrollable_contentRef}
                style={{ top: currentScrollHeight }}
            >
                {children}
            </div>
            <div className="scrollbar" >
                <div className="track" >
                    <div
                        onMouseDown={handleMouseDown}
                        style={{ height: thumb_height + '%', top: thumb_top + '%' }}
                        className="thumb"
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default ScrollBar;