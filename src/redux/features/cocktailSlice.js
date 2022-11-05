import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cocktails: [],
  cocktail: [],
  loading: false,
  error: null,
};

export const fetchCocktails = createAsyncThunk(
  "cocktails/fetchCocktails",
  async () => {
    return fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
    ).then((res) => res.json());
  }
);

export const fetchSingleCocktail = createAsyncThunk(
  "cocktails/fetchSingleCocktail",
  async ({ id }) => {
    return fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    ).then((res) => res.json());
  }
);

export const fetchSearchCocktail = createAsyncThunk(
  "cocktails/fetchSearchCocktail",
  async ({ searchTxt }) => {
    return fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTxt}`
    ).then((res) => res.json());
  }
);

const cocktailSlice = createSlice({
  name: "cocktails",
  initialState: initialState,
  extraReducers: {
    [fetchCocktails.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchCocktails.fulfilled]: (state, action) => {
      state.loading = false;
      state.cocktails = action.payload.drinks;
      console.log("fetch : " + state.cocktails?.length);
    },
    [fetchCocktails.rejected]: (state, action) => {
      state.loading = false;
      state.cocktails = action.payload;
    },
    [fetchSingleCocktail.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchSingleCocktail.fulfilled]: (state, action) => {
      state.loading = false;
      state.cocktail = action.payload.drinks;
    },
    [fetchSingleCocktail.rejected]: (state, action) => {
      state.loading = false;
      state.cocktail = action.payload;
    },
    [fetchSearchCocktail.pending]: (state, action) => {
      state.loading = true;
    },
    [fetchSearchCocktail.fulfilled]: (state, action) => {
      state.loading = false;
      state.cocktails = action.payload.drinks;
      console.log("search : " + state.cocktails?.length);
    },
    [fetchSearchCocktail.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default cocktailSlice.reducer;
