import React from "react";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const AlbumCard = (props) => {
    return (
        <Grid item xs={2}>
            <Paper elevation={5} className="album__content-item">
                <div className="album_cover">
                    <img src={props.img} alt="cover name" />
                </div>
                <Box paddingX={1}>
                    <Typography variant="h5" component="h2" className="album__title">
                        {props.name}
                    </Typography>
                </Box>
            </Paper>
        </Grid>
    )
};

export default AlbumCard;