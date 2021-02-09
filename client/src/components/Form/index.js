import React from 'react';


export default function Form() {
    return (
        <div>
            <form>
                <div className="form-group row">
                    <label for="searchSymbol" className="col-sm-2 col-form-label">Symbol</label>
                    <div className="col-sm-2">
                        <input type="input" className="form-control" id="searchSymbol" />
                    </div>
                </div>
                <div className="form-group row">
                    <label for="searchShares" className="col-sm-2 col-form-label">Shares</label>
                    <div className="col-sm-2">
                        <input type="input" className="form-control" id="searchShares" />
                    </div>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineBuy" value="option1" />
                    <label className="form-check-label" for="inlineBuy">Buy</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineSell" value="option2" />
                    <label className="form-check-label" for="inlineSell">Sell</label>
                </div>

                <div className="form-group row">
                    <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
