import styled from "styled-components";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store/store";
import {useState} from "react";
import {createNewTab} from "../../store/ducks/layout/actions";

const TabsTopBar = (props: { className?: string }) => {
    const tabs = useSelector((state: AppState) => Object.keys(state.layout.tabs));
    const [newTabName, setNewTabName] = useState<string | null>(null);
    const dispatch = useDispatch();
    const [isAdding, setAdding] = useState<boolean>(false);

    const onPlus = () => {
        if(isAdding) {
            setAdding(false);
            if(!newTabName) {
                return;
            }
            dispatch(createNewTab(newTabName));
        }
        else {
            setAdding(true);
        }
    };

    const onNameChange = (event: any) => {
        setNewTabName(event.target.value);
    };

    return (
        <div className={props.className}>
            {tabs.map(tab => <button key={tab}> {tab} </button>)}
            {isAdding && <input type={"text"} onChange={onNameChange}/>}
            <button onClick={onPlus}>+</button>
        </div>
    );
};

export default styled(TabsTopBar)`
  display: flex;
  flex-direction: row;
  &>button {
    padding: 0.2rem;
  }
`;