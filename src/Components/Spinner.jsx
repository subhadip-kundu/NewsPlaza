import React, { Component } from 'react'
import loading from '../assets/loading.gif'

export class Spinner extends Component {
    render() {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh', width: '100%' }}>
                <img src={loading} alt={loading} />
            </div>
        )
    }
}

export default Spinner;