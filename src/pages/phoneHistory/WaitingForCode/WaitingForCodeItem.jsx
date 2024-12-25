import { copyImg, images } from "../../../assets/image";

const WaitingForCodeItem = ({order_data, product}) => {
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
  return (
    <div className="waiting__item">
          <div className="waiting__card">
            <div className="waiting__left">
              <div className="waiting__service">
                <img src={product.image} alt="" />
                <span>{product.name}</span>
              </div>
              <div className="waiting__service">
                <img src={images.gg} alt="" />
                <span>{order_data.meta_data.mail}</span>
                <img
                  onClick={copyClickHandler}
                  className="waiting__copy"
                  src={copyImg}
                  alt=""
                />
              </div>
            </div>
            <div className="waiting__center">
              <div className="waiting__status">
                <div>Статус</div>
                <div>Ожидает письмо</div>
              </div>
              <div className="waiting__time">
                <div>Время</div>
                <div className="waiting__timer">25:00</div>
              </div>
              <div className="waiting__price">
                <div>Цена</div>
                <div className="waiting__value">{order_data.total}₽</div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default WaitingForCodeItem