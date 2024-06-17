import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";


// don't need to render since app.js is already rendered

export default class CreateRoomPage extends Component{
    defaultVotes = 2;

    constructor(props) {
        super(props); //parent constructor

        // react state to track what is on our form
        this.state = {
            guestCanPause: true,
            votesToSkip: this.defaultVotes,
          };

        this.handleRoomButtonPressed = this.handleRoomButtonPressed.bind(this); // can't use the 'this' keyword without binding method to the class
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    }

    handleVotesChange(e) { // e is the object that called the function
        this.setState({
          votesToSkip: e.target.value,
        });
    }

    handleGuestCanPauseChange(e) {
        this.setState({
          guestCanPause: e.target.value === "true" ? true : false, // ? <-- if true then make it true, else make it "false"
        });
    }

    handleRoomButtonPressed() {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            votes_to_skip: this.state.votesToSkip,
            guest_can_pause: this.state.guestCanPause,
          }),
        };
        fetch("/api/create-room", requestOptions)
          .then((response) => response.json())
          .then((data) => console.log(data));
    }

    render() {
        return(
            <Grid container spacing={1}> {/*1 = 8ox*/}
                <Grid item xs={12} align="center"> {/* width of the grid is 12. Max value. */}
                    <Typography componenet='h4' variant='h4'>
                        Create a Room
                    </Typography>
                </Grid>
                <Grid item xs={12} align="center"> {/* width of the grid is 12. Max value. */}
                    <FormControl component="fieldset">
                        <FormHelperText>
                            <div align="center">Guest Control of Playback State</div>
                        </FormHelperText>
                        <RadioGroup 
                            row 
                            defaultValue="true"
                            onChange={this.handleGuestCanPauseChange}
                        >

                            <FormControlLabel 
                                value="true"
                                control={<Radio color="primary" />}
                                label="Play/Pause"
                                labelPlacement="bottom"
                            />
                            <FormControlLabel
                                value="false"
                                control={<Radio color="secondary" />}
                                label="No Control"
                                labelPlacement="bottom"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <FormControl>
                        <TextField
                            required={true}
                            type="number"
                            onChange={this.handleVotesChange}

                            defaultValue={this.defaultVotes} // the value defined above
                            inputProps={{
                                min: 1, // min value for text field is 1
                                style: { textAlign: "center" },
                            }}
                        />
                        <FormHelperText>
                            <div align="center">Votes Required To Skip Song</div>
                        </FormHelperText>
                    </FormControl>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.handleRoomButtonPressed}
                    >
                        Create A Room
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" to="/" component={Link}> {/* this button will act as a link */}
                        Back
                    </Button>
                </Grid>
            </Grid>
        );

    }
}