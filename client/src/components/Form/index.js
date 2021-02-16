import React, { useState, useEffect, useRef} from 'react';
import "./style.scss";
import API from '../../utils/API'
import { useAuth } from '../../contexts/AuthContext'
import { Alert, Card, Button, Form } from 'react-bootstrap'

export default function PurchaseForm() {
    const [formObject, setFormObject] = useState({
        symbol: "", 
        amount: 0        
    });
    const [currentPrice, setCurrentPrice] = useState();
    const [buyOrSell, setbuyOrSell] = useState();   
    const [error, setError] = useState();
    const [cashOnHand, setCashOnHand] = useState(10000); 

    const { currentUser, userData } = useAuth(); 

    function calculateTotal(){
        let total;
        if(formObject.symbol && formObject.amount){
            total = Number(currentPrice) * Number(formObject.amount)
        } else {
            total = ""
        }
        return total;
    }    
     
    function handleClick(event) {
        const {name, value} = event.target;
        setbuyOrSell(value);        
    }

    function handleInputChange(event) {        
        const { name, value } = event.target;
        setFormObject({...formObject, [name]: value})
        GetCurrentPrice(formObject.symbol)          
    };

    function GetCurrentPrice(symbol) {             
        API.getCurrentPrice(symbol)
        .then(res => setCurrentPrice(res.data['Global Quote']['05. price']))
        .catch(err => console.log(err))
    }
    

    function handleSubmit(event) {
        event.preventDefault();
        // if(buyOrSell === "buy") {
            // if(calculateTotal() > userData.balance){
            //     setError("You don't have enough money")
            // } 
            // else {
    //             // setCashOnHand(cashOnHand - calculateTotal())
            API.saveBuyTransaction({
                email: currentUser.email,
                symbol: formObject.symbol.toUpperCase(),
                amount: formObject.amount,
                price: currentPrice                   
            })
            .then(res => console.log(res))                              
            .catch(err => console.log(err))   
                
                // API.investedMoeny({
                //     investedMoney: calculateTotal()
                // })
                // .then(res => console.log(res))
                // }    
    //     // }
    //     // else if(buyOrSell === "sell") {
            
    //     //     API.saveTransaction({
    //     //         user: currentUser.email,
    //     //         symbol: formObject.symbol,
    //     //         amount: formObject.amount,
    //     //         buyOrSell: buyOrSell
    //     //     })
    //     //     .then(res => console.log(res))
    //     //     .catch(err => console.log(err))
    //     // }
    //     console.log(`
    //         ${formObject.symbol},
    //         ${formObject.amount},
    //         ${currentUser.email},
    //         ${buyOrSell}          
    //     `)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h1 className="text-center mb-4">Buy a stock</h1>                                        
                    {error && <Alert variant="danger">{error}</Alert> }
                    <Form >
                        <Form.Group id="symbol">
                            <Form.Label>Symbol</Form.Label>
                            <Form.Control type="input"
                                name="symbol" 
                                onChange={handleInputChange}
                            />
                        <div id="previewPrice" className="form-text text-muted">current price: {currentPrice}</div>    
                        </Form.Group>
                        <Form.Group id="amount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="number" 
                                name="amount" 
                                onChange={handleInputChange}
                            />
                        <div id="previewTotal" className="form-text text-muted">Total: {calculateTotal()}</div>
                        </Form.Group>
                        <Button onClick={handleSubmit} type="submit" className="btn w-100" style={{backgroundColor: "#FD0000"}}>Purchase</Button>
                        
                    </Form>
                </Card.Body>
            </Card>
            
        </>

        // <div>
        //     <form>
        //         {error && <Alert variant="danger">{error}</Alert> }
        //         <div className="form-group row">
        //             <form-label htmlFor="searchSymbol" className="col-xs-2 col-form-label">Symbol</form-label>
        //             <div className="col-xs-1">
        //                 <input type="input" 
        //                     name="symbol" 
        //                     className="form-control" 
        //                     id="searchSymbol"
        //                     onChange={handleInputChange} 
        //                     // ref={symbolRef} 
        //                     />
        //                 <div id="previewPrice" className="form-text text-muted">current price: {currentPrice}</div>
        //             </div>
        //         </div>
        //         <div className="form-group row">
        //             <form-label htmlFor="searchShares" className="col-xs-2 col-form-label">Shares</form-label>
        //             <div className="col-xs-1">
        //                 <input type="input" 
        //                 name="amount" 
        //                 className="form-control" 
        //                 id="searchShares" 
        //                 onChange={handleInputChange} 
        //                 />
        //                 <div id="previewTotal" className="form-text text-muted">Total: {calculateTotal()}</div>
        //             </div>
        //         </div>

        //         {/* <div className="form-check form-check-inline">
        //             <input className="form-check-input" 
        //                 type="radio" 
        //                 name="buy" 
        //                 id="inlineBuy" 
        //                 value="buy"
        //                 onClick={handleClick}/>
        //             <form-label className="form-check-form-label" htmlFor="inlineBuy">Buy</form-label>
        //             <input className="form-check-input" 
        //                 type="radio" 
        //                 name="sell" 
        //                 id="inlineSell" 
        //                 value="sell" 
        //                 onClick={handleClick}/>
        //             <form-label className="form-check-form-label" htmlFor="inlineSell">Sell</form-label>
        //         </div> */}

        //         <div className="form-group row">
        //             <div className="col-sm-10">
        //                 <button onClick={handleSubmit} type="submit" className="btn btn-danger">Submit</button>
        //             </div>
        //         </div>
        //     </form>
        // </div>
    )
}
