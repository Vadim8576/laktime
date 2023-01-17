import { Skeleton } from "@mui/material";

type ISkeletonAnimation = false | "pulse" | "wave" | undefined;

interface IMySkeleton {
  animationType: ISkeletonAnimation;
  width?: string;
  height?: string
}

export const MySkeleton = ({ width = '100%', height = '194px', animationType = false }: IMySkeleton) => (
  <Skeleton
    width={width}
    height={height}
    variant='rectangular'
    animation={animationType}
    sx={{borderRadius: '5px'}}
  />
)