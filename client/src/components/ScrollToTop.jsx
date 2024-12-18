import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = ({ children }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        console.log('Scrolling to top:', pathname);
        window.scrollTo(0, 0);
    }, [pathname]);

    return children;
};

export default ScrollToTop;
