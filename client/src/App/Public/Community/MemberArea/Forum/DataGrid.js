import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import ButtonBase from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import Hidden from 'material-ui/Hidden';
import { withStyles } from 'material-ui/styles';
import { LinkContainer } from 'react-router-bootstrap';
import SimpleDialog from '../../../Widgets/SimpleDialog';
import { TextVariants } from '../../../Widgets/BreakProps';

const DataGrid = ({
  children, title, newLabel, handleSubmit,
}) => (
  <div>
    {title &&
      <TextVariants
        noWrap
        keyBase={newLabel}
        children={title}
        breaks={{
          xs: 'headline',
          sm: 'display1',
          'md lg xl': 'display2',
        }}
      />
    }
    <SimpleDialog label={newLabel} {...{ handleSubmit }} />
    <Grid container spacing={0}>
      {children}
    </Grid>
  </div>
);
DataGrid.propTypes = {
  title: PropTypes.string,
  newLabel: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
DataGrid.defaultProps = { title: null };

DataGrid.Link = ({ to, children }) => {
  if (!to) return children;
  return <LinkContainer to={to}>{children}</LinkContainer>;
}

DataGrid.Item = withStyles(theme => ({
  root: {
    width: '95%',
    border: `1px solid ${theme.palette.grey.A700}`,
    backgroundColor: 'transparent',
    borderRadius: '0',
    padding: '2em',
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
        <Typography variant="subheading">
          {primary}
        </Typography>
        <div>
          <Hidden xsDown>
            {captions.map((caption, key) => (
              <Typography variant="caption" {...{ key }}>
                {caption}
              </Typography>
            ))}
          </Hidden>
        </div>
      </ButtonBase>
    </Grid>
  </DataGrid.Link>
));

DataGrid.Item.propTypes = {
  primary: PropTypes.string.isRequired,
  captions: PropTypes.arrayOf(PropTypes.string),
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    state: PropTypes.any.isRequired,
  })]),
};

export default DataGrid;
