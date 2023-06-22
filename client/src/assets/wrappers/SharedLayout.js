import styled from "styled-components";

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
    border: "1px solid red";
  }
  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
    border: "1px solid red";
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
      border: "1px solid red";
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;
export default Wrapper;
