import { useEffect, useState } from "react";



export const useObserver = (ref: any, options: any) => {
// export const useObserver = (ref, options) => {
  const { rootMargin } = options;
  const [observerEntry, setObserverEntry] = useState<boolean>(false);

  useEffect(() => {
    if (!ref?.current) return;
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        // console.log(entry)
        setObserverEntry(entry.isIntersecting)
        if (entry.isIntersecting) {
          observer.unobserve(entry.target)
        }
      },
      { rootMargin }
    );

    observer.observe(ref.current)
  }, [ref, rootMargin])

  return observerEntry;
}
