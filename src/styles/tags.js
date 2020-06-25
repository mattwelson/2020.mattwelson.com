import styled from "styled-components"
import tagColors from "../utils/tags"

export const TagGrid = styled.div`
  display: flex;
  justify-items: start;
  grid-gap: 1rem;
  margin-bottom: 2rem;
`

export const TagContainer = styled.div`
  display: grid;
  place-items: center;
`

export const Tag = styled.div`
  background-color: ${({ tag }) => tagColors[tag] || tagColors.default};
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin-right: 1rem;
  color: white;

  a {
    color: white;
  }
`
