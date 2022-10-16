import * as React from 'react';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { orange } from '@mui/material/colors';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useQuery } from "@tanstack/react-query";
import Chip from '@mui/material/Chip';
import Image from 'next/image';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

const Chiped = styled(Chip)`
  margin: 5px;
  ${({ label }) => label == 'poison' && `
    background: #a040a0;
  `}
  ${({ label }) => label == 'normal' && `
  background: #a8a878;
  `}
  ${({ label }) => label == 'fire' && `
  background: #f08030;
  `}
  ${({ label }) => label == 'water' && `
  background: #6890f0;
  `}
  ${({ label }) => label == 'grass' && `
  background: #78c850;
  `}
  ${({ label }) => label == 'electric' && `
  background: #f8d030;
  `}
  ${({ label }) => label == 'ice' && `
  background: #98d8d8;
  `}
  ${({ label }) => label == 'fighting' && `
  background: #c03129;
  `}
  ${({ label }) => label == 'ground' && `
  background: #e0c068;
  `}
  ${({ label }) => label == 'flying' && `
  background: #a890f0;
  `}
  ${({ label }) => label == 'psychic' && `
  background: #f85888;
  `}
  ${({ label }) => label == 'bug' && `
  background: #a8b820;
  `}
  ${({ label }) => label == 'rock' && `
  background: #b8a038;
  `}
  ${({ label }) => label == 'ghost' && `
  background: #705898;
  `}
  ${({ label }) => label == 'dragon' && `
  background: #7038f8;
  `}
  ${({ label }) => label == 'dark' && `
  background: #705848;
  `}
  ${({ label }) => label == 'steel' && `
  background: #b8b8d0;
  `}
  ${({ label }) => label == 'fairy' && `
  background: #ee99ac;
  `}
`;

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(orange[500]),
  // backgroundColor: orange[500],
  borderColor: orange[500],
  borderRadius: '20px',
  fontSize: '12px',
  '&:hover': {
    // backgroundColor: orange[700],
  },
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid orange',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export const PCard = ({item,  ...props }) => {
    const [open, setOpen] = useState(false);
    const [isFav, setIsFav] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const id = item.url ? item.url.split('/')[6] : item.pokemon.url.split('/')[6]

    if (id < 10) id = `0${id}`
    if (id < 100) id = `0${id}`

    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;

    const checkImage = (img) => {
      if (id > 10000) {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
      } else {
        return img
      }
    }

    useEffect(() => {
      setIsFav(() => JSON.parse(localStorage.getItem('fav_list')));
    }, []);

    const getDetail = () => {
      return fetch(item.url ? item.url : item.pokemon.url).then(res => res.json())
    }

    const normalise = (value) => ((value - 0) * 100) / (200 - 0);


    const { isLoading, error, data } = useQuery(
      ['pokeDetail'], getDetail,
      { enabled: open }
    );

    // if (isLoading) return (
    //   <Lottie animationData={pokeBallLoading} />
    // );

    if (error) return "Error";

    const renderTypes = () => {
      return data.types.map((item, index) => {
        return (
          <>
            <Chiped key={index} label={item.type.name} />
          </>
        )
      })
    }

    const renderStats = () => {
      return data.stats.map((item, index) => {
        return (
          <div key={index} className="stats">
            <span>{item.stat.name}</span>
            <BorderLinearProgress variant="determinate" value={normalise(item.base_stat)} />
          </div>
        )
      })
    }

    const renderMoves = () => {
      return data.moves.slice(0, 3).map((item, index) => {
        return (
          <>
            <span key={index}>{item.move.name}</span><br/>
          </>
        )
      })
    }
    

    const addFav = (id) => {
      const arr = localStorage.getItem('fav_list');
      let favList = JSON.parse(arr);
      favList.push(id);
      localStorage.setItem('fav_list', JSON.stringify(favList));
      setIsFav(favList);
    }

    const removeFav = (id) => {
      const arr = localStorage.getItem('fav_list');
      let favList = JSON.parse(arr);
      favList.splice(favList.indexOf(id), 1);
      localStorage.setItem('fav_list', JSON.stringify(favList));
      setIsFav(favList);
    }

    const renderModal = () => {

      return (
        <>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              {data && (
                <main>
                  <div className="flex flex-row">
                    <div className='text-black h-full w-full'>
                    {renderStats()}
                    </div>
                    <Image
                      src={checkImage(image)}
                      width="500"
                      height="500"
                      alt='Pokemon image'
                    />
                    <div className='text-black h-full w-full'>
                      <span>Weight: {data.weight}</span><br />
                      {renderTypes()}
                      <div className='mt-4'>
                      <span>Moves: </span><br />
                      {renderMoves()}
                      </div>
                    </div>
                  </div>
                </main>
              )}
            </Box>
          </Fade>
        </Modal>
        </>
      );
    }
 
    return (
      <>
        {renderModal()}
        <Card sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }} style={{width: '-webkit-fill-available'}}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="subtitle1">
              {item.name ? item.name : item.pokemon.name} #{id}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <ColorButton onClick={handleOpen} variant="outlined" sx={{ fontSize: 'x-small' }}>See more</ColorButton>
            {isFav.includes(id) ? (
              <IconButton aria-label="delete from favorites" onClick={() => {removeFav(id)}}>
                <FavoriteIcon sx={{ color: 'orange' }}/>
              </IconButton>
            ) : (
              <IconButton aria-label="add to favorites" onClick={() => {addFav(id)}}>
                <FavoriteBorderIcon sx={{ color: 'orange' }} />
              </IconButton>
            )}
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: '50%', height: '120px', objectFit: 'contain', margin: '5px', marginRight: '15px' }}
          image={checkImage(image)}
          alt="Pokemon image"
        />
      </Card>
      </>
    );
};

PCard.propTypes = {
  item: PropTypes.object.isRequired,
};

PCard.defaultProps = {
  item: {
    name: "Pickachu"
  },
};
