import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { getAverage } from '../../lib/utils';
import { useData } from '../../lib/hooks';
import StarRating from '../common/StarRating';
import EditableStarRating from '../common/EditableStarRating';

export default function RatingInfo(props) {
    const {
        _id, subRatings, questions, fromConsumer, forProvider, onTransaction, comment, response,
        createdAt, updatedAt
    } = props;
    const { user } = useData('/api/user').data;
    const avgRating = getAverage(subRatings);
    const state = { subRatings:[] };
    state.comment = useState(comment);
    state.response = useState(response);
    for (let i = 0; i < subRatings.length; i++) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        state.subRatings[i] = useState(subRatings[i] || 0);
    }

    [state.commentDisabled, state.setCommentDisabled] = useState(true);
    [state.responseDisabled, state.setResponseDisabled] = useState(true);
    [state.ratingVisible, state.setRatingVisible] = useState(_id);
    [state.responseVisible, state.setResponseVisible] = useState(_id);

    const main_button = ()=>{
        if (_id) {
            return (<Button variant="secondary" onClick={onEdit}>Edit</Button>);
        } else if (!_id && user.consumer) {
            return (<Button variant="secondary" onClick={onCreate}>Create</Button>);
        }
        else return (<></>);
    };

    const details = [];
    for (let i = 0; i < questions.length; i++) {
        details.push(
            <Row key={questions[i] + state.commentDisabled}>
                <Col md={7}>{questions[i]}</Col>
                <Col md={4}>
                    <EditableStarRating edit={!state.commentDisabled}
                        onChange={(value)=>{
                            /*update the stateful rating of the element*/
                            state.subRatings[i][1](value);
                            //console.log(state.subRatings)
                        }} rating={subRatings[i]}></EditableStarRating>
                </Col>
            </Row>
        );
    }

    const consComment = (state.ratingVisible)
        ? <>
            <hr className="mt-2" />
            <h4 className="mt-4">Consumer Comment</h4>
            <hr className="mt-2 mb-4" />
            <Form.Control as="textarea" rows={3} name="comment"
                defaultValue={comment} disabled={state.commentDisabled} onChange={handleTextChange}/>
        </>
        : <></>;

    const provResponse = (state.ratingVisible && state.responseVisible)
        ? <>
            <hr className="mt-2" />
            <h4 className="mt-4">Provider Response</h4>
            <hr className="mt-2 mb-4" />
            <Form.Control as="textarea" rows={3} name="response"
                defaultValue={response} disabled={state.responseDisabled} onChange={handleTextChange}/>
        </>
        : <></>;

    return (
        <>
            <Row className="d-flex mb-0 mt-4">
                <Col md={7}>
                    <h3 >Rating</h3>
                </Col>
                <Col md={4}>
                    {(state.ratingVisible && avgRating > 0)
                        ? <StarRating rating={ avgRating }></StarRating>
                        : <></>
                    }
                </Col>
                <Col md={1}>
                    {main_button()}
                </Col>
            </Row>
            {(state.ratingVisible)
                ? <>
                    <hr className="mt-2" />
                    <h4 className="mt-4">Details</h4>
                    <hr className="mt-2 mb-4" />
                    {details}
                </>
                : <></>}
            {consComment}
            {provResponse}
            <hr className="mt-2" />
            <div className="text-center">
                {(!state.commentDisabled || !state.responseDisabled)
                    ? <Button variant="secondary" className="mt-2 col-md-3" md={3} onClick={onSubmit}>Submit</Button>
                    : <></>
                }
            </div>
        </>
    );

    function handleTextChange(event) {
        /*call the set method for the field by name */
        state[event.target.name][1](event.target.value);
    }

    function handleStarChange(event) {
        console.log(event);
    }

    function onSubmit() {
        /*If there is an existing id, any gurther submits edit the present rating*/
        if (_id) {
            /*consumer edits subRatings and comment*/
            if (user.consumer) {
                const ratingObj
                = {
                    subRatings: [
                        state.subRatings[0][0],
                        state.subRatings[1][0],
                        state.subRatings[2][0],
                        state.subRatings[3][0]
                    ],
                    msg : state.comment[0] };
                console.log(ratingObj);
                //edit rating endpoint
            }
            /*provider edits response*/
            else if (user.provider) {
                const rating = { response : state.response[0] };
                console.log(rating);
            }
        /*If there is not an existing id, post a new rating*/
        } else {
            if (user.consumer) {
                const ratingObj = {
                    byConsumer: user.DID,
                    forProvider: forProvider,
                    onTransaction: onTransaction,
                    subRatings: [
                        state.subRatings[0][0],
                        state.subRatings[1][0],
                        state.subRatings[2][0],
                        state.subRatings[3][0]
                    ],
                    msg: state.comment[0]
                };
                console.log(ratingObj);
            }
        }
    }

    function onEdit() {
        if (user.consumer) {
            state.setCommentDisabled(false);
        } else if (user.provider) {
            state.setResponseDisabled(false);
        }
    }

    function onCreate() {
        if (user.consumer) {
            state.setRatingVisible(true);
            state.setCommentDisabled(false);
        }
    }
}