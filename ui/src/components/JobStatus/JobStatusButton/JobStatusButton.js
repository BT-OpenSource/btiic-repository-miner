import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import JobStatusTable from '../JobStatusTable/JobStatusTable';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function JobStatusButton(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getNumOfCompletedCalls = () => {

        let numOfCompletedCalls = 0;

        props.activeCalls.forEach(call => {
            if (call.status === "Completed") {
                numOfCompletedCalls++;
            }
        })

        return numOfCompletedCalls
    }

    return (
        <div>
            <Button onClick={handleClickOpen} className="open-dialogue repeat-button" variant="outlined" color="secondary" >
                Job Progress {getNumOfCompletedCalls()}/{props.gitMode ? 12 : 10}</Button>

            <Dialog className="dialog" fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close" className="close-dialog">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Job Progress
            </Typography>
                    </Toolbar>
                </AppBar>
                <JobStatusTable activeCalls={props.activeCalls} />
            </Dialog>
        </div>
    );
}