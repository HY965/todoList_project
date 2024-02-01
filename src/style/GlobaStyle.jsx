import { createGlobalStyle } from "styled-components";

const Globastyle = createGlobalStyle`
body {

    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
`;
// 글로벌스타일은 싱글이다 , 최상위에 한번만 넣어주면됨!
export default Globastyle;
