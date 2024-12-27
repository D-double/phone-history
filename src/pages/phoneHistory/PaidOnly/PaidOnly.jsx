import './PaidOnly.scss'
import WaitingForCodeItem from '../WaitingForCode/WaitingForCodeItem';
import { useSelector } from 'react-redux';
import { orderStatus } from '../../../utils/orderStatus';

function PaidOnly() {
  const {cartData} = useSelector((state)=>state.wc_store)
  const orders = cartData ? cartData.orders : null;
  const completedArr = orders && orders.filter((elem)=> elem.order_data.status == orderStatus.completed);
  return (
    <div className="waiting">
      <div className="waiting__info">
        Получено СМС <span className="waiting__info-count">{ completedArr && completedArr.length}</span> шт / Оплачено <span className="waiting__info-price">{
         completedArr && completedArr.reduce((acc, obj)=>(acc + +obj.order_data.total), 0)  
        }</span>₽
      </div>
      <div className="waiting__list">
        {
          orders && orders.map((elem)=>(
            elem.order_data.status == orderStatus.completed ?
            <WaitingForCodeItem {...elem} key={elem.order_data.id} hasTimer={false} hide={true}/> : ''
          ))
        }
      </div>
    </div>
  )
}

export default PaidOnly