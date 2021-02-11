import React from 'react';
import { Link } from "react-router-dom";


export default function Homepage() {
    
    return (
        <div >
            <div className="row my-5 py-5" style = {{background: 'lightblue'}}>
                <div className="col-lg-6 ">
                    <h2 className="my-3 py-3">Learn Investing Without Risking Your Hard Earned Money </h2>
                    <p>Stock prices are volatile. Investing your hard earned money on stocks is inherently risky. Learning to make a successful investment in stocks takes time and requires the investor to accept some level of risk. This app will let your experment investing with a fake money, essentially throwing the risk element of investing in a galaxy far far away.</p>
                    <div>
                        <Link to="/gamestock/signup">
                          <button className="btn btn-lg btn-success">Sign Up</button>
                        </Link>                        
                    </div>                    
                </div>
                <div className="col-lg-6 ">
                    <img style={{width: '100%', height: '100%'}} src="https://investmentu.com/wp-content/uploads/2020/01/types-of-investment-funds.jpg"/>
                </div>
            </div>
        </div>
    )
}
