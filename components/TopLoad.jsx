import React ,{useEffect, useRef} from 'react'

const TopLoad = ({loadProgress,setLoadProgress,sp}) => {
    const hasMounted = useRef(false);
    const t1 = useRef(null);
    const t2 = useRef(null);
    /*t1.current = setTimeout(()=>{
        setLoadProgress(60);
        clearTimeout(t1.current);
    },500)*/
    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return;
          }
    
          setLoadProgress(100);
          t2.current = setTimeout(()=>{setLoadProgress(0)},200);

          return ()=>{
            clearTimeout(t2.current);
          }
    
      }, [sp]);  
  return (
    <div className="fixed top-0 left-0 w-full h-1">
      <div
        className="h-full bg-slate-800 transition-all"
        style={{ width: `${loadProgress}%` }}
      ></div>
    </div>
  )
}

export default TopLoad