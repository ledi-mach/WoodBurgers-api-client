import {Button} from "../Button/index"
import {Item} from "../Item/index"
import React from "react"

export function OrderKitchen({
    convertTime,
    order,
    handlePreparing,
    handleFinished,
    handleServing
})  {
    return(
<div className="kitchen-wrap">

{order ? (
    <ul className="ListOfOrders">
        {order.map((data, index) => {
            return (
                <Item className="ordersKitchen" key={index}>
                    <section className="ordered">
                        <div className="order-wrap">
                            <div className="headerOrder">
                                <p className="tableNumber">  Mesa {data.table} </p>
                                <p className="customerName"> {data.client_name} </p>
                                <p>Status: {data.status
                                .replace('pending', 'Pendente')
                                .replace('preparing', 'Preparando')
                                .replace('ready', 'Pronto')
                                } </p>
                                <p className="timeOrder"> Pedido feito às {convertTime(data.createdAt)} </p>
                            </div>

                            <h1 className="titleKitchen">PEDIDOS</h1>

                            <div className="bodyOrder">
                                <ul className="productOrder">

                                    {data.Products.map((data, id) => {
                                        return (
                                            <ul className="listProductOrder" key={id}>
                                                <p className="nameItemOrder">{data.name}</p>
                                                <p className="quantityItem"> Quantidade: {data.qtd}
                                                    {data.complement !== null ? <p>Extra: {data.complement}</p> : <p>Extra: nenhum</p>}</p>
                                            </ul>
                                        )
                                    })}
                                </ul>
                            </div>
                           <div className="statusBtn">
                           {data.status === 'pending' ?
                           
                             <Button className="redBtn" id="statusOrderBtn"
                             onClick={(e)=>handlePreparing(data, e)}
                             > Preparar</Button>

                        : data.status==='preparing' ?
                        <Button className="yellowBtn"  id="statusOrderFinish"
                        onClick={(e)=>handleFinished(data,e)}
                        > Finalizar</Button>
                        : 
                        <Button className="yellowBtn"  id="statusOrderToServe"
                        onClick={(e)=>handleServing(data,e)}
                        > Servir</Button>
                          }

                           </div>   
                        </div>

                    </section>
                </Item>
            )
        })
        }
    </ul>

) : `Sem pedidos no momento!`}
</div>
)}
