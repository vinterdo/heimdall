import React, {useState} from "react";
import Select from "react-select";
import styled from "styled-components";

const ParamsRendererWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WindowRenderer = (props: {params: string[]}) => {
    const options = props.params.map(s => {return {value: s, label: s}});
    return (
        <div>
            <Select options={options}/>
        </div>
    )
};

const ParamsRenderer = (props: { onSubmit: (params: any) => void }) => {
    const [options, setOptions] = useState<string>("");

    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        setOptions(event.currentTarget.value);
    };

    const onClick = () => {
        props.onSubmit(options.split(",").map(s => s.trim()))
    };

    return (
        <ParamsRendererWrapper>
            <input type={"text"} onChange={onChange}/>
            <button onClick={onClick}>OK</button>
        </ParamsRendererWrapper>
    )
};

export default {WindowRenderer, ParamsRenderer}