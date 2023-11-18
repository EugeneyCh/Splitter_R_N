export const SET_BILL_AMOUNT = 'SET_BILL_AMOUNT';
export const SET_TIP_PERCENTAGE = 'SET_TIP_PERCENTAGE';
export const SET_TIP_PERCENTAGE_CUSTOM = 'SET_TIP_PERCENTAGE_CUSTOM';
export const SET_NUMBER_OF_PEOPLE = 'SET_NUMBER_OF_PEOPLE';
export const SET_PERSONAL_TIP = 'SET_PERSONAL_TIP';
export const SET_PERSONAL_AMOUNT = 'SET_PERSONSL_AMOUNT';

export const RESET_ALL = 'RESET_ALL';

export interface AppState {
  billAmount: number;
  tipPercentage: number;
  tipPercentageCustom: number;
  numberOfPeople: number;
  amountTip: number;
  amountTotal: number;
}
export interface tipCount { tipCount: AppState }

interface SetBillAmountAction {
  type: typeof SET_BILL_AMOUNT;
  payload: number;
}

interface SetTipPercentageAction {
  type: typeof SET_TIP_PERCENTAGE;
  payload: number;
}
interface SetTipPercentageCustomAction {
  type: typeof SET_TIP_PERCENTAGE_CUSTOM;
  payload: number;
}

interface SetNumberOfPeopleAction {
  type: typeof SET_NUMBER_OF_PEOPLE;
  payload: number;
}
interface SetpersonalTipAction {
  type: typeof SET_PERSONAL_TIP;
  payload: number;
}
interface SetPersonalAmountAction {
  type: typeof SET_PERSONAL_AMOUNT;
  payload: number;
}
interface ResetAction {
  type: typeof RESET_ALL;
}

export type AppAction =
  | SetBillAmountAction
  | SetTipPercentageAction
  | SetTipPercentageCustomAction
  | SetNumberOfPeopleAction
  | SetPersonalAmountAction
  | SetpersonalTipAction
  | ResetAction;
