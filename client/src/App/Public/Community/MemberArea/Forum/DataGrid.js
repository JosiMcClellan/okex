import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import ButtonBase from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Hidden from 'material-ui/Hidden';
import { withStyles } from 'material-ui/styles';
import { LinkContainer } from 'react-router-bootstrap';

const DataGrid = ({ children, title }) => (
  <div>
    {title &&
      <Typography noWrap variant="display2">
        {title}
      </Typography>
    }
    <Grid container spacing={16}>
      {children}
    </Grid>
  </div>
);
DataGrid.propTypes = {
  title: PropTypes.string,
};

DataGrid.Link = ({ to, children }) => {
  if (!to) return children;
  return <LinkContainer to={to}>{children}</LinkContainer>;
};

DataGrid.Item = withStyles(theme => ({
  root: {
    width: '90%',
    border: `1px solid ${theme.palette.primary.A700}`,
    backgroundColor: theme.palette.primary.A100,
  },
  label: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
}))(({
  primary, captions, to,
  classes,
}) => (
  <DataGrid.Link to={to}>
    <Grid item xs={12} xl={6}>
      <ButtonBase variant="raised" {...{ classes }}>
        <Typography noWrap variant="subheading">
          {primary}
        </Typography>
        <div>
          <Hidden only="xs">
            {captions.map((caption, key) => (
              <Typography noWrap variant="caption" {...{ key }}>
                {caption}
              </Typography>
            ))}
          </Hidden>
        </div>
      </ButtonBase>
    </Grid>
  </DataGrid.Link>
));

// DataGrid.Item = ({ primary, captions, to }) => (
//   <DataGrid.Link to={to}>
//     <Grid item xs={12} lg={6} xl={4}>
//       <Test variant="raised" style={{ width: '100%', borderRadius: '5%' }}>
//         <Typography noWrap variant="subheading">
//           {primary}
//         </Typography>
//         <Hidden xsDown>
//           <div>
//             {captions.map((caption, key) => <DataGrid.Caption {...{ caption, key }} />)}
//           </div>
//         </Hidden>
//       </Test>
//     </Grid>
//   </DataGrid.Link>
// );
DataGrid.Item.propTypes = {
  primary: PropTypes.string.isRequired,
  captions: PropTypes.arrayOf(PropTypes.string),
};

DataGrid.Caption = ({ caption, key }) => (
  <Typography noWrap variant="caption" {...{ key }}>
    {caption}
  </Typography>
);
DataGrid.Caption.propTypes = {
  caption: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
};

export default DataGrid;
