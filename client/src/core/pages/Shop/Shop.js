import React, { useState, useEffect } from 'react'
import Layout from '../../../hoc/Layout'
import { getCategories } from '../../apiCore'
import { Col, Row } from './style'
import Checkbox from './Checkbox/Checkbox'

const Shop = () => {
  const [categories, setCategories] = useState([])
  const [error, setError] = useState(false)

  const init = async () => {
    const response = await getCategories()
    setCategories(response)
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <Layout title="Shop page"
      description="search and find your favorite books">
      <Row>
        <Col size={4}>
          <ul>
            <h4>Filters by category</h4>
            <Checkbox
              categories={categories}
            />
          </ul>
        </Col>
        <Col size={8}>right col</Col>
      </Row>
    </Layout>
  )
}
export default Shop
