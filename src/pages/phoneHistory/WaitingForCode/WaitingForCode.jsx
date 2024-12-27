import "./WaitingForCode.scss";
import { useSelector } from 'react-redux';
import WaitingForCodeItem from "./WaitingForCodeItem";
import { orderStatus } from "../../../utils/orderStatus";

const WaitingForCode = () => {
  const {cartData} = useSelector((state)=>state.wc_store)
  const orders = cartData ? cartData.orders : null;
  const pendingArr = orders && orders.filter((elem)=> elem.order_data.status == orderStatus.pending);
  return (
    <div className="waiting">
      <div className="waiting__info">
        Ожидает СМС <span className="waiting__info-count">{ pendingArr && pendingArr.length}</span> шт / В
        резерве <span className="waiting__info-price">{
         pendingArr && pendingArr.reduce((acc, obj)=>(acc + +obj.order_data.total), 0)  
        }</span>₽
      </div>
      <div className="waiting__list">
        {
          orders && orders.map((elem)=>(
            elem.order_data.status == orderStatus.pending ? 
            <WaitingForCodeItem {...elem} key={elem.order_data.id} hasTimer={true} /> : ''
          ))
        }
      </div>
    </div>
  );
};

export default WaitingForCode;
