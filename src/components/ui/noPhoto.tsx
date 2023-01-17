import styled from "styled-components"
import Typography from '@mui/material/Typography';
import NoPhotographyOutlinedIcon from '@mui/icons-material/NoPhotographyOutlined';

type TypeView = 'icon' | 'text';

interface INoImageContainer {
  width: string;
  height: string;
  type: TypeView;
}

const NoImageContainer = styled.div<INoImageContainer>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-height: 50px;
  background-color: #b7b7b7;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => props.type === 'icon' ? '5px' : '0'};
`

interface INoImage {
  width: string;
  height: string;
  type: TypeView;
}

export const NoPhoto = ({ width, height, type }: INoImage) => {
  return (
    <NoImageContainer type={type} width={width} height={height}>
      {type === 'text' &&
        <Typography variant="h5" sx={{ color: '#ddd' }}>
          Изображение отсутствует
        </Typography>
      }
      {type === 'icon' &&
        <NoPhotographyOutlinedIcon sx={{color: '#ddd'}} fontSize='large' />
      }

    </NoImageContainer>
  )
}