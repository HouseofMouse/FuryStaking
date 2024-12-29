import styled from "styled-components";

var OverlayProps = {
  show: true || false,
  zIndex: 0,
};

const Overlay = OverlayProps;
styled.div.attrs({ role: "presentation" }) <
  OverlayProps >
  `
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: aqua;
  transition: opacity 0.4s;
  opacity: ${({ show }) => (show ? 0.6 : 0)};
  z-index: ${({ zIndex }) => zIndex};
  pointer-events: ${({ show }) => (show ? "initial" : "none")};
`;

Overlay.defaultProps = {
  show: false,
  zIndex: 10,
};

export default Overlay;
