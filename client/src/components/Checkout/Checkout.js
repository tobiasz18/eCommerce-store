import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../../auth/index'
import { getBraintreeToken, processPayment } from '../../core/apiCore'
import { removeItemsCart } from '../../core/cartHelper'
import Button from '../Button'
import DropIn from "braintree-web-drop-in-react";
import Alert from '../Alert'
import { ButtonPay } from './style'
import Loading from '../Loading'

const Checkout = ({ products, setItems }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    address: '',
    instance: {}
  })

  const userId = isAuthenticated() && isAuthenticated().user._id
  const userToken = isAuthenticated() && isAuthenticated().token

  const getTokenClient = async (userId, userToken) => {
    try {
      const { clientToken } = await getBraintreeToken(userId, userToken)
      setData({ ...data, clientToken: clientToken })
    } catch (error) {
      setData({ ...data, error: error })
    }
  }

  useEffect(() => {
    getTokenClient(userId, userToken)
  }, [])

  const getTotal = (products) => {
    return products.reduce((currentValue, nextValue) => {
      let result = currentValue + nextValue.count * nextValue.price
      // parse float with two decimal places
      return ParseFloat(result, 2)
    }, 0)
  }


  const ParseFloat = (str, val) => {
    str = Number.isInteger(str) ? str.toFixed(2) : str
    str = str.toString();
    str = str.slice(0, (str.indexOf(".")) + val + 1);
    return Number(str);
  }


  const buy = async () => {
    const { nonce } = await data.instance.requestPaymentMethod();
    setLoading(true)
    const paymentData = {
      paymentMethodNonce: nonce,
      amount: getTotal(products)
    }

    const response = await processPayment(userId, userToken, paymentData)
    setData({ ...data, success: response.success })
    /*--Task for later: add alert related to success response--*/
    // create order

    if (response.success) {
      removeItemsCart(() => console.log('Transaction Successful'))
      setItems([])
      setLoading(false)
    }
  }

  const showSuccess = () => (
    <Alert value={data.success} theme="success">
      Thanks! your payment was successful
    </Alert>
  )

  const showDropIn = () => {
    if (!data.clientToken) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    } else {
      return (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: 'vault'
              }
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <ButtonPay onClick={buy}>Pay</ButtonPay>
        </div>
      );
    }
  }

  return (
    <div>  
      <h5>Total: {getTotal(products)}$</h5> 
      {showSuccess()}
      {isAuthenticated() ? (<div> {showDropIn()} </div>) : (
        <Link to="/signin">
          <Button>Sign in to checkout</Button>
        </Link>
      )}
      <hr />
      {loading &&  <Loading />}
    </div>
  )
}

export default Checkout
