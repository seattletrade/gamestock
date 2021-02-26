import React, { useState, useEffect, useRef } from 'react';
import "./style.scss";
import API from '../../utils/API'
import { useAuth } from '../../contexts/AuthContext'
import { Alert, Card, Button, Form, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

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
    const [foundStock, setfoundStock] = useState("")
    const [numberOfStocks, setNumberOfStocks] = useState(0)

    const { currentUser } = useAuth();

    function calculateTotal() {
        let total;
        if (formObject.symbol && formObject.amount) {
            total = Number(currentPrice) * Number(formObject.amount)
        } else {
            total = ""
        }
        return total;
    }

    function handleClick(event) {
        const { name, value } = event.target;
        setbuyOrSell(value);
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
        // GetCurrentPrice(formObject.symbol)
        let newArr = stocksPortfolio.filter(stock => {
            console.log(stock.symbol === formObject.symbol.toUpperCase().trim())
            return stock.symbol === formObject.symbol.toUpperCase().trim()
        });
        if (newArr.length) {
            setfoundStock(newArr[0].symbol)
            setNumberOfStocks(newArr[0].amount)
        }
    };

    function GetCurrentPrice(symbol) {
        API.getCurrentPrice(symbol)
            .then(res => setCurrentPrice(parseFloat(res.data['Global Quote']['05. price'])).toFixed(2))
            .catch(err => console.log(err))
    }


    useEffect(() => {
        console.log("hello " + formObject)
        GetCurrentPrice(formObject.symbol)
    }, [formObject])

    useEffect(() => {
        API.getUserData(currentUser.email)
            .then(data => setUserBalance(data.data.balance))
        API.getAllStocks(currentUser.email)
            // .then(data => console.log(data.data)) 
            .then(data => setStocksPortfolio(data.data))

    }, [])

    function handleSubmit(event) {
        event.preventDefault();
        console.log("userBalance", userBalance)
        console.log(buyOrSell)
        console.log(stocksPortfolio)
        if (buyOrSell === "buy") {
            if (calculateTotal() > userBalance) {
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
        if (buyOrSell === "sell") {
            console.log(foundStock)
            console.log(numberOfStocks)
            if (foundStock === "") {
                setError(`You don't own any ${formObject.symbol.toUpperCase().trim()} shares`)
            }
            else if (parseInt(formObject.amount) > parseInt(numberOfStocks)) {
                setError(`You only have ${numberOfStocks} ${formObject.symbol.toUpperCase().trim()} shares to sell`)
            } else {
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
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h1 className="text-center mb-4 text-white" style={{ backgroundColor: "#FD0000" }}>Trading Desk: Trade Shares Here</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form >
                        <Form.Group id="symbol">
                            <Form.Label>Symbol</Form.Label>
                            <Form.Control type="input"
                                name="symbol"
                                onChange={handleInputChange}
                            />
                            <div id="previewPrice" className="form-text text-muted">Current price: {currentPrice}</div>
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
                                checked={buyOrSell === "buy"}
                                onChange={handleClick} />
                        </label>
                        <label className="ml-3">
                            Sell
                            <input className="mx-1"
                                type="radio"
                                value="sell"
                                checked={buyOrSell === "sell"}
                                onChange={handleClick} />
                        </label>
                        <Button onClick={handleSubmit} type="submit" className="btn w-100" style={{ backgroundColor: "#FD0000" }}>Complete Transaction</Button>
                    </Form>
                </Card.Body>
            </Card>

        </>
    )
}
