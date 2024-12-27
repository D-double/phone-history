import React from 'react'
import './CanceledOnly.scss'
import { useSelector } from 'react-redux';
import WaitingForCodeItem from '../WaitingForCode/WaitingForCodeItem';
import { orderStatus } from '../../../utils/orderStatus';

const CanceledOnly = () => {
  const {cartData} = useSelector((state)=>state.wc_store)
  const orders = cartData ? cartData.orders : null;
  const cancelledArr = orders && orders.filter((elem)=> elem.order_data.status == orderStatus.cancelled);
  return (
    <div className="waiting">
      <div className="waiting__info">
        Отменено <span className="waiting__info-count">{ cancelledArr && cancelledArr.length}</span> шт / На сумму <span className="waiting__info-price">{
         cancelledArr && cancelledArr.reduce((acc, obj)=>(acc + +obj.order_data.total), 0)  
        }</span>₽
      </div>
      <div className="waiting__list">
        {
          orders && orders.map((elem)=>(
            elem.order_data.status == orderStatus.cancelled ?
            <WaitingForCodeItem {...elem} key={elem.order_data.id} hasTimer={false} hide={true}/> : ''
          ))
        }
      </div>
    </div>
  )
}

export default CanceledOnly