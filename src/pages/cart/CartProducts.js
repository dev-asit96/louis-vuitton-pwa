import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ImageAPI } from '../../backend';
import { CartContext } from '../../contexts/CartContext';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  PlusCircleIcon,
  MinusCircleIcon,
  TrashIcon,
} from '../../components/icons';
import CardDetails from './CardDetails';

const useStyles = makeStyles((theme) => ({
  media: {
    marginTop: 10,
    marginLeft: 36,
    height: 240,
    width: 200,
  },
  cardPart: {
    maxWidth: 400,
  },

  grid2: {
    width: 300,
  },
  grid3: {
    marginLeft: 70,
  },

  control: {
    padding: theme.spacing(2),
  },
}));
const CartProducts = () => {
  const { increase, decrease, removeProduct } = useContext(CartContext);
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(5);
  const { cartItems } = useContext(CartContext);

  return (
    <div className='main-container-cart'>
      {/* Cart Items */}
      <div className='cart-grid'>
        <Grid item xs={10}>
          <Grid container spacing={spacing} className={classes.grid3}>
            {cartItems.map((product) => (
              <Grid key={product.sl_no} item className={classes.grid2}>
                <Card className={classes.cardPart}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={`${ImageAPI}/${product.sl_no}.jpg`}
                      title='Contemplative Reptile'
                    />
                    <CardContent>
                      <Typography gutterBottom variant='h6' component='h2'>
                        {product.prd_Name}
                      </Typography>
                      <Typography gutterBottom variant='h8' component='h4'>
                        {`Rs. ${product.prd_Rate}`}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    {product.quantity > 0 && (
                      <Button
                        size='small'
                        style={{
                          color: '#1b242f',
                        }}
                        onClick={() => increase(product)}
                      >
                        <PlusCircleIcon width={'20px'} />
                      </Button>
                    )}
                    {product.quantity > 1 && (
                      <Button
                        size='small'
                        style={{
                          color: '#1b242f',
                        }}
                        onClick={() => decrease(product)}
                      >
                        <MinusCircleIcon width={'20px'} />
                      </Button>
                    )}
                    {product.quantity === 1 && (
                      <Button
                        size='small'
                        style={{
                          color: '#1b242f',
                        }}
                        onClick={() => removeProduct(product)}
                      >
                        <TrashIcon width={'20px'} />
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </div>
      {/* Cart Details */}

      <div className='cart-details'>
        <CardDetails />
      </div>
    </div>
  );
};

export default CartProducts;
