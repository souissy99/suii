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
import Lottie from "lottie-react";
import pokeBallLoading from "assets/lottie-json/pokeball-loading-animation.json";
import Image from 'next/image';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';

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
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid orange',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export const PCard = ({item,  ...props }) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const image = `https://raw.githubusercontent.com/PokeAPI/sprites/2ee90acbaea788a62fc9a45657f70f94d5dafa4f/sprites/pokemon/other/dream-world/${item.url.split("/")[6]}.svg`;

    const { isLoading, error, data } = useQuery(
      ['pokeDetail'],
      () =>
        fetch(item.url).then(res =>
          res.json()
        ),
      { enabled: open }
    );

    // if (isLoading) return (
    //   <Lottie animationData={pokeBallLoading} />
    // );

    if (error) return "Error";

    const addFav = (id) => {
      // console.log("id", id);
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
              {isLoading ? () => <Lottie animationData={pokeBallLoading} /> : (
                <main>
                  <div className="flex flex-row">
                    <div className='bg-red-500 h-full w-full'>
                      <h1>SECTION 1</h1>
                    </div>
                    <Image
                      src={image}
                      width="500"
                      height="500"
                      alt='Pokemon image'
                    />
                    <div className='bg-red-500 h-full w-full'>
                      <h1>SECTION 1</h1>
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
      <Card sx={{ display: 'flex' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }} style={{width: '-webkit-fill-available'}}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component="div" variant="h5">
              {item.name}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            <ColorButton onClick={handleOpen} variant="outlined" sx={{ fontSize: 'x-small' }}>See more</ColorButton>
            {renderModal()}
            <IconButton onClick={addFav(item.url.split("/")[6])} aria-label="favorite">
              <FavoriteBorderIcon sx={{ color: 'orange' }} />
            </IconButton>
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: '50%', height: '120px', objectFit: 'contain', margin: '5px', marginRight: '15px' }}
          image={image}
          alt="Live from space album cover"
        />
      </Card>
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
