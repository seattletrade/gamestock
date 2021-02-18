import React from 'react';
import { Link } from "react-router-dom";
import Form from "../components/Form";
import UserFormContainer from '../components/UserFormContainer'

export default function Tradepage() {
    return (
        <UserFormContainer>
            <div>
                <Form />
                {/* add modals to confirm, or confirmation page content? */}
            </div>
        </UserFormContainer>
    )
}
