import React from 'react'
import { Input, FormGroup, Label, FormFeedback } from 'reactstrap';


function FormInput({ id, type = 'text', onChange, value  , invalid ,valid, ...otherProps }) {
    return (
        <FormGroup>
            <Label htmlFor={id}>{id}</Label>
            <Input type={type} name={id} id={id} onChange={onChange} value={value} invalid={invalid} valid={valid} {...otherProps} />
            <FormFeedback invalid={invalid} valid={valid}>
                {invalid}
            </FormFeedback>
        </FormGroup>
    )
}

export default FormInput
