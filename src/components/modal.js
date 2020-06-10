import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const Flex = styled.div`
    display: ${props => props.d && props.d};
    flex-grow : ${props => props.fg && '1'};
    flex-basis : ${props => props.fb && props.fb};
`;


const priceTemplate = (price) => {
    let priceInfo = ['1 Week - Month', '6 Months', '1 Year'];
    return price.map((p, i) => {
    return (
        <div className="flex" style={{padding: '1rem 0'}}>
            <Flex d="flex" fb={'50%'}>{priceInfo[i]}</Flex> 
            <Flex d="flex" fb={'50%'} style={{justifyContent: 'flex-end'}}>$ {p}</Flex>
        </div>)
    })  
}

const ModalPop = (props) => {
    const selectedData = props.selectedOption;
    return (
  <Modal
    isOpen={!!props.selectedOption}
    onRequestClose={props.handleClearSelectedOption}
    contentLabel="Selected Option"
    closeTimeoutMS={200}
    ariaHideApp={false}
    className="modal_pop"
  >
    {
        props.selectedOption && <div>
            <Flex className="flex" style={{alignItems: 'flex-end'}}>
                <img src={props.selectedOption.image_url} style={{width: '40%'}}/>
                <span style={{margin: '0 1rem'}}>
                    {props.selectedOption.name}
                    <p style={{color: '#999'}}>{props.selectedOption.region}</p>
                </span>
            </Flex>
            <Flex style={{margin: '3.5rem auto'}}>
                <h2 className="modal__title">Pricing</h2>
                <div>{ priceTemplate(props.selectedOption.price) }</div>
            </Flex>
        </div>
    }
  </Modal> 
    )
    };

export default ModalPop;
