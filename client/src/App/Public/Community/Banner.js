import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';

const Banner = withStyles(theme => ({
  root: {
    paddingTop: '100vh',
    margin: '-100vh 5% 1.5%',
    backgroundColor: theme.palette.primary.A200,
    borderRadius: '0 0 10% 10%',
    border: '1px solid black',
    zIndex: -25,
  },
}))(Paper);

export default Banner;
