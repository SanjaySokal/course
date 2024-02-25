import React from 'react'

const ImageProgress = (props) => {
    return (
        <>
            {
                props.load !== 100 ?
                    <div className="progress mb-3" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar bg-warning" style={{ width: props.load + "%" }}>
                            {props.load}%
                        </div>
                    </div>
                    :
                    <div className="progress mb-3" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                        <div className="progress-bar bg-primary" style={{ width: props.load + "%" }}>
                            file updated!
                        </div>
                    </div>
            }
        </>

    )
}

export default ImageProgress