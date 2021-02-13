import React from 'react';
import "./style.scss";

export default function Form() {
    return (
        <>
            <form>
                <div className="form-group row">
                    <form-label for="searchSymbol" className="col-xs-2 col-form-label">Symbol</form-label>
                    <div className="col-xs-1">
                        <input type="input" className="form-control" id="searchSymbol" />
                        <div id="previewPrice" className="form-text text-muted">Preview current price here</div>
                    </div>
                </div>
                <div className="form-group row">
                    <form-label for="searchShares" className="col-xs-2 col-form-label">Shares</form-label>
                    <div className="col-xs-1">
                        <input type="input" className="form-control" id="searchShares" />
                        <div id="previewTotal" className="form-text text-muted">Preview TX total here</div>
                    </div>
                </div>

                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineBuy" value="buy" />
                    <form-label className="form-check-form-label" for="inlineBuy">Buy</form-label>
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineSell" value="sell" />
                    <form-label className="form-check-form-label" for="inlineSell">Sell</form-label>
                </div>

                <div className="form-group row">
                    <div className="col-sm-10">
                        <button type="submit" className="btn btn-danger">Submit</button>
                    </div>
                </div>
            </form>
        </>
    )
}
