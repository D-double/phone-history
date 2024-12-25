import "./WaitingForCode.scss";
import { useSelector } from 'react-redux';
import WaitingForCodeItem from "./WaitingForCodeItem";

const WaitingForCode = () => {
  const {cartData} = useSelector((state)=>state.wc_store)
  const orders = cartData ? cartData.orders : null;
  
  return (
    <div className="waiting">
      <div className="waiting__info">
        Ожидает СМС <span className="waiting__info-count">{ orders && orders.length}</span> шт / В
        резерве <span className="waiting__info-price">{
         orders && orders.reduce((acc, obj)=>(acc + +obj.order_data.total), 0)  
        }</span>₽
      </div>
      <div className="waiting__list">
        {
          orders && orders.map((elem)=>(
            <WaitingForCodeItem {...elem} key={elem.order_data.id} />
          ))
        }
      </div>
    </div>
  );
};

export default WaitingForCode;
