import React from 'react'
import { render } from 'react-dom'
import Catalog from './components/App'
import './styles/App.css'
import catalog from './data/data.json'

render(
    <Catalog catalog={catalog}/>,
    document.getElementById('root')
);