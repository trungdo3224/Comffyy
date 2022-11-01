import React from 'react'
import styled from 'styled-components'
import GridView from './GridView'

const RelatedProducts = ({ company, products }) => {
  return (
    <Wrapper>
      <h2 className='title'>More products from {company}</h2>
      <GridView products={products}>

      </GridView>
    </Wrapper>
  )
}


const Wrapper = styled.section`
    margin: 32px 0;
    .title {
      margin: 100px 0;
    }
    .related-products {

    }
`

export default RelatedProducts
