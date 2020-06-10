import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import moment from 'moment';

const Flex = styled.div`
    display: ${props => props.d && props.d};
    flex-grow : ${props => props.fg && '1'};
    flex-basis : ${props => props.fb && props.fb};
`;

const Popup = (props) => {
    console.log(props)
    var format_selectedDate= `${props.selectedDay.month}/${props.selectedDay.day}/${props.selectedDay.year}`
    var timestamp = new Date(format_selectedDate).getTime()
    let formattedDate = moment.unix((timestamp/1000)).format("MMMM Do, YYYY")
    return (
        <Modal
            isOpen={!props.showPopup}
            onRequestClose={props.showPopup}
            contentLabel="Selected Option"
            closeTimeoutMS={200}
            ariaHideApp={false}
            className="popup"
        >
            {
                props.value && <div>
                    <Flex>
                        <h2 className="popup_title">Date is changed to {formattedDate}.</h2>
                        <p className="popup_question_title">Do you want to continue ?</p>
                        <Flex d="flex" fb={'100%'}> 
                            <button className="popup_button" onClick={() => props.pop(true)}>Yes</button>
                            <button className="popup_button" onClick={() => props.pop(false)}>No</button>
                        </Flex>
                    </Flex>
                </div>
            }
        </Modal> 
    )
    };

export default Popup;
