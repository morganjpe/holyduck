import {styled} from 'twin.macro';

export const Button = styled.button`
    background: ${({theme}) => theme.colors.hd_red};
    width: 100%;
    text-align: center;
    border: none;
    color: white;
    font-weight: 700;
    font-size: 18px;
    padding: 20px;
    cursor: pointer;
`;
