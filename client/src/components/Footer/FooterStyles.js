import styled from 'styled-components';

export const Box = styled.div`
padding: 10px;
background: #161b22;
position: fixed;
bottom: 0;
width: 100%;



@media (max-width: 1000px) {
	padding: 5px 5px;
}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 1000px;
	margin: 0 auto;
	color: #fff;
	/* background: red; */
`

export const Column = styled.div`
display: flex;
flex-direction: column;
font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
text-align: justify;
font-weight:bolder;
font-size:larger;
margin-left:100px;
`;

export const Row = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill,
						minmax(185px, 1fr));
grid-gap: 20px;

@media (max-width: 1000px) {
	grid-template-columns: repeat(auto-fill,
						minmax(200px, 1fr));
}
`;

export const FooterLink = styled.a`
color: #fff;
margin-top:0px;
margin-bottom: 0px;
font-weight:bold;
font-size:medium;
text-decoration: none;
font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

&:hover {
	color: royalblue;
	transition: 200ms ease-in;
}
`;

export const Heading = styled.p`
font-size: larger;
font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
color: #fff;
margin-bottom: 0px;
font-weight: bolder;
`;