import React from 'react'
import Home from './routes/home'
import NewSpot from './routes/new-spot'
import { Routes, Route } from "react-router-dom";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="new-spot" element={<NewSpot />} />
        </Routes>
    )
}

