import React from 'react'
import { Input, FormGroup, Label, FormFeedback } from 'reactstrap';


function MyFormInput({ id, name, type = 'text', onChange, value, invalid, valid, ...otherProps }) {
    return (
        <FormGroup>
            <Label htmlFor={name} style={{ marginBottom: "0px !important" }}>{id}</Label>
            <Input type={type} name={name} onChange={onChange} value={value} invalid={invalid} valid={valid} {...otherProps} />
            <FormFeedback invalid={invalid} valid={valid}>
                {invalid}
            </FormFeedback>
        </FormGroup>
    )
}

export default MyFormInput
