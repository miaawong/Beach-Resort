import styled from "styled-components";
import defaultImg from "../images/room-1.jpeg";

const StyledHero = styled.header`
    min-height: 60vh;
    // you can access props in styled components
    // you can pass a function to a styled component and adapt it based on the props you passed
    // <StyledHero img={images}/> or defaultImg (if we couldnt find any room's image)
    background: url(${props => (props.img ? props.img : defaultImg)})
        center/cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default StyledHero;
