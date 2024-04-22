import { useEffect, useRef } from "react";
import './styles.less'

interface LoadMoreProps {
  status: number;
  loadmore?: Function
}

function Index(props:LoadMoreProps){

  const {status, loadmore} = props

  const moreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (let entry of entries) {
          if (entry.isIntersecting) {
            loadmore && loadmore();
          }
        }
      },
      {
        rootMargin: '0px',
        threshold: [0],
      },
    );
    intersectionObserver.observe(moreRef.current as HTMLDivElement);
    return () => {
      intersectionObserver.disconnect();
    }
  }, [])

  return (
    <div ref={moreRef} className="load-more">
      {
        status === 1 && <span>加载中。。。</span>  //<van-loading color="var(--theme-color)" size="32rpx">加载中。。。</van-loading>
      }
      {
        status === 2 && <span>暂无数据</span>
      }
      {/* <div wx:if="{{status==3}}">
        <text>暂无更多数据</text>
      </div> */}
    </div>
  )
}

export default Index;