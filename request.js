import axios from 'axios';
import * as Constants from './constants';

export const getSchedulePrediction = stopId => axios.get(Constants.MBTA_PRED_API_URL, {
  params: {
    [`filter[${Constants.STOP_FILTER}]`]: stopId,
  },
}).then(res => res.data.data.map(prediction => prediction.attributes.arrival_time));

export const getNextAshmontTime = () => getSchedulePrediction(Constants.ASHMONT_STOP_ID);

export const getNextBraintreeTime = () => getSchedulePrediction(Constants.BRAINTREE_STOP_ID);
