import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const DockHeader = styled.div`
  color: #888;
  height: 1.5rem;
  width: 100%;
  background: #DDD;
  display: flex;
  flex-direction: row;
  line-height: 1.5rem;
  margin: auto 0;
  justify-content: space-between;
`;

const HeaderTitle = styled.div`
  display: flex;
  flex-direction: row;
  line-height: 1.5rem;
  margin: auto 0;
  padding-left: 5px;
`;

const HeaderIcons = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 5px;
  line-height: 1.5rem;
  margin: auto 0;
  svg {
    padding-left: 5px;
    cursor: pointer;
  }
`;


const DockUnstyled = (props: {
    children: React.ReactNode
    onSplitVertical: () => void
    onSplitHorizontal: () => void
    onClose: () => void
    className?: string
}) => {
    return (
        <div className={props.className}>
            <DockHeader>
                <HeaderTitle>
                    Header
                </HeaderTitle>
                <HeaderIcons>
                    <FontAwesomeIcon icon="grip-lines" onClick={props.onSplitHorizontal}/>
                    <FontAwesomeIcon icon="grip-lines-vertical" onClick={props.onSplitVertical}/>
                    <FontAwesomeIcon icon="times" onClick={props.onClose}/>
                </HeaderIcons>
            </DockHeader>
            {props.children}
        </div>
    )
};

export default styled(DockUnstyled)`
  background: #FAFAFA;
  width: 100%;
  height: 100%;
`;