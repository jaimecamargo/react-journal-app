import React from 'react';

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">

            <div
                className="journal__entry-picture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://www.publicdomainpictures.net/pictures/320000/nahled/background-image.png)'
                }}
            ></div>

            <div className="journal__entry-body">
                <p className="journal__entry_title">Un nuevo día</p>
                <p className="journal__entry-content">Mañana es un nuevo día para triunfar</p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>07</h4>
            </div>

        </div>
    )
}