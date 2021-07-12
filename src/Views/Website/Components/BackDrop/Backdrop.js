import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection:'coumn',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  
  buttonProgress: {
    color: '#f50057',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function BackDrop(props) {
  const classes = useStyles();
  
 const timer = React.useRef();

  const buttonClassname = clsx({
    [classes.buttonSuccess]: props.type,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  

  return (
    <div className={classes.root}>
        <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          className={buttonClassname}
          disabled={props.loading}
          onClick={props.handleClick}
        >
          {props.name}
        </Button>
        {props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}