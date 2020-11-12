import { useState, useEffect } from 'react'

const useListenerScrollBottom = () => {
    const [isBottom, setIsBottom] = useState(false);

    useEffect(() => {
        function handleScroll() {
            const isOnBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight
    
            setIsBottom(isOnBottom)
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [])

    return isBottom
}

export default useListenerScrollBottom
