import { useState,useEffect } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
    children:React.ReactNode
}

const Portal:React.FC<PortalProps> = ({children})=>{

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      return () => setMounted(false);
    }, []);
  
    if (!mounted) return null;
  
    const portalRoot = document.getElementById('portal-root');
    return portalRoot ? createPortal(children, portalRoot) : null;
}

export default Portal;