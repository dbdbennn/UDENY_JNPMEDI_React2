import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-action";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart); // 셀렉터는 리덕스에 구독이 설정됨
  // 즉 store 가 업데이트 될 때마다 셀렉터가 다시 실행되고 App 컴포넌트가 최신 상태가 된다.

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  // 이펙트도 다시 평가되고 cart가 변경되면 다시 실행된다.
  // useEffect 주의점은 비동기작업을 useEffect안에서 하면 안된다.
  // 대신 상수를 만들어 해결
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
