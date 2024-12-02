import styled ,{css} from "styled-components";
import {useContext} from 'react'
import { StateContext } from "./StateProvider";
const Tags = () => {
  const {activeTag, setActiveTag} = useContext(StateContext);
  const handleTagClick = (index) => {
    setActiveTag(index);
  };
  return (
    <TagsContainer>
      {["Work", "Short Break","Long Break"].map((tag, i) => (
        <Tag
          onClick={() => handleTagClick(i)}
          activeTag={activeTag == i}
          key={i}
        >
          {tag}
        </Tag>
      ))}
    </TagsContainer>
  );
};
export default Tags;

const TagsContainer = styled.div`
  background: white;
  height: 2rem;
  width: 40rem;
  margin: 0 auto;
  border-radius: 5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  border:1px solid rgb(119, 122, 126);
  
`;
const Tag = styled.button`
  all: unset;
  margin: 2px;
  height: 2rem;
  text-align: center;
  border-radius: 5rem;
  flex: 1;
  font-size: 1rem;
  &:hover {
      cursor: pointer;
    }
  ${function ({ activeTag }) {
    return activeTag && css`
    background: rgb(21, 102, 204);
    color:white;
   `;
  }}
`;
