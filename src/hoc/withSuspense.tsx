import React, { ReactNode } from "react"
import Loading from '../components/ui/loading';



export const withSuspense =
  (Component: React.LazyExoticComponent<React.FC>) => {
  // (Component: React.LazyExoticComponent<React.FC>): React.ReactElement | null => {
    // return (props) => {
    //   return (
    //     <React.Suspense fallback={<Loading />}>
    //       <Component {...props} />
    //     </React.Suspense>
    //   )
    // }
}
