import React from 'react'
import { Link } from 'react-router-dom';


function Page404() {
    return (
        <div className="text-center my-5">
            <h1>OOOPPS... 404 - PAGE NOT FOUND</h1>
            <Link to="/">Back to HomePage</Link>
        </div>
    )
}



export default Page404