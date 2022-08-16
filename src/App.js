import React from 'react'
import Navbar from './components/Navbar'
import Info from './components/Info'
import Map from './components/Map'

function App() {
    return (
        <div>
            <Navbar />
            
                <div className="contacts">
                    <Info title={"Past Spottings"} />
                    
                </div>
                <Map className='map'/>
            
        </div>
    )
}

export default App
