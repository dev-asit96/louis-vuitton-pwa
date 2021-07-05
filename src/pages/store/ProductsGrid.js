import React, { useContext } from 'react';

import { ProductsContext } from '../../contexts/ProductsContext';
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
  root: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  grid2: {
    width: 320,
  },

  control: {
    padding: theme.spacing(3),
  },
}));

const ProductsGrid = () => {
  const isInCart = (product) => {
    return !!cartItems.find((item) => item.sl_no === product.sl_no);
  };
  const { addProduct, cartItems, increase } = useContext(CartContext);
  const [spacing, setSpacing] = React.useState(6);
  const classes = useStyles();
  const { products } = useContext(ProductsContext);

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={10}>
          <Grid container justify='center' spacing={spacing}>
            {products.map((product) => (
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
                    {isInCart(product) && (
                      <Button
                        size='small'
                        style={{
                          color: '#1b242f',
                        }}
                        onClick={() => increase(product)}
                      >
                        Add More
                      </Button>
                    )}
                    {!isInCart(product) && (
                      <Button
                        size='small'
                        style={{
                          color: '#1b242f',
                        }}
                        onClick={() => addProduct(product)}
                      >
                        Add to cart
                      </Button>
                    )}
                    <Button
                      size='small'
                      style={{
                        color: '#1b242f',
                      }}
                    >
                      Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <div>
        {/*  <div className={styles.p__container}>
      <div className='row'>
        <div className='col-sm-8'>
          <div className='py-3'>{products.length} Products</div>
        </div>
        <div className='col-sm-4'>
          <div className='form-group'>
            <input
              type='text'
              name=''
              placeholder='Search product'
              className='form-control'
              id=''
            />
          </div>
        </div>
      </div>}

      <div className={styles.p__grid}>
        {products.map((product) => (
          <ProductItem key={product.sl_no} product={product} />
        ))}
      </div>
      <div className={styles.p__footer}></div>
    </div> */}
      </div>
    </>
  );
};

export default ProductsGrid;
