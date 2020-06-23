import React from "react"
import { slug } from "github-slugger"
import styled from "styled-components"
import blobs from "./blobs"

// 0 inclusive to max exclusive
const randomInt = max => Math.floor(Math.random() * Math.floor(max))
const randomBlob = () => blobs[randomInt(blobs.length)]

const HeaderGrid = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  padding-top: 3.5rem;
  grid-gap: 1rem;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
  }
`

const LinkStyle = styled.a`
  display: grid;
  align-items: center;
  justify-items: center;
  font-size: 1.5rem;
  box-shadow: none;
  opacity: 0.7;
  transition: 0.6s linear;

  position: relative;
  top: -1.25rem;

  &:hover {
    opacity: 1;
  }

  span {
    display: inline-block;
    grid-column: 1;
    grid-row: 1;
    color: white;
  }

  svg {
    grid-column: 1;
    grid-row: 1;
  }
`

const LinkedHeader = ({ is: Component, ...props }) => {
  const slugged = slug(props.children)
  return (
    <HeaderGrid id={slugged}>
      <Component {...props} />
      <LinkStyle href={`#${slugged}`}>
        {randomBlob()}
        <span>#</span>
      </LinkStyle>
    </HeaderGrid>
  )
}

LinkedHeader.defaultProps = { is: "h2" }

export default LinkedHeader
