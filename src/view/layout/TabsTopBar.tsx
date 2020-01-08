import styled from "styled-components";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../store/store";
import {useState} from "react";
import {createNewTab, switchTab} from "../../store/ducks/layout/actions";

const PlusButton = styled.button`
  background: #EEE;
`;

const TabsTopBar = (props: { className?: string }) => {
    const tabs = useSelector((state: AppState) => Object.keys(state.layout.tabs));
    const currentTab = useSelector((state: AppState) => state.layout.currentTab);
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

    const onTabClick = (tabName: string) => () => {
        dispatch(switchTab(tabName));
    };

    return (
        <div className={props.className}>
            {
                tabs.map(tab =>
                    <button key={tab}
                            onClick={onTabClick(tab)}
                            style={{background: currentTab === tab ? "#DDD" : "#EFEFEF"}}>
                        {tab}
                    </button>)
            }
            {isAdding && <input type={"text"} onChange={onNameChange}/>}
            <PlusButton onClick={onPlus}>+</PlusButton>
        </div>
    );
};

export default styled(TabsTopBar)`
  display: flex;
  flex-direction: row;
  &>button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border: none;
    border-right: 2px solid white;
  }
`;