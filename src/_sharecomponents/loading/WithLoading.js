import { useState } from "react"
import './WithLoading.css'

const WithLoading = (WrappedComponent) => {
    const WithLoadingCoponent = (props) => {
        const [isLoading, setIsLoading] = useState(false);
        
        const handleShowLoading = (isLoading) => {
            console.log('is loding...')
            console.log(isLoading)
            
            setIsLoading(isLoading)
        }

        return (
            <div className="loading-container">
                {   
                    isLoading &&
                    <div className="loading-content">
                        <div className="loading-main">
                            <h4>Loading...</h4>
                            <img src="images/loading.gif" />
                        </div>
                    </div>
                }
                <WrappedComponent {...props} showLoading={handleShowLoading}/>
            </div>
        )
    }
    return WithLoadingCoponent;
}

export default WithLoading;