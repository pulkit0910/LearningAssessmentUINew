// src/components/CustomLoading.js
import React from 'react';
import './CustomLoading.css';

const CustomLoading = () => {
    return (
        <div className="loading-overlay">
            <div className="loading-container">
                <div className="loading-spinner">
                    <div className="spinner">
                        <div className="dot1"></div>
                        <div className="dot2"></div>
                    </div>
                </div>
                <div className="loading-text">Loading...</div>
            </div>
        </div>
    );
};

export default CustomLoading;
