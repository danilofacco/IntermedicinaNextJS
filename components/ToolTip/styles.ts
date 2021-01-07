import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 160px;
    background: #E2202C;

    padding: 8px;

    border-radius: 4px;

    font-size: 14px;
    font-family:"Montserrat Medium";

    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;

    position: absolute;
    bottom: calc(100% + 12px);

    left: 50%;

    transform: translateX(-50%);

    color: #fff;

    &::before {
      border-style: solid;
      border-color: #E2202C transparent;
      border-width: 6px 6px 0 6px;
      bottom: 20px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      content: '';
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
