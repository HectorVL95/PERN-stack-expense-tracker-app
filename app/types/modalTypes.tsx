import { Dispatch, SetStateAction } from 'react';

export type ModalCreateExpenseTypeProps = {
  visibleModal: boolean,
  hideModal: () => void,
  refetch: () => void,
  dateRangeId: string
  createExpenseForm: {
    name: string,
    amount: string,
    location: string,
    image: string
  },
  setCreateExpenseForm: Dispatch<SetStateAction<{ 
    name: string; 
    amount: string; 
    location: string; 
    image: string; 
  }>>,
  imageSelected: null | string,
  setImageSelected: Dispatch<SetStateAction<string | null>>
}

export type ModalCreateDateTypeProps = {
  visibleModal: boolean,
  refetch: () => void,
  hideModal: () => void,
  createDateRangeForm: {
    fromDate: Date,
    toDate: Date
  },
  setCreateDateRangeForm: Dispatch<SetStateAction<{
    fromDate: Date,
    toDate: Date
  }>>,
  budget: string,
  setBudget: Dispatch<SetStateAction<string>>
}