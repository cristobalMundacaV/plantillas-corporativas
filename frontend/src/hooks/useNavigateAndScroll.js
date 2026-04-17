import { useLocation, useNavigate } from 'react-router-dom';

const useNavigateAndScroll = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const goTo = (path) => {
    if (location.pathname !== path) {
        navigate(path);
        setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    };

    return goTo;
};

export default useNavigateAndScroll;
