import React, { useState, useEffect, useRef} from 'react';
import "./style.scss";
import API from '../../utils/API'
import { useAuth } from '../../contexts/AuthContext'
import { Alert, Card, Button, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import {useHistory} from 'react-router-dom';

export default function PurchaseForm() {
    const history = useHistory();
    const [formObject, setFormObject] = useState({
        symbol: "", 
        amount: 0        
    });
    const [currentPrice, setCurrentPrice] = useState();
    const [buyOrSell, setbuyOrSell] = useState("buy");   
    const [error, setError] = useState();    
    const [userBalance, setUserBalance] = useState(0)
    const [stocksPortfolio, setStocksPortfolio] = useState([])

    const { currentUser } = useAuth(); 

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
         

    useEffect(()=>{
        API.getUserBalance(currentUser.email)        
        .then(data => setUserBalance(data.data.balance))  
        API.getAllStocks(currentUser.email)
        // .then(data => console.log(data.data)) 
        .then(data => setStocksPortfolio(data.data))  
         
    }, [])
    

    function handleSubmit(event) {
        event.preventDefault();        
            console.log("userBalance",userBalance) 
            console.log(buyOrSell)  
            console.log(stocksPortfolio)
        if(buyOrSell ==="buy"){         
            if(calculateTotal() > userBalance){
                setError(`You don't have enough money. Your balance is ${userBalance}`)
            } 
            else {    
                API.saveBuyTransaction({
                    email: currentUser.email,
                    symbol: formObject.symbol.toUpperCase().trim(),
                    amount: formObject.amount,
                    price: currentPrice                   
                })
                .then(res => console.log(res))                              
                .catch(err => console.log(err))   

                history.push("/gamestock/user")               
            }   
        }
        if(buyOrSell === "sell"){
            stocksPortfolio.forEach(stock => {
                if(!stock.symbol.includes(formObject.symbol.toUpperCase().trim())){
                    setError(`You don't own any ${formObject.symbol.toUpperCase().trim()} shares`)
                    return;
                }
            })
            stocksPortfolio.forEach(stock => {
                if(stock.symbol.includes(formObject.symbol.toUpperCase().trim()) && stock.amount <= parseFloat(formObject.amount)){
                    setError(`You only have ${stock.amount} shares to sell`)
                    return;
                }                  
            })
            API.saveSellTransaction({
                email: currentUser.email,
                symbol: formObject.symbol.toUpperCase().trim(),
                amount: formObject.amount,
                price: currentPrice 
            })
            .then(data => console.log("selling info", data))  
            .catch(err => console.log(err))

            history.push("/gamestock/user") 
        }  
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

                        <label>
                            Buy 
                            <input className="mx-1"
                                type="radio"
                                value="buy"
                                checked={buyOrSell==="buy"}
                                onChange={handleClick}/>
                        </label>
                        <label className="ml-3">
                            Sell 
                            <input className="mx-1"
                                type="radio"
                                value="sell"
                                checked={buyOrSell==="sell"}
                                onChange={handleClick}/>
                        </label>                        
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
