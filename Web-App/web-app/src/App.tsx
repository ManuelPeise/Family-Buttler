import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import PageLayout from './_layout/pageLayout';
import LoggingDataservice from './_pages/_administartion/_logging/loggingDataService';
import AddMenuDataService from './_pages/_cookingBook/AddMenuDataService';
import EditMenuDataService from './_pages/_cookingBook/EditMenuDataService';
import ViewMenuDataService from './_pages/_cookingBook/ViewMenuDataService';
import LandingPageDataService from './_pages/_landingpage/landingPageDataService';


const App: React.FC = () =>{
  
  return(
    <PageLayout>
      <Routes>
        <Route path="/" element={<LandingPageDataService/>}/>
        <Route path="/cookingbook/view" element={<ViewMenuDataService />}/>
        <Route path="/cookingbook/add" element={<AddMenuDataService/>}/>
        <Route path="/cookingbook/edit" element={<EditMenuDataService/>}/>
        <Route path="/administration/logging" element={<LoggingDataservice/>}/>
      </Routes>
    </PageLayout>
  )
}

export default App;
