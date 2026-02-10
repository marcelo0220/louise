import React from 'react'
import { createRoot } from 'react-dom/client'
import LouiseShop from '../louise-shop.jsx'

const root = document.getElementById('root')
createRoot(root).render(
    <React.StrictMode>
        <LouiseShop />
    </React.StrictMode>
)
