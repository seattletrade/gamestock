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
                    <label for="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="inputPassword3" />
                    </div>
                </div>
                <fieldset className="form-group">
                    <div className="row">
                        <legend className="col-form-label col-sm-2 pt-0">Radios</legend>
                        <div className="col-sm-10">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked />
                                <label className="form-check-label" for="gridRadios1">
                                    First radio
          </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                                <label className="form-check-label" for="gridRadios2">
                                    Second radio
          </label>
                            </div>
                            <div className="form-check disabled">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled />
                                <label className="form-check-label" for="gridRadios3">
                                    Third disabled radio
          </label>
                            </div>
                        </div>
                    </div>
                </fieldset>
                <div className="form-group row">
                    <div className="col-sm-2">Checkbox</div>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck1" />
                            <label className="form-check-label" for="gridCheck1">
                                Example checkbox
        </label>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Sign in</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
