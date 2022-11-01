import React from 'react'
import styled from 'styled-components'

const RelatedProducts = ({ company }) => {
  return (
    <Wrapper>
      <h3 className='title'>{company}</h3>

    </Wrapper>
  )
}


const Wrapper = styled.section`

    .title {

    }
    .related-products {

    }
`

export default RelatedProducts
