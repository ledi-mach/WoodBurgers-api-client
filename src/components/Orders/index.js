import React from "react";
import { useState } from 'react';
import "./index.css";
import { Input } from "../Input";
import { Button } from "../Button";

export function Orders({
    children,
    orders,
   
}) {

    const userToken = localStorage.getItem('usersToken');
    const [Customer, setCustomer] = useState('');
    const [Table, setTable] = useState('');


    function createOrder() {

        const Products = orders.map((data) => ({ //aqui tô pegando os produtos da orders e mapeando pra pegar o id e qtd
            "id": data.id,
            "qtd": data.qtd,
        })
        )

        fetch('https://lab-api-bq.herokuapp.com/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `${userToken}`
            },
            body: JSON.stringify({
                "client": Customer,
                "table": Table,
                "products": Products,
            })
        })
    }
//divOrderSummary é a div onde vão os pedidos
    return (
        <div className="orders">
            <h1 className="ordersH1">PEDIDOS</h1>
            <div className="divOrderSummary"> 
                {children}
            </div>
            <div className="nameTable">
                <div className="nameCustomer">
                    <p className="clientInfo">Nome: </p>
                    <Input inputType="name" inputClass="inputCustomer" inputValue={Customer}
                        inputOnChange={e => setCustomer(e.target.value)}></Input>
                </div>
                <div className="tableCustomer">
                    <p className="clientInfo">Mesa: </p>
                    <Input inputType="number" inputClass="inputTable" min="1" max="15" inputValue={Table}
                        inputOnChange={e => setTable(e.target.value)} ></Input>
                </div>
            </div>
            <div className="finishOrder">
                <p className="total">TOTAL: R$ 00</p>
                <Button type="button" className="sendOrder" onClick={createOrder}>FAZER PEDIDO</Button>
                <Button type="button" className="cancelOrder"
                //aqui ver como usar o setState que está no menu ou mandar a função e acessar lá}
                >CANCELAR PEDIDO</Button>
            </div>
        </div>

    )
}
