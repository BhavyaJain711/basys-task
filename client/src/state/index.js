import { createSlice } from "@reduxjs/toolkit";
import console from "console";

const initialState={
    user:null,
    token:null,
    role:"null",
    refreshToken:null,
    accessTokenExpiresAt:null,
    notes:[]
}
export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.user= "Logged In";
            state.token=action.payload.token;
            state.refreshToken=action.payload.refreshToken;
            state.accessTokenExpiresAt=new Date(Date.now()+60*60*24*30*1000).getTime();
            state.role=action.payload.role;

        },
        setAccessToken:(state,action)=>{
            state.token=action.payload.token;  
        },
        setLogout:(state)=>{
            Object.assign(state,initialState);
        },
        saveNewNote:(state,action)=>{
            state.notes.push(action.payload.note);
        },
        deleteNoteById:(state,action)=>{
            state.notes=state.notes.filter(note=>note.id!==action.payload.id);
        },
        updateNoteById:(state,action)=>{
            state.notes=state.notes.map(note=>note.id===action.payload.id?action.payload.note:note);
        }

    }
})

export const {setLogin,setLogout,setAccessToken,saveNewNote,deleteNoteById,updateNoteById} = authSlice.actions;
export default authSlice.reducer;