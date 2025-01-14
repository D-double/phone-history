import { useEffect } from "react";
import { copyImg, images } from "../../../assets/image";
import { timer } from "../../../utils/timer";
import { useState } from "react";
import getTime from "../../../utils/getTime";
import { useDispatch, useSelector } from "react-redux";
import { getBalance, getMailOrder, setCancelOrder } from "../../../store/wc-store";
import { orderStatus } from "../../../utils/orderStatus";

const WaitingForCodeItem = ({
  order_data,
  product,
  hasTimer,
  hide = false,
}) => {
  const dispatch = useDispatch();
  const {mailData} =useSelector((state)=>state.wc_store);
  const maxTime = 25 * 60;
  const copyClickHandler = (e) => {
    const parent = e.target.closest(".waiting__service");
    const text = parent.querySelector("span").innerText;
    navigator.clipboard
      .writeText(text)
      .then()
      .catch(() => {
        alert("Ошибка");
      });
  };
  const [time, setTime] = useState(maxTime);
  useEffect(()=>{
    if(hasTimer){
      dispatch(getMailOrder(order_data.id));
    }
  },[])
  useEffect(() => {
    if (hasTimer) {
      setTimeout(() => {
        if (time > 0) {
          setTime(timer(order_data.timestamp, maxTime));
          if (time % 3 == 0 && mailData) {
            dispatch(getMailOrder(order_data.id));
          }
        } else {
          dispatch(setCancelOrder(order_data.id));
        }
      }, 1000);
    } else {
      setTime(0);
    }
    dispatch(getBalance())
  }, [time]);

  return (
    <div className="waiting__item">
      <div className={`waiting__card ${hide ? "hide" : ""}`}>
        <div className="waiting__left">
          <div className="waiting__service">
            <img src={product.image} alt="" />
            <span>{product.name}</span>
          </div>
          <div className="waiting__service">
            <img src={images.gg} alt="" />
            <span>{order_data.meta_data.mail}</span>
            {!hide && (
              <img
                onClick={copyClickHandler}
                className="waiting__copy"
                src={copyImg}
                alt=""
              />
            )}
          </div>
        </div>
        <div className="waiting__center">
          <div className="waiting__status">
            <div>Статус</div>
            {!hide ? (
              <div>Ожидает письмо</div>
            ) : (
              <div style={{ color: "#ef8512" }}>
                {order_data.status == orderStatus.cancelled
                  ? "Отменен"
                  : "Выполнен"}
              </div>
            )}
          </div>
          <div className="waiting__time">
            { order_data.status == orderStatus.completed ?
              <>
                <div>Цена</div>
                <div className="waiting__value">{order_data.total}₽</div>
              </> :
              <>
                <div>Время</div>
                <div className="waiting__timer">
                  {getTime(time, "min")}:{getTime(time)}
                </div>
              </>
            }
          </div>
          <div className="waiting__price">
            {
              order_data.status == orderStatus.completed ?
              <>
              <div>Код почты</div>
              <div className="waiting__value">{order_data.meta_data.code}</div>
              </>
              :
              <>
                <div>Цена</div>
                <div className="waiting__value">{order_data.total}₽</div>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForCodeItem;
