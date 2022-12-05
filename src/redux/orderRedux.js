import {createAsyncThunk} from "@reduxjs/toolkit";
import {publicRequest} from "../requestMethods";

export const deleteOrderThunk = createAsyncThunk(
    'orders/deleteOrder',
    async (orderId) => {
        const response = await publicRequest.delete("/orders/delete/" + orderId);
        return response.data;
    })