import {createAsyncThunk} from "@reduxjs/toolkit";
import {publicRequest} from "../requestMethods";

export const deleteProductThunk = createAsyncThunk(
    'products/deleteProduct',
    async (productId) => {
        const response = await publicRequest.delete("/products/delete/" + productId);
        return response.data;
    })

export const updateProductThunk = createAsyncThunk(
    'products/deleteProduct',
    async (product) => {
        const response = await publicRequest.put("/products/update/" + product._id, product);
        return response.data;
    })

