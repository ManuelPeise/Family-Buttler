import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import PageLayout from './_layout/pageLayout';
import AddMenuDataService from './_pages/_cookingBook/AddMenuDataService';
import EditMenuDataService from './_pages/_cookingBook/EditMenuDataService';
import ViewMenuDataService from './_pages/_cookingBook/ViewMenuDataService';


const App: React.FC = () =>{
  
  return(
    <PageLayout>
      <Routes>
        <Route path="/" element={<div>Test</div>}/>
        <Route path="/cookingbook/view" element={<ViewMenuDataService />}/>
        <Route path="/cookingbook/add" element={<AddMenuDataService/>}/>
        <Route path="/cookingbook/edit" element={<EditMenuDataService/>}/>
      </Routes>
    </PageLayout>
  )
}

export default App;
