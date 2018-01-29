import * as Constants from './constants';
import axios from 'axios';

export const getSchedulePrediction = (stopId) => {
    return axios.get(Constants.MBTA_PRED_API_URL, {
        params: {
            [`filter[${Constants.STOP_FILTER}]`]: stopId,
        }
    }).then((res)=> {
        return res.data.data.map((prediction)=> {
            return prediction.attributes.arrival_time;
        });
    });
};

export const getNextAshmontTime = () => {
    return getSchedulePrediction(Constants.ASHMONT_STOP_ID);
};

export const getNextBraintreeTime = () => {
    return getSchedulePrediction(Constants.BRAINTREE_STOP_ID);
};