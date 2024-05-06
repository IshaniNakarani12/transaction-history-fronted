import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { CustomInpute, CustomSelect } from "./CustomInpute";
import { postNewTrans } from "../helpers/axiosHelper";
import { toast } from "react-toastify";

export const NewTransForm = ({ getUserTransactions }) => {
  const [form, setForm] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const { status, message } = await postNewTrans(form);

    toast[status](message);

    status === "success" && getUserTransactions();
  };

  const inputs = [
    {
      // label: "Type",
      name: "type",
      // type: "text",
      placeholder: "type",
      required: true,
      elmType: "select",
      options: [
        {
          value: "income",
          text: "Income",
        },
        {
          value: "expenses",
          text: "Expenses",
        },
      ],
    },
    {
      // label: "Title",
      name: "title",
      type: "text",
      placeholder: "Salary",
      required: true,
    },
    {
      // label: "Amount",
      name: "amount",
      type: "number",
      placeholder: "2345",
      required: true,
    },
    {
      // label: "Date",
      name: "date",
      type: "date",
      required: true,
    },
  ];
  return (
    <Form className="shadow-lg p-3 border rounded" onSubmit={handleOnSubmit}>
      <Row>
        {inputs.map(({ elmType, ...item }, i) => (
          <Col md={2} key={i}>
            {elmType === "select" ? (
              <CustomSelect {...item} onChange={handleOnChange} />
            ) : (
              <CustomInpute {...item} onChange={handleOnChange} />
            )}
          </Col>
        ))}
        <Col className="mb-3">
          <Button variant="primary" type="submit" className="w-100">
            Add Transaction
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
