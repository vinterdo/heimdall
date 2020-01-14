import {useState} from "react";
import * as React from "react";
import Autosuggest, {SuggestionSelectedEventData} from "react-autosuggest";
import windowFactory from "./WindowFactory";
import styled from "styled-components";

interface ISuggestion {
    name: string;
}

function escapeRegexCharacters(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value: string): ISuggestion[] {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return windowFactory.getAvailableTemplates();
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return windowFactory.getAvailableTemplates().filter(suggestion => regex.test(suggestion.name));
}

function getSuggestionValue(suggestion: { name: string }) {
    return suggestion.name;
}

function renderSuggestion(suggestion: { name: string }) {
    return (
        <span>{suggestion.name}</span>
    );
}

function shouldRenderSuggestions() {
    return true;
}

const onSuggestionSelected = (onSelected: (name: string) => void) => (
    _: React.FormEvent<any>,
    {suggestion}: SuggestionSelectedEventData<{ name: string }>) => {
    onSelected(suggestion.name);
};

const WindowSelect = (props: {
    id: string,
    onChange?: (id: string, newValue: string) => void,
    placeholder: string,
    onSelected?: (name: string) => void,
    className?: string
}) => {
    const [value, setValue] = useState<string>("");
    const [suggestions, setSuggestions] = useState<ISuggestion[]>(getSuggestions(""));

    const onChange = (_: any, {newValue}: { newValue: string }) => {
        const {id, onChange} = props;
        setValue(newValue);
        onChange && onChange(id, newValue)
    };

    const onSuggestionsFetchRequested = ({value}: { value: string }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const inputProps = {
        placeholder: props.placeholder,
        value,
        onChange: onChange
    };

    return (
        <div className={props.className}>
            <Autosuggest
                id={props.id}
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                shouldRenderSuggestions={shouldRenderSuggestions}
                onSuggestionSelected={props.onSelected && onSuggestionSelected(props.onSelected)}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        </div>
    );
};

export default styled(WindowSelect)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`