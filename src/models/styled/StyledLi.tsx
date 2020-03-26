import styled from 'styled-components'

const StyledLi = styled.li`
    float: left;

    a {
        width: 25vw;
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }

    &:hover {
        text-decoration: underline;
    }
`

export default StyledLi
