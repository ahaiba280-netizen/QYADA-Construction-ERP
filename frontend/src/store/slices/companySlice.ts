import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Company {
  id: string;
  name: string;
  name_ar: string;
  currency: string;
}

interface CompanyState {
  companies: Company[];
  selectedCompany: Company | null;
}

const initialState: CompanyState = {
  companies: [],
  selectedCompany: null
};

const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    setCompanies: (state, action: PayloadAction<Company[]>) => {
      state.companies = action.payload;
    },
    setSelectedCompany: (state, action: PayloadAction<Company>) => {
      state.selectedCompany = action.payload;
      localStorage.setItem('selectedCompany', JSON.stringify(action.payload));
    }
  }
});

export const { setCompanies, setSelectedCompany } = companySlice.actions;
export default companySlice.reducer;
