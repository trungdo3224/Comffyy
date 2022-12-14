import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const {
    filters: {
      text, category, company, color, minPrice, maxPrice, price, shipping
    },
    updateFilters,
    clearFilters,
    allProducts,
  } = useFilterContext();

  const categories = getUniqueValues(allProducts, 'category');
  const companies = getUniqueValues(allProducts, 'company');
  const colors = getUniqueValues(allProducts, 'colors');


  return (
    <Wrapper>
      <div className="content">
        {/* search filter */}
        <form onSubmit={e => e.preventDefault()}>
          <div className='form-control'>
            <input
              type='text'
              name='text'
              placeholder='Search products'
              className='search-input'
              value={text}
              onChange={updateFilters}
            />
          </div>
          {/* categories filter */}
          <div className="form-control">
            <h5>category</h5>
            <div>
              {categories.map((cat, index) => (
                <button
                  key={index}
                  type="button"
                  name="category"
                  value={cat}
                  onClick={updateFilters}
                  className={category === cat.toLowerCase() ? 'active' : null}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* company filter */}
          <div className="form-control">
            <h5>company</h5>
            <select name="company" value={company} onChange={updateFilters} className="company">
              {companies.map((cp, index) => (
                <option key={index} value={cp}>{cp}</option>
              ))}
            </select>
          </div>

          {/* colors filter */}
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((co, index) => {
                if (co === "all") {
                  return (
                    <button
                      key={index}
                      name="color"
                      data-color="all"
                      className={color === "all" ? 'all-btn active' : 'all-btn'}
                      onClick={updateFilters}
                    >
                      {co}
                    </button>
                  )
                }
                return (
                  <button
                    key={index}
                    name="color"
                    className={color === co ? 'color-btn active' : 'color-btn'}
                    style={{ background: co }}
                    data-color={co}
                    onClick={updateFilters}
                  >
                    {color === co ? <FaCheck /> : null}
                  </button>
                )
              })}
            </div>
          </div>
          {/* end colors filter */}
          {/* price filter */}
          <div className="form-control">
            <h5>Price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              value={price}
              min={minPrice}
              max={maxPrice}
              onChange={updateFilters}
            />
          </div>
          {/* end price filter */}
          {/* shipping filter */}
          <div className="form-control shipping">
            <label htmlFor="shipping">Free shipping</label>
            <input type="checkbox" name="shipping" id="shipping" onChange={updateFilters} checked={shipping} />
          </div>
          {/* end shipping filter */}
        </form>
        <button type="button" onClick={clearFilters} className="clear-btn">
          Clear filters
        </button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 150px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
