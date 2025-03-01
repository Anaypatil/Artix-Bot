import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/context';
import RazorpayPayment from '../Payment/RazorpayPayment'; // Ensure this path is correct

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);

    return (
        <div className="main">
            <div className="nav">
                <p>Artix</p>
                <img src={assets.user_icon} alt="User Icon" />
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <h5><span>Hello,</span></h5>
                            <h9>This is Artix </h9>
                            <h10>Your Museum Ticketing Bot! </h10>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Museum visit: Time flies, but exhibits don't!</p>
                                <img src={assets} alt="" />
                            </div>
                            <div className="card">
                                <p>Museum gift shop: Souvenirs older than time!</p>
                                <img src={assets} alt="" />
                            </div>
                            <div className="card">
                                <p>Why run? The artifacts aren’t going anywhere.</p>
                                <img src={assets} alt="" />
                            </div>
                            <div className="card">
                                <p>Museum: Where even the statues have stories.</p>
                                <img src={assets} alt="" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='result'>
                        <div className='result-title'>
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className='result-data'>
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? (
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input 
                            onChange={(e) => setInput(e.target.value)} 
                            value={input} 
                            type="text" 
                            placeholder="How can I help you today?" 
                        />
                        <div>
                            {input ? <img onClick={() => onSent()} src={assets.send_icon} alt="Send Icon" /> : null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Artix.... Making things simpler
                    </p>
                    
                    {/* RazorpayPayment component should render the button */}
                    <RazorpayPayment />
                </div>
            </div>
        </div>
    );
}

export default Main;
