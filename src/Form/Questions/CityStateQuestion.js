import React, { Component } from "react";
import styled, { ThemeContext, keyframes } from "styled-components";
import PropTypes from "prop-types";
import { FormConsumer } from "../FormProvider";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash.throttle";

const QuestionContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  min-width: 275px;
`;

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const useStyles = makeStyles(theme => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2)
  }
}));

const GeoInputContainer = props => {
  const classes = useStyles();
  const initialAnswer =
    props.answer && props.answer.length ? props.answer[0] : "";
  const [inputValue, setInputValue] = React.useState("");

  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);
  
  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      if (!window.google_maps_apiKey) {
        window.alert("window.google_maps_apiKey must be provided")
      }
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${window.google_maps_apiKey}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
    }

    loaded.current = true;
  }

  const handleChange = event => {
    setInputValue(event.target.value);
  };

  const handleSelect = newValue => {
    if (newValue) {
      props.onSelect(newValue.description);
    }
  };

  const fetch = React.useMemo(
    () =>
      throttle((input, callback) => {
        autocompleteService.current.getPlacePredictions(input, callback);
      }, 200),
    []
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions([]);
      return undefined;
    }

    fetch({ input: inputValue }, results => {
      if (active) {
        setOptions(results || []);
      }
    });

    return () => {
      active = false;
    };
  }, [inputValue, fetch]);

  return (
    <Autocomplete
      id="google-map-demo"
      defaultValue={{ description: initialAnswer }}
      style={{ width: 300 }}
      getOptionLabel={option => {
        return option.description;
      }}
      filterOptions={x => x}
      options={options}
      autoComplete
      includeInputInList
      freeSolo
      onChange={(e, value) => handleSelect(value)}
      // disableOpenOnFocus
      renderInput={params => {
        return (
          <TextField
            {...params}
            label="City, State"
            variant="outlined"
            fullWidth
            onChange={handleChange}
          />
        );
      }}
      renderOption={option => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map(match => [match.offset, match.offset + match.length])
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400
                  }}
                >
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
};

class CityStateQuestion extends Component {
  static propTypes = {
    answer: PropTypes.array.isRequired
  };

  static defaultProps = {
    answer: []
  };

  componentDidMount() {}
  componentDidUpdate() {}

  onClick = (question, choice, cb, context) => {
    if (!context.static) {
      if (cb && typeof cb === "function") {
        cb(
          {
            question,
            answer: [choice]
          },
          context
        );
      }
    }
  };

  render() {
    return (
      <ThemeContext.Consumer>
        {themeContext => {
          return (
            <FormConsumer>
              {context => {
                return (
                  <QuestionContainer>
                    <GeoInputContainer
                      isStatic={context.static}
                      answer={this.props.answer}
                      onSelect={answer =>
                        this.onClick(
                          context.activeStateContent.question,
                          answer,
                          context.cb,
                          context
                        )
                      }
                    />
                  </QuestionContainer>
                );
              }}
            </FormConsumer>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

export { CityStateQuestion };
